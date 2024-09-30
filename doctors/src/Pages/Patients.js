import React, { useState } from 'react'
import { HStack,Flex,Box,useToast, Center,Image, FormControl,Input, FormLabel } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure,Button
} from '@chakra-ui/react'
import axios from 'axios'

function Patients() {
  const navigate=useNavigate()
  const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username,Setusername]=useState();
  const [password,Setpassword]=useState();
  const handlesumbit=async()=>{
    try{
      const response=await axios.post('http://localhost:5000/patient/login',{Aadhar:username,password:password})
      if(response.data.msg==="Patient login successfully Done")
      {
        localStorage.setItem('patient',JSON.stringify(response.data.result));
        toast({
          title:response.data.msg,
          status:"success",
          position:"top",
          duration:1200,
          onCloseComplete:()=>{
            navigate('/patient-logged')
          }
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
    catch(err)
    {
      toast({
        title:"Error in sending details",
        status:"error",
        duration:1200,
        position:"top"
      })
    }
  }

  return (
    <Box>
      <motion.div whileTap={{scale:0.8}}>
        <Image src={'https://www.freeiconspng.com/uploads/security-lock-icon-green-15.png'} boxSize={'20%'} mx={'auto'} onClick={onOpen}/>
      </motion.div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
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
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={()=>handlesumbit()}>Sign in</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default Patients