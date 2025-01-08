import React, { useRef, useState } from 'react';
import { HStack, Box, useToast, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../src/firebasestorage/firebase';
import axios from 'axios';

function Patients() {
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

    try {
      const response = await axios.post('https://medivault.onrender.com/patient/login', { image: downloadUrl },{
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
            navigate('/patient-logged');
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
    } catch (err) {
      toast({
        title: "Error in sending details",
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  return (
    <Box ml={'30%'}>
      <HStack>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={320}
          style={{ borderRadius: '50%', overflow: 'hidden'}} 
        />
      </HStack>
      <Button mt={4} ml={'10%'} colorScheme="blue" onClick={handleCaptureAndSubmit}>
        Capture & Login
      </Button>
    </Box>
  );
}

export default Patients;
