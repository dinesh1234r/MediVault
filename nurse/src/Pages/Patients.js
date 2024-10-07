import React, { useState,useRef } from 'react'
import { HStack,Flex,Box, Center,Image,Text, FormControl,Input, FormLabel, VStack, Spacer } from '@chakra-ui/react';
import { motion } from "framer-motion";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure,Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,useToast
} from '@chakra-ui/react'
import Webcam from "react-webcam";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebasestorage/firebase';
import axios from 'axios';



function Patients() {
    const { isOpen: isModalOneOpen, onOpen: onModalOneOpen, onClose: onModalOneClose } = useDisclosure();
  const [username,Setusername]=useState();
  const [password,Setpassword]=useState();
  const toast=useToast()
  const navigate=useNavigate()

  const webcamRef = useRef(null);
  // const [url, setUrl] = useState("");

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const uploadImage = async (image) => {
    if (!image) return;

    const byteString = atob(image.split(",")[1]);
    const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    const uniqueFileName = `image-${Date.now()}.jpg`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    // setUrl(downloadUrl);
    return downloadUrl;
  };

  const handleCaptureAndSubmit = async () => {
    const image = captureImage(); 
    const downloadUrl = await uploadImage(image); 
    console.log(downloadUrl)

    try {
      const response = await axios.post('https://medivault.onrender.com/patient/login', { image: downloadUrl });
      if (response.data.msg === "Faces match!") {
        localStorage.setItem('patient', JSON.stringify(response.data.result));
        toast({
          title: response.data.msg,
          status: "success",
          position: "top",
          duration: 1200,
          onCloseComplete: () => {
            navigate('/entry');
          },
        });
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          position: "top",
          duration: 1200,
        });
      }
    } catch (err) {
      toast({
        title: "Error in sending details",
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  const [patient,Setpatient]=useState({name:"",aadhar:"",address:"",phone:"",dob:""});
  // const handlesumbit=async()=>{
  //   const response=await axios.post('https://medivault.onrender.com/patient/login',{Aadhar:username,password:password})
  //   if(response.data.msg==="Patient login successfully Done")
  //   {
  //     toast({
  //       title:response.data.msg,
  //       status:"success",
  //       duration:1200,
  //       position:'top',
  //       onCloseComplete:()=>{
  //         localStorage.setItem('patient',JSON.stringify(response.data.result))
  //         navigate('/entry')
  //       }
  //     })
  //   }
  //   else
  //   {
  //     toast({
  //       title:response.data.msg,
  //       status:"error",
  //       duration:1200,
  //       position:'top'
  //     })
  //   }
  // }

  const handleSubmitDrawer=async()=>{
    const {name,aadhar,address,phone,dob}=patient
    const response=await axios.post('https://medivault.onrender.com/patient/register',{
      Name:name,
      Address:address,
      Aadhar:aadhar,
      Phone_no:phone,
      Photo:url1,
      DOB:dob
    })
    if(response.data.msg==="Registration Successfully Done")
    {
      toast({
        title:response.data.msg,
        status:"success",
        duration:1500
      })
    }
    else
    {
      toast({
        title:response.data.msg,
        status:"error",
        duration:1500
      })
    }
  }

  const handleDrawerChange=(e)=>{
    Setpatient({...patient,[e.target.name]:e.target.value});
  }
  const [image1, setImage1] = useState("");
  const [url1,Seturl1]=useState("")  
  const webcamRef1 = useRef("");  
  const capture = () => {
    const imageSrc = webcamRef1.current.getScreenshot(); 
    setImage1(imageSrc); 
  };

  const handleUpload = async() => {
    // if (!image1) return;

    // const byteString = atob(image1.split(",")[1]);
    // const mimeString = image1.split(",")[0].split(":")[1].split(";")[0];

    // const arrayBuffer = new Uint8Array(byteString.length);
    // for (let i = 0; i < byteString.length; i++) {
    //   arrayBuffer[i] = byteString.charCodeAt(i);
    // }

    // const blob = new Blob([arrayBuffer], { type: mimeString });

    // const uniqueFileName = `image-${Date.now()}.jpg`; 
    // const storageRef = ref(storage, `images/${uniqueFileName}`);

    // uploadBytes(storageRef, blob).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((downloadUrl) => {
    //     Seturl1(downloadUrl); 
    //     console.log("File available at", downloadUrl);
    //   });
    // });

    if (!image1) return;

    const byteString = atob(image1.split(",")[1]);
    const mimeString = image1.split(",")[0].split(":")[1].split(";")[0];
    
    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    const uniqueFileName = `image-${Date.now()}.jpg`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    Seturl1(downloadUrl);
    console.log(downloadUrl)
  };

  // const preset_name="f05bb7m0"
  // const cloud_name="dyv9xgbfx"
  // const [photo,Setphoto]=useState("");
  //   const handlephoto=()=>{
  //     if(image.length===0)
  //     {
  //       toast({
  //         title:"Choose a photo",
  //         status:"error",
  //         position:"top",
  //       })
  //       return;
  //     }
  //     const formData=new FormData();
  //     formData.append("file",image)
  //     formData.append("upload_preset",preset_name);
  //     axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
  //     .then(res=>{
  //       toast({
  //         title:"Photo Added Successfully",
  //         status:"success",
  //         position:'top'
  //       })
  //       Setphoto(res.data.url);
  //       console.log(res.data.secure_url);
  //       setImage("");
  //     })
  //     .catch(err=>{
  //       console.log(err);
  //       toast({
  //         title:err,
  //         status:'error'
  //       })
  //     })
  //   }

  return (
    <>
    <Box h={'100vh'}>
        <HStack mt={2} mr={2}>
            <Spacer/>
            <motion.div whileTap={{scale:0.8}}>
                
                <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onModalOneOpen} size={'lg'}>
                  Sign up 
                </Button>
            </motion.div>
            
            
        </HStack>
        <Spacer h={'20vh'}/>
        <HStack ml={'50vh'}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={320}
          style={{ borderRadius: '50%', overflow: 'hidden'}} 
        />
      </HStack>
      <Button mt={4} ml={'37%'} colorScheme="blue" onClick={handleCaptureAndSubmit}>
        Capture & Login
      </Button>
        <Drawer
        isOpen={isModalOneOpen}
        
        onClose={onModalOneClose}
        size={'full'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Patient Registration
          </DrawerHeader>

          <DrawerBody >
            <Box>
              <FormControl >
                <HStack w={'100%'}>
                  <VStack w={'100%'} ml={40} mt={20}>
                    <Box w={'100%'}>
                          <FormLabel>
                            Patient Name:
                          </FormLabel>
                          <Input name='name' value={patient.name} w={'60%'} onChange={(e)=>handleDrawerChange(e)}/>
                          <FormLabel>
                            Aadhar Number:
                          </FormLabel>
                          <Input name='aadhar' value={patient.aadhar} w={'60%'} onChange={(e)=>handleDrawerChange(e)}/>
                          <FormLabel>
                            Address:
                          </FormLabel>
                          <Input name='address' value={patient.address} w={'60%'} onChange={(e)=>handleDrawerChange(e)}/>
                          <FormLabel>
                            Phone no:
                          </FormLabel>
                          <Input name='phone' value={patient.phone} w={'60%'} onChange={(e)=>handleDrawerChange(e)}/>
                          <FormLabel>
                            DOB:
                          </FormLabel>
                          <Input name='dob' type='date' value={patient.dob} w={'60%'} onChange={(e)=>handleDrawerChange(e)}/>
                    </Box>
                </VStack>
                <VStack mr={40}>
                  <FormLabel>
                    Photo
                  </FormLabel>
                  <Webcam ref={webcamRef1} screenshotFormat="image/jpeg"/>
                  <Image src={image1} alt='photo'/>
                  <Button colorScheme='blue' onClick={()=>capture()}>Capture</Button>
                  <Button onClick={()=>handleUpload()}>Upload</Button>
                </VStack>
                </HStack>
              </FormControl>
            </Box>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onModalOneClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={()=>handleSubmitDrawer()}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
    </>
  )
}

export default Patients