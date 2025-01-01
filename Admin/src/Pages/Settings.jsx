import React, { useState } from 'react';
import {
  Box, Button, Input, Heading, VStack, FormControl, FormLabel, useToast, Stack, Divider, IconButton
} from '@chakra-ui/react';
import { FaSave, FaLock } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import Sidebar from './Sidebar';

const AccountSettings = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { email, currentPassword, newPassword, confirmPassword } = values;

      if (!email || !currentPassword || !newPassword || !confirmPassword) {
        toast({
          title: "All fields are required.",
          status: "error",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          title: "Passwords do not match.",
          status: "error",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Here, you would typically send the updated data to the backend
      const response = await axios.put('https://your-api-url.com/update-account', {
        email,
        currentPassword,
        newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Account updated successfully",
          status: "success",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
        setValues({
          email: "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast({
          title: response.data.message || "Error updating account",
          status: "error",
          position: "top",
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error updating account",
        status: "error",
        position: "top",
        duration: 1500,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="gray.100" p={6} ml={{ base: 0, md: '250px' }} transition="margin-left 0.2s ease" w={'100%'} minH="100vh">
      <Box width="90%" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="md">
        <Heading size="lg" textAlign="center" mb={4}>Account Settings</Heading>
        <Divider mb={4} />

        <VStack spacing={4} align="start">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter your new email"
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              name="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              placeholder="Enter a new password"
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              isRequired
            />
          </FormControl>

          <Button
            colorScheme="teal"
            onClick={handleSave}
            isLoading={isLoading}
            spinner={<BeatLoader size={8} color="white" />}
            leftIcon={<FaSave />}
            isFullWidth
          >
            Save Changes
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

const ViewAccountSettings = () => {
  return (
    <Box display="flex" w="100%" minH="100vh">
      <Sidebar />
      <AccountSettings />
    </Box>
  );
};

export default ViewAccountSettings;
