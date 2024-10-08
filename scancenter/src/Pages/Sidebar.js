import React, { useEffect, useState } from 'react'
import { HStack,Flex,Box, VStack,Text,Image,IconButton,useToast, Divider,Button, Heading,Input,useColorMode,useColorModeValue,Center } from '@chakra-ui/react';
import {jwtDecode} from 'jwt-decode';
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import {Popover,PopoverTrigger,PopoverContent,PopoverArrow,PopoverBody} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function SideBar() {
  const navigate=useNavigate()
  const toast=useToast();
//   const {colorMode,toggleColorMode}=useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const username=jwtDecode(JSON.stringify(localStorage.getItem('Jwt'))).user;
  const photo=localStorage.getItem('Photo');
  
  const [oldpass,Setoldpass]=useState();
  const [newpass,Setnewpass]=useState();
  const handlechangepass=async()=>{
    try{
      const objectID=localStorage.getItem('Id');
    const response=await axios.post('https://medivault.onrender.com/doctor/passchange',{oldpass,newpass,objectID})
    
      if(response.data.msg==="Password change Successfully")
      {
        toast({
          title:response.data.msg,
          status:"success",
          position:'top'
        })
      }
      else
      {
        toast({
          title:response.data.msg,
          status:"error",
          position:'top'
        })
      }
  }
  catch(err)
  {
    toast({
      title:err,
      status:"success",
      position:'top'
    })
  }
    }
//   const SwitchIcon=useColorModeValue(SunIcon,MoonIcon);

  return (
    <Box bg={'blue.900'} h={'100vh'}>
        <VStack >
            <Box h={'29vh'} mt={'5%'} >
              <VStack spacing={4}>
                <Image src={photo} alt='Photo' boxSize={'100px'} borderRadius="full" alignItems={'center'} />
                <Text color='white'>{`${username}`}</Text>
              </VStack>
            </Box>
            <Divider/>
            <Box  w={'95%'} h={'48vh'}> 
              <Text></Text>
            </Box>
            <Divider/>
            <Box h={'6vh'} w={"100%"}>
              <HStack w={"100%"}>
                <Center w={"50%"}>
              <motion.div
                whileTap={{ scale: 0.9,rotate: 360 }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
              >
                {/* <Popover trigger="hover">
                  <PopoverTrigger> */}
                  {/* <IconButton icon={<SwitchIcon/>} onClick={toggleColorMode} borderRadius={"full"}/> */}
                  {/* </PopoverTrigger>
                  <PopoverContent w={"120px"}>
                    <PopoverArrow/>
                    <PopoverBody>
                        <Text>Toogle Mode</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover> */}
                
                </motion.div>
                </Center>
                <Center h={'40px'}>
                  <Divider orientation='vertical'/>
                </Center>
                <Center w={"50%"}>
                <Popover trigger="hover" placement="right">
                    <PopoverTrigger>
                      <Box>
                        <motion.div whileHover={{rotate:360}} whileTap={{scale:0.9}}>
                          <IconButton icon={<FiSettings/>} onClick={onOpen} borderRadius={"full"}/>
                        </motion.div>
                      <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Change Password</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Heading size={2}>Old Password</Heading>
                                <Input type='text' value={oldpass} onChange={(e)=>Setoldpass(e.target.value)}/>
                                <Heading size={2}>New Password</Heading>
                                <Input type='text' value={newpass} onChange={(e)=>Setnewpass(e.target.value)}/>
                              </ModalBody>

                              <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                  Close
                                </Button>
                                <Button colorScheme='red' onClick={()=>handlechangepass()}>change password</Button>
                              </ModalFooter>
                            </ModalContent>
                        </Modal>
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent width={'85px'}>
                      <PopoverArrow />
                      <PopoverBody >
                        <Box >
                          Settings
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  </Center>
                  </HStack>
            </Box>
            <Divider/>
            <Popover trigger="hover" placement="right">
                <PopoverTrigger>
                  <Box>
                    <motion.div whileTap={{scale:0.9}}>
                    <IconButton icon={<BiLogOut/>} onClick={()=>{localStorage.clear();navigate('/')}} ></IconButton>
                    </motion.div>
                  </Box>
                </PopoverTrigger>
                <PopoverContent width={'80px'}>
                  <PopoverArrow />
                  <PopoverBody >
                    <Box >
                      Logout
                    </Box>
                  </PopoverBody>
                </PopoverContent>
          </Popover>
        </VStack>
    </Box>
  )
}

export default SideBar