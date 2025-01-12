import React from "react";
import {
  Box,
  Avatar,
  Text,
  Flex,
  Heading,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const DoctorProfile = () => {
  const doctor = {
    name: "Dr. John Doe",
    age: 45,
    email: "johndoe@example.com",
    hospitalName: "City Hospital",
    hospitalLogo: "https://via.placeholder.com/100", 
  };

  const handleChangePassword = () => {
    console.log("Password change logic here");
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
      <Flex align="center" mb={6}>
        <Avatar size="xl" src={doctor.hospitalLogo} mr={6} />
        <VStack align="flex-start">
          <Heading as="h2" size="lg">{doctor.name}</Heading>
          <Text fontSize="sm">Age: {doctor.age}</Text>
          <Text fontSize="sm">Email: {doctor.email}</Text>
          <Text fontSize="sm">Hospital: {doctor.hospitalName}</Text>
        </VStack>
      </Flex>

      <Box mt={6}>
        <Heading as="h3" size="md" mb={4}>
          Change Password
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Old Password</FormLabel>
          <Input type="password" placeholder="Enter old password" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>New Password</FormLabel>
          <Input type="password" placeholder="Enter new password" />
        </FormControl>
        <Button colorScheme="teal" onClick={handleChangePassword}>
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorProfile;
