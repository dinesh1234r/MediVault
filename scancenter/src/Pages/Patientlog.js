import React, { useEffect, useState } from 'react'
import SideBar from './Sidebar';
import Patients from './Patient';
import { HStack,Flex,Box,Image,useToast,Card,CardBody,CardHeader,Text,Spacer,Divider,IconButtonTextarea,Button, Input, IconButton,Textarea } from '@chakra-ui/react';
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { DeleteIcon,CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';


function Patientlog() {
    const toast=useToast();
    const navigate=useNavigate()
    const [today,Settoday]=useState({});
    useEffect(()=>{
        const fetchdetails=async()=>{
            const _id=JSON.parse(localStorage.getItem('patient'))._id
            const response=await axios.post('https://medivault.onrender.com/patient/entryreport',{_id},{
                headers:{
                  'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
                  'Content-Type': 'application/json'
                }
              })
            if(response.data.msg==="Entry Accepted")
            {
                Settoday(response.data.result);
                toast({
                    title:response.data.msg,
                    status:"success",
                    position:"top",
                    duration:1200
                })
            }
            else
            {
                toast({
                    title:response.data.msg,
                    status:"error",
                    position:"top",
                    duration:1200
                })
            }
        }
        fetchdetails()
    },[])

    const [pdf,Setpdf]=useState(null);
    // const [pdfurl,Setpdfurl]=useState("");
    // const [pdfurl,Setpdfurl]=useState([]);
    const handlechangefile=(e)=>{
        Setpdf(e.target.files[0]);
    }
    // const [pdfname,Setpdfname]=useState("")
    const [saving,Setsaving]=useState({})
    const handleupload=async()=>{
        if (!pdf) {
            toast({
                title:'Please select a PDF file to upload.',
                duration:1200,
                position:"top",
                status:"error"
            });
            return;
          }

          const filename = prompt('Enter a name for your file:');
          if(filename==undefined)
          {
            toast({
                title:"Please Enter a Name for Report",
                duration:1200,
                position:"top",
                status:"success"
            })
            return;
          }
        //   Setpdfname(filename);
          const storageRef = ref(storage, `pdfs/${filename || pdf.name}`);
          const uploadTask = uploadBytesResumable(storageRef, pdf);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progressPercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            //   setProgress(progressPercent);
            },
            (error) => {
              console.error('Upload failed:', error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log('File available at:', url);
                Setsaving((prev)=>({...prev,[filename]:url}))
                // Setpdfurl((prev)=>[{
                //     ...prev,[filename]:url
                // }])
                // console.log(pdfurl)

              });
            }
          );
        };
    
    const handledeletepdf=(key)=>{
        const temp={...saving}
        delete temp[key]
        Setsaving(temp)
    }

    const handlereport=async()=>{
        try{
            const _id=JSON.parse(localStorage.getItem('patient'))._id
            const response=await axios.post('https://medivault.onrender.com/patient/updatereport',{_id,report:saving},{
                headers:{
                  'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
                  'Content-Type': 'application/json'
                }
              })
            if(response.data.msg==="Report Added successfully")
            {
                toast({
                    title:response.data.msg,
                    duration:1200,
                    position:"top",
                    status:"success"
                })
            }
            else
            {
                toast({
                    title:response.data.msg,
                    status:"error",
                    duration:1200,
                    position:"top"
                })
            }
        }
        catch(err)
        {
            toast({
                title:"Error in add report",
                status:"error",
                duration:1200,
                position:"top"
            })
        }
        
    }

    const handlelogout=()=>{
        navigate('/home')
        localStorage.removeItem('patient');
      }

  return (
    <HStack w={'100%'} >
        <Box w={'20%'} justifyContent={'center'}>
            <SideBar />
        </Box>
        <Box w={'80%'} h={'100vh'}>
        <HStack ml={20} mr={10} mt={5} mb={2}>
            <Text fontSize={20}>Name:</Text><Text fontSize={20}>{JSON.parse(localStorage.getItem("patient")).Name}</Text>
            <Spacer/>
            <Text fontSize={20}>Age:</Text><Text fontSize={20}>35</Text>
            <IconButton aria-label="Logout" color={'red'} bg={'white'} icon={<FiLogOut/>} onClick={()=>handlelogout()}/>
        </HStack>
        <Divider/>
        <Spacer h={10}/>
            <Card w={'60%'} mx={'auto'}>
                <CardHeader>
                    <HStack>
                        <strong>Disease:</strong><Text>{today.disease}</Text>
                        <Spacer/>
                        <strong>Date:</strong><Text>{today.Date}</Text>
                    </HStack>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Textarea value={today.notes} isDisabled/>
                    <Spacer h={10}/>
                    <HStack>
                        <Spacer/>
                        <input type="file" accept="application/pdf" onChange={(e)=>handlechangefile(e)} />
                        <Button leftIcon={<AddIcon/>} onClick={()=>handleupload()}>Report</Button>
                    </HStack>
                </CardBody>
            </Card>
            <Spacer h={4}/>
            <Card w={'60%'} mx={'auto'}>
            <CardHeader>
                <HStack>
                    <Text>Added Reports</Text>
                    <Spacer/>
                    <Text>Save</Text>
                    <IconButton
                    aria-label="Save"
                    icon={<CheckIcon />}
                    colorScheme="green"
                    variant="solid"
                    onClick={()=>handlereport()}
                    />
                </HStack>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Box overflowY={'scroll'} h={'20vh'}>
                    {Object.keys(saving).length===0?(<Text>No Records Found Here</Text>):Object.entries(saving).map(([key,value])=>(
                        <Box>
                        <Spacer h={2}/>
                        <HStack>
                        <Text>{`${key}.pdf`}</Text>
                        <Spacer/>
                        <IconButton
                        // aria-label="Delete"
                        mr={'4%'}
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        borderRadius={'full'}
                        onClick={()=>handledeletepdf(key)}
                        />
                        </HStack>
                        <Spacer h={4}/>
                        <Divider/>
                        </Box>
                    ))}
                    {/* {pdfurl.length===0?(<Text>No Records Found Here</Text>):
                    pdfurl.map((data,index)=>{
                        // const [key, value] = Object.entries(data)[0] ; 
                        
                        return (
                        <Box>
                        <Spacer h={2}/>
                        <HStack>
                        <Text>{`${data}.pdf`}</Text>
                        <Spacer/>
                        <IconButton
                        // aria-label="Delete"
                        mr={'4%'}
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        borderRadius={'full'}
                        onClick={()=>handledeletepdf(index)}
                        />
                        </HStack>
                        <Spacer h={4}/>
                        <Divider/>
                        </Box>
                    )})} */}
                </Box>
            </CardBody>
            </Card>
        </Box>
        
    </HStack>
  )
}

export default Patientlog