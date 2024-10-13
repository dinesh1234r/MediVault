import React, { useState,useEffect } from 'react'
import { HStack,Flex,Box,FormControl,FormLabel,FormErrorMessage,Image,FormHelperText, Heading,Input, Button,Spacer,Text, VStack,Link,Spinner,useToast } from '@chakra-ui/react';
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
    const toast=useToast();
  const navigate=useNavigate();
  const [isLoading,SetisLoading]=useState(false);
  const [values,Setvalues]=useState({username:"",password:""});

  const handleChange=(e)=>{
    Setvalues({...values,[e.target.name]:e.target.value})
  }

  useEffect(()=>{
    if(localStorage.getItem('Jwt')&&localStorage.getItem('Id'))
    {
      navigate('/home')
    }
  },[])

  const handleSubmit=async()=>{
    SetisLoading(true);
    try{
      const {username,password}=values;
      if(username.length===0)
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
      await axios.post("https://medivault.onrender.com/scancenter/login",{username,password})
      .then((res)=>{
        if(res.data.msg==="Username Found")
        {
          toast({
            title:res.data.msg,
            isClosable:true,
            position:"top",
            duration:1200,
            status:"success",
            onCloseComplete:()=>{
              navigate('/home');
              localStorage.setItem('Jwt',res.data.jwt);
              localStorage.setItem('Id',res.data.objectID);
              localStorage.setItem('Photo',res.data.photo);
            },
          })
          Setvalues({username:"",password:""});
        }
        else
        {
          toast({
            title:res.data.msg,
            isClosable:true,
            position:"top",
            status:"error"
          })
        }
    })
    .catch((err=>{
        toast({
            title:err,
            isClosable:true,
            position:"top",
            duration:1200,
          })
    }))
    SetisLoading(false);
  }
  catch(err)
  {
    toast({
        title:err,
        isClosable:true,
        position:"top",
        duration:1200,
      })
  }
}

  return (
    <Box w={'40%'} mx={'auto'} align={'center'} mt={'8%'} border={'2px'} borderColor={'gray.200'} borderRadius={10} bg={'#f6f8fa'}>
        <VStack p={8} spacing={4}>
            <Heading color={'gray.600'} >Sign in</Heading>
            <FormControl isRequired>
                <VStack>
                    <FormLabel color={'gray.600'} w={'99%'}>Username</FormLabel>
                    <Input type='username' name='username' value={values.username} placeholder='Enter your username' bg={'white'} onChange={(e)=>handleChange(e)} />
                    <FormLabel color={'gray.600'} w={'99%'}>Password</FormLabel>
                    <Input type='password' name='password' value={values.password} placeholder='Enter your password' bg={'white'} onChange={(e)=>handleChange(e)} />
                </VStack>
            </FormControl>
            <HStack flexDirection={'row-reverse'} w={'100%'}><Link color={'gray.600'}>Forget Password?</Link></HStack>
            <Spacer h={'30px'}/>
            <Button w={'100%'} colorScheme='teal' isLoading={isLoading} onClick={()=>handleSubmit()} loadingText='Signing In'>Sign In</Button>
        </VStack>
    </Box>
  )
}

export default Login