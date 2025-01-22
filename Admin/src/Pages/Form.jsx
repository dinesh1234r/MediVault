import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    photo: null,
    qualifications: "",
    specialization: "",
    licenseNumber: "",
    registrationNumber: "",
    experience: "",
    contractType: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted data: ", formData);
    // Add your submission logic here
  };

  return (
    <Box maxW="600px" mx="auto" p={4} bg="white" boxShadow="md" borderRadius="md">
      <Heading size="lg" mb={6} textAlign="center">
        Add Doctor Details
      </Heading>
      <VStack spacing={4} align="stretch">
        {/* Name */}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" onChange={handleChange} />
        </FormControl>

        {/* DOB */}
        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input type="date" name="dob" onChange={handleChange} />
        </FormControl>

        {/* Gender */}
        <FormControl isRequired>
          <FormLabel>Gender</FormLabel>
          <Select name="gender" onChange={handleChange} placeholder="Select gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        {/* Email */}
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>

        {/* Address */}
        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Textarea name="address" onChange={handleChange} />
        </FormControl>

        {/* Photo */}
        <FormControl isRequired>
          <FormLabel>Upload Photo</FormLabel>
          <Input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </FormControl>

        {/* Qualifications */}
        <FormControl isRequired>
          <FormLabel>Qualifications</FormLabel>
          <Input name="qualifications" onChange={handleChange} />
        </FormControl>

        {/* Specialization */}
        <FormControl isRequired>
          <FormLabel>Specialization</FormLabel>
          <Input name="specialization" onChange={handleChange} />
        </FormControl>

        {/* License Number */}
        <FormControl isRequired>
          <FormLabel>Medical License Number</FormLabel>
          <Input name="licenseNumber" onChange={handleChange} />
        </FormControl>

        {/* Registration Number */}
        <FormControl isRequired>
          <FormLabel>Medical Council Registration Number</FormLabel>
          <Input name="registrationNumber" onChange={handleChange} />
        </FormControl>

        {/* Years of Experience */}
        <FormControl isRequired>
          <FormLabel>Years of Experience</FormLabel>
          <Input type="number" name="experience" onChange={handleChange} />
        </FormControl>

        {/* Contract Type */}
        <FormControl isRequired>
          <FormLabel>Contract Type</FormLabel>
          <Select
            name="contractType"
            onChange={handleChange}
            placeholder="Select contract type"
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default AddDoctor;
