import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
  HStack,
  useColorMode,
  useColorModeValue,
  Switch,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toogle from './Toogle';

const LoginForm = () => {
  const jwt=localStorage.getItem('jwt');
  useEffect(()=>{
    if(jwt)
    {
      navigate('/home');
    }
  },[])
  let check=true;
  const [isLoading,SetisLoading] =useState(false);
  const [adminuser,Setadminuser]=useState("");
  const [password,SetPassword]=useState("");
  const navigate=useNavigate();
  const toast=useToast();
  const handlesubmit=async()=>{
    SetisLoading(true);
    if(adminuser.length===0)
      {
        toast({
          title:"Field Should not empty",
          status:"warning",
          duration:1200,
          position:"top"
        })
        SetisLoading(false)
        return;
      }
      if(password.length===0)
        {
          toast({
            title:"Field Should not empty",
            status:"warning",
            duration:1200,
            position:"top"
          })
          SetisLoading(false)
          return;
        }
    const response=await axios.post('https://medivault.onrender.com/admin/login',{adminuser,password});
    if(response.data.msg==='Login successful')
    {
        localStorage.setItem('jwt',response.data.token);
        SetisLoading(false);
        toast({
          title:response.data.msg,
          status:"success",
          duration:1000,
          isClosable:true,
          onCloseComplete:()=>{
            navigate('/home')
          },
          position:'top'
        })
    }
    else
    {
      toast({
        title:response.data.msg,
        status:"error",
        duration:3000,
        isClosable:true,
        position:'top'
      })
      SetisLoading(false);
    }
    Setadminuser("");
    SetPassword("");
  }
  // const {toggleColorMode} =useColorMode();
  const backgroundcolor=useColorModeValue('gray.100','gray.700')
  return (
    <Box maxW={"md"} bg={backgroundcolor} mx={'auto'} mt={'10%'} boxShadow={'lg'} borderRadius={'lg'}>
      <VStack p={'10%'} spacing={'30px'}>
        <Heading color={'teal'}>Login Form</Heading>
          <FormControl id='username' isRequired>
          <FormLabel color={'teal'}>
            Username:
          </FormLabel>
          <Input boxShadow={'md'} type='username' onChange={(e)=>Setadminuser(e.target.value)}/>
          </FormControl>
          <FormControl id='password' isRequired>
          <FormLabel color={'teal'}>
            Password
          </FormLabel>
          <Input  boxShadow={'md'} type='password' onChange={(e)=>SetPassword(e.target.value)}/>
          </FormControl>
          <Button colorScheme={'teal'} onClick={handlesubmit} isLoading={isLoading} loadingText='Logging'>
            Login
          </Button>
          <HStack width={'100%'}>
      <Toogle check={check}/> 
        </HStack>
      </VStack>
      
    </Box>
  )
};

export default LoginForm;
