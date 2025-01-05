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
    console.log(values)
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
      await axios.post("https://medivault.onrender.com/doctor/login",{username,password})
      .then((res)=>{
        console.log(res);
        if(res.data.msg==="Username Found")
        {
              localStorage.setItem('Jwt',res.data.jwt);
              localStorage.setItem('Id',res.data.objectID);
              localStorage.setItem('Photo',res.data.photo);
          toast({
            isClosable:true,
            position:"top",
            duration:1400,
            onCloseComplete:()=>{
              navigate('/home');
            },
            render:()=>(
              <Box 
              bg="white"
              
              p={3}
              borderRadius="md"
              boxShadow="lg">
                <HStack ml={'10%'} spacing={30}>
                  <Image src='/tenor.gif' alt='Not' boxSize={'30px'} borderRadius={'full'}/>
                  <Text size={'lg'}>{res.data.msg}</Text>
                </HStack>
                
              </Box>
            )
          })
          Setvalues({username:"",password:""});
        }
        else
        {
          toast({
            isClosable:true,
            position:"top",
            render:()=>(
              <Box borderColor={null}
              // bg="white"
              // border="1px solid gray.200" 
              p={3}
              borderRadius="lg"
              boxShadow="lg">
                <HStack ml={'10%'} spacing={30}>
                  <Image src='/wrong.gif' alt='Not' boxSize={'30px'} borderRadius={'full'}/>
                  <Text size={'lg'}>{res.data.msg}</Text>
                </HStack>
                
              </Box>
            )
          })
        }
      })
    }
    catch(err)
    {
      toast({
        isClosable:true,
        position:"top",
        duration:1200,
        render:()=>(
          <Box color="black"
          bg="white"
          // border="1px solid gray.200" 
          p={3}
          borderRadius="md"
          boxShadow="lg">
            <HStack ml={'10%'} spacing={30}>
              <Image src='/wrong.gif' alt='Not' boxSize={'25px'} borderRadius={'full'}/>
              <Text size={'lg'}>{err}</Text>
            </HStack>
            
          </Box>
        )
      })
    }
    
    SetisLoading(false);
  }

  return (  
    <Box w={'40%'} mx={'auto'} align={'center'} mt={'8%'} border={'2px'} borderColor={'gray.200'} borderRadius={10} bg={'#f6f8fa'}>
        <VStack p={8} spacing={4}>
            <Heading color={'gray.600'} >Sign in</Heading>
            <FormControl isRequired>
                <VStack>
                    <FormLabel color={'gray.600'} w={'99%'}>Username</FormLabel>
                    <Input type='email' name='username' value={values.username} placeholder='Enter your username' bg={'white'} onChange={(e)=>handleChange(e)} />
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