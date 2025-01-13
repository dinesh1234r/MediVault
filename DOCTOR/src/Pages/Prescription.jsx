import React, { useEffect, useState, } from "react";
import { Box, Heading, Text, VStack, HStack, Divider, Table, Tr, Td, Button, Thead, Tbody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { addPrescriptionDetails } from '../Redux/Slice';
import axios from "axios";

const PrescriptionPage = () => {
  
  const details = useSelector((state) => state.history);
  console.log(details) 
  const [medicine,Setmedicine]=useState([])

  useEffect(()=>{
    Setmedicine(details.preciption);
  },[])
 
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleGoBack = () => {
    navigate('/patient-history'); // Navigate to the previous page
  };

  return (
    <Box w="full" p={8} bg="white" color="black" rounded="md" shadow="md" border="1px solid gray">
    
      <HStack justify="space-between" align="start" mb={4}>
        <VStack align="start" spacing={1}>
          <Heading size="md" color="black">
            {'Dr .'+details.DoctorDetails.doctor.Doctor_name}
          </Heading>
          <Text fontSize="sm">{details.DoctorDetails.doctor.Qualifications}</Text>
          <Text fontSize="sm">Reg. No: {details.DoctorDetails.doctor.Medical_License_Number}</Text>
        </VStack>
        <VStack align="end" spacing={1}>
          <Heading size="md" color="blue.600">
            {details.DoctorDetails.hospital.hospitalName}
          </Heading>
          <Text fontSize="sm">{details.DoctorDetails.hospital.address}</Text>
          <Text fontSize="sm">Ph: {details.DoctorDetails.hospital.phone}</Text>
          <Text fontSize="sm">Timing: {details.DoctorDetails.hospital.timings}</Text>
          <Text fontSize="sm">Closed: {details.DoctorDetails.hospital.closedOn}</Text>
        </VStack>
      </HStack>

      <Divider mb={4} />

      <Box mb={4}>
        <Text fontSize="sm">
          <b>ID:</b> 11 - OPD6 PATIENT (M) / 13 Y &nbsp;&nbsp; <b>Mob. No.:</b> {JSON.parse(localStorage.getItem('patient')).Mobile_no}
        </Text>
        <Text fontSize="sm">

          <b>Address:</b> {JSON.parse(localStorage.getItem('patient')).Address} &nbsp;&nbsp;&nbsp; <b>Weight (Kg):</b> 80, <b>Height (Cm):</b> 200 (B.M.I. = 20.00),
          <b> BP:</b> 120/80 mmHg
          {/* {Object.entries(details.vitals).map(([key, value]) => {
            <>
            <b>{key} :</b><Text>{value}</Text>
            </>
          })} */}
        </Text>
        <Text fontSize="sm">
          <b>Date:</b> {details.Date}
        </Text>
      </Box>

      <Divider mb={4} />


      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>
          Diagnosis:
        </Text>
        <Text fontSize="sm">* {details.disease}</Text>
      </Box>

      <Divider mb={4} />

      <Box mb={4}>
        <Heading size="sm" mb={4}>
          Medications
        </Heading>
        
        <Table variant="simple" size="sm" border="1px solid gray">
          <Thead>
            <Tr>
              <Td><b>Medicine Name</b></Td>
              <Td><b>Dosage</b></Td>
              {/* <Td><b>Duration</b></Td> */}
            </Tr>
          </Thead>
          <Tbody>
          {details.preciption.map((item, index) => {
          const { name, morning, afternoon, dinner, foodTiming, days } = item;
          const dosage = [
            morning ? '1 Morning' : null,
            afternoon ? '1 Afternoon' : null,
            dinner ? '1 Night' : null,
          ]
            .filter(Boolean)
            .join(', ');

          return (
            <Tr key={index}>
              <Td>{name}</Td>
              <Td>
                {dosage} ({foodTiming})
              </Td>
              {/* <Td>
                {days} Days (Tot: {days * (morning + afternoon + dinner)} {morning + afternoon + dinner === 1 ? 'Tab' : 'Tabs'})
              </Td> */}
            </Tr>
          );
        })}
        </Tbody>
        </Table>
      </Box>

      <Divider mb={4} />

      <Box>
          <Heading size="sm" mb={4}>
              Doctor's Advice
          </Heading>
          <Text mx={10}>* {details.notes}</Text>
      </Box>
      


      
      <Text mt={6} fontSize="xs" textAlign="center">
        Substitute with equivalent Generics as required.
      </Text>

      <HStack justify="center" spacing={4} mt={6}>
        <Button
          colorScheme="teal"
          onClick={handlePrint}
          sx={{
            "@media print": {
              display: "none",
            },
          }}
        >
          Print Prescription
        </Button>
        <Button
          colorScheme="gray"
          onClick={handleGoBack}
          sx={{
            "@media print": {
              display: "none",
            },
          }}
        >
          Previous Page
        </Button>
      </HStack>
    </Box>
  );
};

export default PrescriptionPage;
