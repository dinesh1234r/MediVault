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
import axios from 'axios';



function Patients() {
    const { isOpen: isModalOneOpen, onOpen: onModalOneOpen, onClose: onModalOneClose } = useDisclosure();
    const { isOpen: isModalTwoOpen, onOpen: onModalTwoOpen, onClose: onModalTwoClose } = useDisclosure();
  const [username,Setusername]=useState();
  const [password,Setpassword]=useState();
  const toast=useToast()
  const navigate=useNavigate()
  const [patient,Setpatient]=useState({name:"",aadhar:"",address:"",phone:"",dob:""});
  const handlesumbit=async()=>{
    const response=await axios.post('https://medivault.onrender.com/patient/login',{Aadhar:username,password:password})
    if(response.data.msg==="Patient login successfully Done")
    {
      toast({
        title:response.data.msg,
        status:"success",
        duration:1200,
        position:'top',
        onCloseComplete:()=>{
          localStorage.setItem('patient',JSON.stringify(response.data.result))
          navigate('/entry')
        }
      })
    }
    else
    {
      toast({
        title:response.data.msg,
        status:"error",
        duration:1200,
        position:'top'
      })
    }
  }

  const handleSubmitDrawer=async()=>{
    const {name,aadhar,address,phone,dob}=patient
    const response=await axios.post('https://medivault.onrender.com/patient/register',{
      Name:name,
      Address:address,
      Aadhar:aadhar,
      Phone_no:phone,
      Photo:photo,
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
  const [image, setImage] = useState("");  
  const webcamRef = useRef("");  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); 
    setImage(imageSrc); 
  };

  const preset_name="f05bb7m0"
  const cloud_name="dyv9xgbfx"
  const [photo,Setphoto]=useState("");
    const handlephoto=()=>{
      if(image.length===0)
      {
        toast({
          title:"Choose a photo",
          status:"error",
          position:"top",
        })
        return;
      }
      const formData=new FormData();
      formData.append("file",image)
      formData.append("upload_preset",preset_name);
      // formData.append("transformation", JSON.stringify({ fetch_format: "jpg" }))
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
      .then(res=>{
        toast({
          title:"Photo Added Successfully",
          status:"success",
          position:'top'
        })
        Setphoto(res.data.url);
        console.log(res.data.secure_url);
        setImage("");
      })
      .catch(err=>{
        console.log(err);
        toast({
          title:err,
          status:'error'
        })
      })
    }

  return (
    <Box>
        <VStack >
            <motion.div whileTap={{scale:0.8}}>
                
                <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onModalOneOpen} size={'lg'}>
                  Sign up 
                </Button>
            </motion.div>
            <motion.div whileTap={{scale:0.8}}>
            <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onModalTwoOpen} size={'lg'}>
                   Sign in
                </Button>
                
            </motion.div>
            
        </VStack>
        {/* <Box w={300} mx={'auto'}>
          <Text ml={6} fontSize={25}>Patient Biometric Login</Text>
          <Spacer h={2}/>
          <Webcam />
          <Spacer h={5}/>
          <Button mx='40%' borderRadius={20} colorScheme='blue'>Capture</Button>
        </Box> */}
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
                  <Webcam ref={webcamRef}/>
                  <Image src={image} alt='photo'/>
                  <Button colorScheme='blue' onClick={()=>capture()}>Capture</Button>
                  <Button onClick={()=>handlephoto()}>Upload</Button>
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
      <Modal isOpen={isModalTwoOpen} onClose={onModalTwoClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>
          <FormControl>
            <FormLabel ml={'5%'}>Aadhar number</FormLabel>
              <Input w={'80%'} ml={'10%'} value={username} onChange={(e)=>Setusername(e.target.value)}/>
            <FormLabel ml={'5%'}>password</FormLabel> 
              <Input w={'80%'} ml={'10%'} value={password} onChange={(e)=>Setpassword(e.target.value)}/>
          </FormControl>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onModalTwoClose}>
              Close
            </Button>
            <Button colorScheme='gray' onClick={()=>handlesumbit()}>Sign in</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Patients