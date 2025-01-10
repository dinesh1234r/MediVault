import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Webcam from 'react-webcam';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebasestorage/firebase';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  // Box,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

const FaceRecognitionPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  // const videoRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();
  const webcamRef = useRef(null);
  const [url, setUrl] = useState("");

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    return imageSrc;
  };

  const uploadImage = async (image) => {
    if (!image) return;

    const byteString = atob(image.split(",")[1]);
    const mimeString = image.split(",")[0].split(":")[1].split(";")[0];

    const arrayBuffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    const uniqueFileName = `image-${Date.now()}.jpg`;
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    const snapshot = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    setUrl(downloadUrl); 
    return downloadUrl;
  };

  const handleCaptureAndSubmit = async () => {
    const image = captureImage(); 
    const downloadUrl = await uploadImage(image); 
    console.log(downloadUrl)
    try {
      const response = await axios.post('http://localhost:5000/patient/login', { image: downloadUrl },{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.msg === "Faces match!") {
        localStorage.setItem('patient', JSON.stringify(response.data.result));
        toast({
          title: response.data.msg,
          status: "success",
          position: "top",
          duration: 1200,
          onCloseComplete: () => {
            navigate('/patient-history');
          },
        });
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          position: "top",
          duration: 1200,
        });
      }
      // stopCamera(); // Automatically turn off the camera after login
      setCameraOn(false);
    } catch (err) {
      toast({
        title: "Error in sending details",
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };


  const handleCameraToggle = () => {
    // if (!cameraOn) {
    //   startCamera();
    // } else {
    //   stopCamera();
    // }
    setCameraOn(!cameraOn);
  };

  // const startCamera = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = stream;
  //     }
  //   } catch (error) {
  //     console.error("Error accessing the camera: ", error);
  //   }
  // };

  // const stopCamera = () => {
  //   if (videoRef.current && videoRef.current.srcObject) {
  //     const tracks = videoRef.current.srcObject.getTracks();
  //     tracks.forEach((track) => track.stop());
  //     videoRef.current.srcObject = null;
  //   }
  // };

  // const handleLogin = () => {
  //   // Add logic to process face recognition and login to the patient's account.
  //   alert("Logged into patient account successfully!");
  //   stopCamera(); // Automatically turn off the camera after login
  //   setCameraOn(false);
  // };

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
    >
      <Box position="fixed" top="1rem" right="1rem">
      <Menu>
        <MenuButton
          as={IconButton}
          // icon={<FiChevronDown />}
          variant="ghost"
          isRound='true'
          _hover={{ bg: "gray.200" }}
          _active={{ bg: "gray.300" }}
        >
          <Avatar name="Doctor" src="https://bit.ly/broken-link" size="md" />
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={()=>navigate('/patient-register')}>Register Patient</MenuItem>
          <MenuItem onClick={()=>{
            localStorage.clear();
            navigate('/')
            }}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
      <Box
        bg={boxBg}
        p={8}
        rounded="md"
        shadow="xl"
        width={{ base: "90%", md: "500px" }}
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" textAlign="center" color="teal.500">
            Face Recognition Login
          </Heading>

          <Text textAlign="center" color="gray.500">
            Please allow camera access for face recognition.
          </Text>

          <Box
            border="2px solid"
            borderColor="teal.500"
            rounded="md"
            overflow="hidden"
            bg="black"
            height="300px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {cameraOn ? (
              <Webcam
                // ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              ></Webcam>
            ) : (
              <Text color="white">Camera is off</Text>
            )}
          </Box>

          <Button colorScheme="teal" onClick={handleCameraToggle} size="lg">
            {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
          </Button>

          {cameraOn && (
            <Button colorScheme="green" onClick={handleCaptureAndSubmit} size="lg">
              Login to Patient Account
            </Button>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};

export default FaceRecognitionPage;
