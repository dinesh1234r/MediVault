import React, { useState, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  Image,
  useToast,
  Spacer,
} from "@chakra-ui/react";
import Webcam from "react-webcam";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebasestorage/firebase';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PatientRegistration = () => {
  const toast = useToast();

  const [patient, setPatient] = useState({
    name: "",
    aadhar: "",
    address: "",
    phone: "",
    dob: "",
    email:""
  });

  const [image1, setImage1] = useState("");
  const [url1, setUrl1] = useState("");
  const webcamRef1 = useRef(null);

  const navigate=useNavigate()

  const handleDrawerChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const capture = () => {
    const imageSrc = webcamRef1.current.getScreenshot();
    setImage1(imageSrc);
  };

  const handleUpload = async () => {
    if (!image1) {
      toast({
        title: "No image captured.",
        status: "warning",
        duration: 1200,
        position: "top",
      });
      return;
    }

    try {
      const byteString = atob(image1.split(",")[1]);
      const mimeString = image1.split(",")[0].split(":")[1].split(";")[0];
      const arrayBuffer = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([arrayBuffer], { type: mimeString });
      const uniqueFileName = `image-${Date.now()}.jpg`;
      const storageRef = ref(storage, `images/${uniqueFileName}`);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      setUrl1(downloadUrl);

      toast({
        title: "Image uploaded successfully!",
        status: "success",
        duration: 1200,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed to upload image.",
        description: error.message,
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  // Submit patient details to the server
  const handleSubmitDrawer = async () => {
    const { name, aadhar, address, phone, dob ,email} = patient;

    if (!name || !aadhar || !address || !phone || !dob || !url1||!email) {
      toast({
        title: "Please fill all fields and upload the photo.",
        status: "warning",
        duration: 1200,
        position: "top",
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://medivault.onrender.com/patient/register",
        {
          Name: name,
          Address: address,
          Aadhar: aadhar,
          Mobile_no: phone,
          Photo: url1,
          DOB: dob,
          Email: email
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.msg === "Registration Successfully Done") {
        toast({
          title: response.data.msg,
          status: "success",
          duration: 1500,
        });
        setPatient({
          name: "",
          aadhar: "",
          address: "",
          phone: "",
          dob: "",
        });
        setImage1("");
        setUrl1("");
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          duration: 1500,
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed.",
        description: error.message,
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  return (
    <Box p={8} maxW="600px" mx="auto" shadow="xl" bg="white" rounded="md">
      <VStack spacing={6}>
        <Heading as="h2" size="lg" color="teal.500">
          Patient Registration
        </Heading>

        {/* Form Fields */}
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={patient.name}
            onChange={handleDrawerChange}
            placeholder="Enter patient name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Aadhar Number</FormLabel>
          <Input
            name="aadhar"
            value={patient.aadhar}
            onChange={handleDrawerChange}
            placeholder="Enter 12-digit Aadhar number"
            type="number"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={patient.address}
            onChange={handleDrawerChange}
            placeholder="Enter address"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={patient.email}
            onChange={handleDrawerChange}
            placeholder="Enter 10-digit phone number"
            type="tel"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name="phone"
            value={patient.phone}
            onChange={handleDrawerChange}
            placeholder="Enter 10-digit phone number"
            type="tel"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            name="dob"
            value={patient.dob}
            onChange={handleDrawerChange}
            placeholder="Enter date of birth"
            type="date"
          />
        </FormControl>

        {/* Webcam and Image Upload */}
        <Box>
          <Heading as="h3" size="sm" mb={2}>
            Capture Patient Photo
          </Heading>
          {!image1 ? (
            <Webcam
              audio={false}
              ref={webcamRef1}
              screenshotFormat="image/jpeg"
              width="100%"
              height="auto"
              style={{ borderRadius: "8px", overflow: "hidden" }}
            />
          ) : (
            <Image src={image1} alt="Captured Preview" rounded="md" width="100%" />
          )}
          <HStack spacing={4} mt={4}>
            <Button
              colorScheme="teal"
              onClick={capture}
              isDisabled={!!image1}
            >
              Capture
            </Button>
            <Button
              colorScheme="red"
              onClick={() => setImage1("")}
              isDisabled={!image1}
            >
              Retake
            </Button>
          </HStack>
        </Box>

        <Button
          colorScheme="blue"
          onClick={handleUpload}
          isDisabled={!image1}
        >
          Upload Photo
        </Button>

        {/* Submit Form */}
        
        <HStack spacing={4} width="full" >
        <Button colorScheme="red" onClick={()=>{
          navigate('/patient-login')
        }}>
          Logout 
        </Button>
        <Spacer/>
        <Button colorScheme="green" onClick={handleSubmitDrawer}>
          Register Patient
        </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PatientRegistration;
