import React, { useState } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Image,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Flex,
  HStack,
  Avatar,

} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiUserPlus,
  FiBriefcase,
  FiClipboard,
} from "react-icons/fi";
import { FaSave, FaLock } from 'react-icons/fa';

const SettingsPage = () => {
  const navigate=useNavigate()
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const toast=useToast();

  const handleSave = async() => {
    try{
      const id=localStorage.getItem("ID");
      const response=await axios.post("http://localhost:5000/admin/passwordchange",{
        oldPassword,newPassword,id
      })
      if(response.data.msg==="PasswordChanged")
      {
        toast({
          title:"PasswordChanged",
          status:"success"
        })
      }
      else
      {
        toast({
          title:response.data.msg,
          status:"info"
        })
      }
    }
    catch(err)
    {
      toast({
        title:err,
        status:"error"
      })
    }
  };

  return (
    <Box
      w="full"
      maxW="600px"
      mx="auto"
      mt={8}
      p={4}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
      ml={"40%"}
    >
      
  <Flex justify="space-between" align="center" mb={6} >
          <HStack spacing={4}>
            
            <Heading>Doctors List</Heading>
            
          </HStack>
          <HStack>
            <Avatar name="Admin" size="sm" />
            <Button
              colorScheme="teal"
              variant="outline"
              leftIcon={<FiLogOut />}
              onClick={() => {
                localStorage.clear();
                navigate('/')
              }}
            >
              Logout
            </Button>
          </HStack>
        </Flex>
      <VStack spacing={4} align="start">
        {/* Hospital Image */}
        <FormControl>
          <FormLabel>Hospital Image</FormLabel>
          <Image
            src={localStorage.getItem("Image")}
            alt="Hospital"
            borderRadius="md"
            boxSize="150px"
            objectFit="cover"
          />
        </FormControl>

        {/* Hospital Name */}
        <FormControl>
          <FormLabel>Hospital Name</FormLabel>
          <Text fontSize="lg" fontWeight="bold">
            {localStorage.getItem("HospitalName")}
          </Text>
        </FormControl>

        {/* Email ID */}
        <FormControl>
          <FormLabel>Email ID</FormLabel>
          <Text fontSize="lg" fontWeight="bold">
            {jwtDecode(localStorage.getItem("jwt")).Email}
          </Text>
        </FormControl>

        {/* Old Password */}
        <FormControl>
          <FormLabel>Old Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </FormControl>

        {/* New Password */}
        <FormControl>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>

        {/* Save Button */}
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSave}
          isDisabled={!oldPassword || !newPassword}
          leftIcon={<FaSave />}
          isFullWidth
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

const ViewSettingPage = () => {
  return (
    <Box display="flex" w="100%" minH="100vh">
      <Sidebar />
      <SettingsPage />
    </Box>
  );
};

export default ViewSettingPage;
