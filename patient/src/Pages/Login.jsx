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
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Webcam from 'react-webcam';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebasestorage/firebase';
import { useNavigate } from "react-router-dom";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import axios from "axios";

const FaceRecognitionPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const image = captureImage(); 
    const downloadUrl = await uploadImage(image); 
    console.log(downloadUrl)
    try {
      
      const response = await axios.post('http://localhost:5000/patient/loginforpatient', { image: downloadUrl }
      );
      if (response.data.msg === "Faces match!") {
        localStorage.setItem('patient', JSON.stringify(response.data.result));
        localStorage.setItem('Jwt',response.data.token)
        toast({
          title: response.data.msg,
          status: "success",
          position: "top",
          duration: 1200,
          onCloseComplete: () => {
            navigate('/history');
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
      setCameraOn(false);
    } catch (err) {
        console.log(err)
      toast({
        title: "Error in sending details",
        status: "error",
        duration: 1200,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCameraToggle = () => {
    setCameraOn(!cameraOn);
  };

  const auth=getAuth();

  const handleGoogleSignIn=async()=>{
    const provider=new GoogleAuthProvider();
    provider.setCustomParameters({prompt:"select_account"})
    try{
      const result=await signInWithPopup(auth,provider)
      console.log(result._tokenResponse.idToken)
      await axios.post("http://localhost:5000/patient/googleauth",{ idToken:result._tokenResponse.idToken  })
      .then((res)=>{
        if(res.data.msg==="Username Found")
        {
          localStorage.setItem('patient', JSON.stringify(res.data.result));
        localStorage.setItem('Jwt',res.data.token)
          toast({
            title:res.data.msg,
            isClosable:true,
            position:"top",
            duration:1200,
            status:"success",
        
          })
          navigate('/history');
              
        }
        else
        {
          toast({
            title:res.data.msg,
            isClosable:true,
            position:"top",
            status:"error"
          })
        }
      })
      .catch((err=>{
          toast({
              title:"Error in Login nurse",
              isClosable:true,
              status:"error",
              position:"top",
              duration:1200,
            })
      }))
    }
    catch(err)
    {
      console.log(err)
    }
  }

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBg = useColorModeValue("white", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" bg={bgColor}>
      <Box bg={boxBg} p={8} rounded="md" shadow="xl" width={{ base: "90%", md: "500px" }}>
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
            <Button
              colorScheme="green"
              onClick={handleCaptureAndSubmit}
              size="lg"
              isLoading={loading}
              loadingText="Logging In"
            >
              Login to Patient Account
            </Button>
          )}

          {/* Google Sign-In Button using Firebase */}
          <Button colorScheme="teal" onClick={handleGoogleSignIn} size="lg" variant="outline">
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default FaceRecognitionPage;
