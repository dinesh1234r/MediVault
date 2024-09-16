import React, { useEffect, useState } from 'react'
import {Box,Button,Input,Heading,VStack,HStack,Radio, RadioGroup,Stack,Center,Toast,useToast,CloseButton,Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure,
  StackDivider,Image,
  Spacer} from '@chakra-ui/react';
  import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
  import { IconButton } from "@chakra-ui/react";
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
  } from "@chakra-ui/react";
  
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import { color } from 'framer-motion';
import { Flex } from '@chakra-ui/react';

function GetAllNurse() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast=useToast();
  const [Details,SetDetails] = useState([])
  const [medicalnum,SetMedicalnum]=useState(null);
  const fetchdetails=async()=>{
    const Admin=jwtDecode(localStorage.getItem('jwt')).adminuser;
    const response=await axios.post('http://localhost:5000/admin/getalldetailsofnurse',{Admin},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    if(response.data.msg==='Details are shown below')
    {
        toast({
          title:response.data.msg,
          status:'success',
          duration:3000,
          position:'top'
        })
        SetDetails(response.data.details);
    }
    else{
      toast({
        title:response.data.msg,
        status:'error',
        duration:3000,
        position:'top'
      })
    }
  }
  
  useEffect(()=>{
    fetchdetails();
  },[])

  const handledelete=(num)=>{
    SetMedicalnum(num);
    onOpen();
  }

  const handlesubmit=async()=>{
    const response=await axios.post("http://localhost:5000/admin/deletedetailnurse",{Medical_License_Number:medicalnum},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    if(response.data.msg==='Delete Successfully')
    {
      toast({
        title:response.data.msg,
        status:'success',
        duration:1500,
        position:'top',
      })
      const finaldetails=Details.filter(detail=>{
        return detail.Medical_License_Number!=medicalnum;
      })
      SetDetails(finaldetails);
    }
    else
    {
      toast({
        title:response.data.msg,
        status:'error',
        duration:1500,
        position:'top'
      })
    }
    onClose()
  }

  return (
    <Box width={'100%'} height={'550px'} p={4} overflowY={'scroll'} boxShadow={'lg'} align='center' >
      <HStack flexDirection={'row-reverse'}><Button colorScheme='red' onClick={()=>fetchdetails()} >Refresh</Button></HStack>
      {/* <Flex  > */}
      <VStack divider={<StackDivider />} border={'2px'} borderColor={'gray.100'} borderRadius={'lg'} justify="center" width={'50%'}>
        {Details.map(detail=>(
          // <Box key={detail.id} _hover={{boxShadow:'lg'}} borderRadius={5} border={'2px'} borderColor={'teal.500'}>
          
          <HStack  spacing={2} p={2} width={'90%'} flexDirection={'row'} >  
            <Image src={detail.Image} boxSize={'50px'} borderRadius="full"/>
            <h1>{detail.Doctor_name}</h1>
            <h1>{detail.NUID}</h1>
          <Spacer/>
          <Popover>
          <PopoverTrigger>
          <IconButton icon={<InfoIcon/>} size={'sm'} bg={'white'} isRound="true" _hover={{color:'gray.400'}} />
          </PopoverTrigger>
          <PopoverContent w={'60%'}>
         <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{`Dr.${detail.Doctor_name}`}</PopoverHeader>
        <PopoverBody>
          <HStack >
            <Image src={detail.Image} alt={'No Photo'} boxSize={'40%'}/>
            <VStack align={'start'} p={2}>
              <h1>{`Email:${detail.Email_Address}`}</h1>
              <h1>{`Qualification:${detail.Qualifications}`}</h1>
              <h1>{`DOB:${detail.DOB}`}</h1>
              <h1>{`Address:${detail.Current_Address}`}</h1>
              <h1>{`Specialization:${detail.Specialization}`}</h1>
              <h1>{`Joined-Date:${detail.Date_Joined}`}</h1>
              <h1>{`Joined-day:${detail.Day_Joined}`}</h1>
              <h1>{`Account-Created:${detail.Time_Joined}`}</h1>
            </VStack>
          </HStack>
        </PopoverBody>
      </PopoverContent>
          </Popover>
          <IconButton icon={<DeleteIcon/>} isRound="true" onClick={()=>handledelete(detail.Medical_License_Number)} color={'teal'} _hover={{color:'red'}}/>
          
          </HStack>
          
        ))}
        <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>
                  Confirmation!
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>Do you want to delete this account</ModalBody>
                <ModalFooter >
                  <Button colorScheme='blue' right={6} onClick={onClose}>Close</Button>
                  <Button colorScheme='red' right={2} onClick={()=>handlesubmit()}>Delete</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
      </VStack>
      {/* </Flex> */}
    </Box>
  )
}

export default GetAllNurse 