import React, { useState } from 'react'
import { HStack,Flex,Box, Center,Image, FormControl,Input, FormLabel } from '@chakra-ui/react';
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

function Patients() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username,Setusername]=useState();
  const [password,Setpassword]=useState();
  const handlesumbit=()=>{
    console.log(username+" "+password);
  }

  return (
    <Box>
        <HStack>
            <motion.div whileTap={{scale:0.8}}>
                <Image src={'https://www.freeiconspng.com/uploads/security-lock-icon-green-15.png'} boxSize={'40%'} mx={'auto'} onClick={onOpen}/>
            </motion.div>
            <motion.div whileTap={{scale:0.8}}>
                <Image src={'https://www.togethercu.org/home/fiFiles/static/images/Button-Scheduling-Existing-Account-Update-Owners.png'} boxSize={'40%'} mx={'auto'} onClick={onOpen}/>
            </motion.div>
        </HStack>
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