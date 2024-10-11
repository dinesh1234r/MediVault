import React, { useEffect, useState } from 'react'
import { HStack,Flex,Box, VStack,Text,Image,Spacer,IconButton,useToast,Card, Divider,Button, Heading,Input,useColorMode,useColorModeValue,Center } from '@chakra-ui/react';
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
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import {clearFilter,addFilter} from '../Redux/Slice'
import { MdRefresh } from 'react-icons/md';

function SideBar() {
  const dispatch=useDispatch()
  const history=useSelector((state)=>state.history.history)
  const disease=[...new Set(history.map((data)=>data.disease))]
  const navigate=useNavigate()
  const toast=useToast();
  const {colorMode,toggleColorMode}=useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const username=jwtDecode(JSON.stringify(localStorage.getItem('Jwt'))).user;
  const photo=localStorage.getItem('Photo');
  
  const [oldpass,Setoldpass]=useState();
  const [newpass,Setnewpass]=useState();
  const handlechangepass=async()=>{
    try{
      const objectID=localStorage.getItem('Id');
    const response=await axios.post('https://medivault.onrender.com/doctor/passchange',{oldpass,newpass,objectID},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    
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
  const SwitchIcon=useColorModeValue(SunIcon,MoonIcon);

  const filtering=(disease)=>{
    dispatch(addFilter(disease))
  }

  const handlerefreshed=()=>{
    dispatch(clearFilter())
  }

  return (
    <Box bg={'blue.900'} h={'100vh'}>
        <VStack >
            <Box h={'29vh'} mt={'5%'} >
              <VStack spacing={4}>
                <Image src={photo} alt='Photo' boxSize={'100px'} borderRadius="full" alignItems={'center'} />
                <Text color='white'>{`Dr.${username}`}</Text>
              </VStack>
            </Box>
            <Divider/>
            <Box  w={'95%'} h={'48vh'} overflowY={'scroll'} >
              <HStack mb={4}>
                  <Text fontSize={'lg'} ml={2} color={'white'}>Disease</Text>
                  <Spacer/>
                  <IconButton
      icon={<MdRefresh />} 
      aria-label="Refresh"
      mr={2} 
      onClick={()=>handlerefreshed()}
      colorScheme="teal"
      variant="outline" 
      size="sm" 
      isRound
      _hover={{ bg: "teal.500", color: "white" }} 
    />
              </HStack> 
              <VStack>
              {disease.length===0?<Text >No Record Found</Text>:
              disease.map((item)=>(
                <Button w={'90%'} textAlign={'center'} fontSize={'lg'} mb={4}
                onClick={()=>filtering(item)}>{item}</Button>
              ))}
              </VStack>
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
                  <IconButton icon={<SwitchIcon/>} onClick={toggleColorMode} borderRadius={"full"}/>
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