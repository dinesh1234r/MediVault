import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Image,
  Heading,
  Input,
  Button,
  Spacer,
  HStack,
  Text,
  VStack,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
// import app from '../firebasestorage/firebase';

function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem('Jwt') && localStorage.getItem('Id')) {
      navigate('/patient-login');
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { username, password } = values;
      if (username.length === 0 || password.length === 0) {
        toast({
          title: 'Fields should not be empty',
          status: 'warning',
          duration: 1200,
          position: 'top',
        });
        setIsLoading(false);
        return;
      }

      const res = await axios.post('http://localhost:5000/doctor/login', { username, password });
      if (res.data.msg === 'Username Found') {
        localStorage.setItem('Jwt', res.data.jwt);
        localStorage.setItem('Id', res.data.objectID);
        localStorage.setItem('Photo', res.data.photo);
        localStorage.setItem('Hospitalname', res.data.Hospitalname);
        localStorage.setItem('HospitalLogo', res.data.HospitalLogo);
        localStorage.setItem('DoctorName', res.data.DoctorName);
        localStorage.setItem('DoctorDOB', res.data.DoctorDOB);

        toast({
          isClosable: true,
          title: 'Access Granted',
          status: 'success',
          position: 'top',
          duration: 1400,
          onCloseComplete: () => {
            navigate('/patient-login');
          },
        });
        setValues({ username: '', password: '' });
      } else {
        toast({
          title: 'Access Denied',
          isClosable: true,
          status: 'error',
          position: 'top',
        });
      }
    } catch (err) {
      toast({
        title: 'An error occurred',
        description: 'Please try again later.',
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 1200,
      });
    }
    setIsLoading(false);
  };

    const auth=getAuth();

  const handleGoogleSignIn=async()=>{
    const provider=new GoogleAuthProvider();
    provider.setCustomParameters({prompt:"select_account"})
    try{
      const result=await signInWithPopup(auth,provider)
      console.log(result.user.email+" "+result.user.emailVerified)
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <Flex align={'center'} justify={'center'} h={'100vh'} bgGradient="linear(to-r, teal.500, blue.500)">
      <Box
        w={{ base: '90%', md: '40%' }}
        p={8}
        borderRadius={10}
        bg={'white'}
        boxShadow={'2xl'}
      >
        <VStack spacing={6}>
          <Heading color={'teal.700'}>Welcome Back</Heading>
          <Text color={'gray.600'} fontSize={'lg'} textAlign={'center'}>
            Sign in to your account and manage your patients effortlessly.
          </Text>

          <FormControl isRequired>
            <VStack spacing={4} w={'100%'}>
              <Box w={'100%'}>
                <FormLabel color={'gray.600'}>Username</FormLabel>
                <Input
                  type="email"
                  name="username"
                  value={values.username}
                  placeholder="Enter your username"
                  bg={'gray.100'}
                  borderColor={'teal.300'}
                  _hover={{ borderColor: 'teal.500' }}
                  onChange={handleChange}
                />
              </Box>

              <Box w={'100%'}>
                <FormLabel color={'gray.600'}>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  bg={'gray.100'}
                  borderColor={'teal.300'}
                  _hover={{ borderColor: 'teal.500' }}
                  onChange={handleChange}
                />
              </Box>
            </VStack>
          </FormControl>

          <Button
            w={'100%'}
            colorScheme="teal"
            isLoading={isLoading}
            onClick={handleSubmit}
            loadingText="Signing In"
          >
            Sign In
          </Button>

          <HStack alignItems={'center'} w={'100%'}>
            <Divider />
            <Text color={'gray.500'}>or</Text>
            <Divider />
          </HStack>

          <Button
            w={'100%'}
            variant="outline"
            leftIcon={<FcGoogle />}
            onClick={handleGoogleSignIn}
            _hover={{ bg: 'gray.100' }}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default Login;
