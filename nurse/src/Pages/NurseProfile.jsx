import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  FormControl,
  FormLabel,
  Spacer,
} from "@chakra-ui/react";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const DoctorProfile = () => {

  const navigate=useNavigate();

  const dob=localStorage.getItem('DoctorDOB')

  const [age, setAge] = useState(null);

  const [oldpass,Setoldpass]=useState();
  
  const [newpass,Setnewpass]=useState();

  useEffect(()=>{
    const calculateAge=()=>{
      const date=new Date();
      const birth=new Date(dob);
      let age=date.getFullYear()-birth.getFullYear();
      let month=date.getMonth()-birth.getMonth();
      if(month<0||(month===0&&date.getDate()<birth.getDate()))
      {
          age--;
      }
      setAge(age);
  }
  calculateAge()
  },[])

  const handleChangePassword = async() => {
    try{
        const objectID=localStorage.getItem('Id')
        const response=await axios.post("http://localhost:5000/nurse/passchange",{objectID,newpass,oldpass})
        if(response.data.msg==="Password change Successfully")
        {
            alert(response.data.msg);
        }
        else
        {
            alert(response.data.msg);
        }
    }
    catch(err){
        alert(err)
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/')
  };

  const handleGoHome = () => {
    navigate('/patient-login')
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={100}
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      {/* Header with Logo and Buttons */}
      <Flex align="center" justify="space-between" mb={6}>
        <HStack>
          <Avatar size="md" src={localStorage.getItem('HospitalLogo')} />
          <Heading as="h3" size="md" ml={2}>
            {localStorage.getItem('Hospitalname')}
          </Heading>
        </HStack>
        <HStack spacing={4}>
          <IconButton
            icon={<FiHome />}
            aria-label="Home"
            colorScheme="teal"
            onClick={handleGoHome}
          />
          <IconButton
            icon={<FiLogOut />}
            aria-label="Logout"
            colorScheme="red"
            onClick={handleLogout}
          />
        </HStack>
      </Flex>

      {/* Doctor Info Section */}
      <Flex align="center" mb={6}>
        <Avatar size="xl" src={localStorage.getItem('Photo')} mr={6} />
        <VStack align="flex-start" spacing={2}>
          <Heading as="h2" size="lg">{localStorage.getItem('DoctorName')}</Heading>
          <Text fontSize="sm">Age: {age}</Text>
          <Text fontSize="sm">Email: {jwtDecode(localStorage.getItem('Jwt')).user}</Text>
        </VStack>
      </Flex>

      {/* Change Password Section */}
      <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          Change Password
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Old Password</FormLabel>
          <Input type="password" placeholder="Enter old password" value={oldpass} onChange={(e)=>Setoldpass(e.target.value)}/>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input type="password" placeholder="Enter new password" value={newpass} onChange={(e)=>Setnewpass(e.target.value)}/>
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorProfile;
