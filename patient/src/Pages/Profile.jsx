import React from 'react';
import { Box, Heading, Text, Image, VStack, HStack, Divider, IconButton } from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const PatientProfile = () => {
    const navigate=useNavigate()
  const patient = {
    Aadhar: "9393893939",
    Address: "Villooni,Eruthempathey(PO),Chittur,Palakkad-678555",
    DOB: "2003-12-20",
    Mobile_no: "8590958033",
    Name: "SECE DINESHKUMAR R",
    Photo: "https://firebasestorage.googleapis.com/v0/b/dinesh-22aee.appspot.com/o/images%2Fimage-1736515575953.jpg?alt=media&token=746bd110-6350-41f0-b229-2efd826dfada"
  };

  const handleHomeClick = () => {
    navigate('/history')
  };

  return (
    <Box p={5} maxW="500px" mx="auto" bg="gray.50" borderRadius="md" boxShadow="lg" position="relative" mt={'5%'}>
      <IconButton
        icon={<FiHome />}
        aria-label="Home"
        position="absolute"
        top="5"
        right="5"
        size="lg"
        colorScheme="teal"
        onClick={handleHomeClick}
      />
      <VStack spacing={4} align="start">
        <Heading as="h2" size="lg" textAlign="center">Patient Profile</Heading>
        <Image
          boxSize="150px"
          objectFit="cover"
          borderRadius="full"
          src={patient.Photo}
          alt="Patient Photo"
          mx="auto"
        />
        <VStack align="start" spacing={2} w="100%">
          <HStack w="100%">
            <Text fontWeight="bold" width="30%">Name:</Text>
            <Text>{patient.Name}</Text>
          </HStack>
          <HStack w="100%">
            <Text fontWeight="bold" width="30%">Aadhar:</Text>
            <Text>{patient.Aadhar}</Text>
          </HStack>
          <HStack w="100%">
            <Text fontWeight="bold" width="30%">Address:</Text>
            <Text>{patient.Address}</Text>
          </HStack>
          <HStack w="100%">
            <Text fontWeight="bold" width="30%">DOB:</Text>
            <Text>{patient.DOB}</Text>
          </HStack>
          <HStack w="100%">
            <Text fontWeight="bold" width="30%">Mobile No:</Text>
            <Text>{patient.Mobile_no}</Text>
          </HStack>
        </VStack>
        <Divider />
        <Text fontSize="sm" textAlign="center" color="gray.500">
          Profile last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Box>
  );
};

export default PatientProfile;
