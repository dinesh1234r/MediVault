import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import TopBar from "./TopBar";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase/firebase';

const AddHospitalForm = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    hospitalName: "",
    address: "",
    phone: "",
    logo: null,
    timings: "",
    closedOn: "",
    numberOfBeds: "",
    specialties: "",
  });

  const toast = useToast();
  const [isUploading, setIsUploading] = useState(false); // Track upload progress

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      if (formData.logo) {
        // Step 1: Upload image to Firebase Storage
        const storageRef = ref(storage, `hospital-logos/${formData.logo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.logo);

        // Monitor upload progress (optional)
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress monitoring logic (if needed)
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading image:", error);
            toast({
              title: "Error uploading image.",
              description: error.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setIsUploading(false);
          },
          async () => {
            // Step 2: Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);

            // Step 3: Update formData with the download URL
            const updatedFormData = {
              ...formData,
              logo: downloadURL,
            };

            // Step 4: Send data to the backend
            const response = await axios.post(
              "http://localhost:5000/hospitalmanagement/addhospitals",
              updatedFormData
            );

            if (response.data.msg === "Hospital added successfully") {
              toast({
                title: "Hospital added successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }

            setIsUploading(false);
          }
        );
      } else {
        toast({
          title: "Please upload a hospital logo.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting form.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <TopBar />
      <Box maxW="500px" mx="auto" p={4} boxShadow="md" borderRadius="md" mt={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Hospital Name */}
            <FormControl id="hospitalName" isRequired>
              <FormLabel>Hospital Name</FormLabel>
              <Input
                type="text"
                name="hospitalName"
                placeholder="Enter hospital name"
                value={formData.hospitalName}
                onChange={handleChange}
              />
            </FormControl>

            {/* Owner Name */}
            <FormControl id="ownerName" isRequired>
              <FormLabel>Owner Name</FormLabel>
              <Input
                type="text"
                name="ownerName"
                placeholder="Enter owner's name"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </FormControl>

            {/* Email */}
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            {/* Address */}
            <FormControl id="address" isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                placeholder="Enter hospital address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormControl>

            {/* Phone Number */}
            <FormControl id="phone" isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>

            {/* Hospital Logo */}
            <FormControl id="logo" isRequired>
              <FormLabel>Hospital Logo</FormLabel>
              <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
              />
            </FormControl>

            {/* Hospital Timings */}
            <FormControl id="timings" isRequired>
              <FormLabel>Hospital Timings</FormLabel>
              <Input
                type="text"
                name="timings"
                placeholder="e.g., 9:00 AM - 5:00 PM"
                value={formData.timings}
                onChange={handleChange}
              />
            </FormControl>

            {/* Closed On */}
            <FormControl id="closedOn">
              <FormLabel>Closed On</FormLabel>
              <Select
                name="closedOn"
                placeholder="Select day"
                value={formData.closedOn}
                onChange={handleChange}
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Select>
            </FormControl>

            {/* Number of Beds */}
            <FormControl id="numberOfBeds" isRequired>
              <FormLabel>Number of Beds</FormLabel>
              <Input
                type="number"
                name="numberOfBeds"
                placeholder="Enter number of beds"
                value={formData.numberOfBeds}
                onChange={handleChange}
              />
            </FormControl>

            {/* Specialties */}
            <FormControl id="specialties" isRequired>
              <FormLabel>Specialties</FormLabel>
              <Textarea
                name="specialties"
                placeholder="Enter specialties (e.g., Cardiology, Neurology)"
                value={formData.specialties}
                onChange={handleChange}
              />
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              isLoading={isUploading}
            >
              Add Hospital
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default AddHospitalForm;
