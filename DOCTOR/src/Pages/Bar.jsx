import React, { useEffect, useState, } from "react";
import { Box, Heading, Text, VStack, HStack, Divider, Table, Tr, Td, Button, Thead, Tbody } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { addPrescriptionDetails } from '../Redux/Slice';

const PrescriptionPage = () => {
  
//   const dispatch = useDispatch();

// const sampleDetails = {
//     doctorName: 'Dr. Akshara',
//     patientId: '11 - OPD6 PATIENT',
//     medications: [
//         { name: 'Tab. Abciximab', dosage: '1 Morning', duration: '8 Days' },
//     ],
// };

// dispatch(addPrescriptionDetails(sampleDetails));
const details = useSelector((state) => state.history);
  console.log(details)
 
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleGoBack = () => {
    navigate('/patient-history'); // Navigate to the previous page
  };

  return (
    <Box w="full" p={8} bg="white" color="black" rounded="md" shadow="md" border="1px solid gray">
      {/* Header */}
      <HStack justify="space-between" align="start" mb={4}>
        {/* Doctor Info */}
        <VStack align="start" spacing={1}>
          <Heading size="md" color="black">
            Dr. Akshara
          </Heading>
          <Text fontSize="sm">M.S.</Text>
          <Text fontSize="sm">Reg. No: MMC 2018</Text>
        </VStack>
        {/* Hospital Info */}
        <VStack align="end" spacing={1}>
          <Heading size="md" color="blue.600">
            SMS Hospital
          </Heading>
          <Text fontSize="sm">B/503, Business Center, MG Road, Pune - 411000</Text>
          <Text fontSize="sm">Ph: 5465647658</Text>
          <Text fontSize="sm">Timing: 09:00 AM - 01:00 PM, 06:00 PM - 08:00 PM</Text>
          <Text fontSize="sm">Closed: Sunday</Text>
        </VStack>
      </HStack>

      <Divider mb={4} />

      {/* Patient Info */}
      <Box mb={4}>
        <Text fontSize="sm">
          <b>ID:</b> 11 - OPD6 PATIENT (M) / 13 Y &nbsp;&nbsp; <b>Mob. No.:</b> 9423380390
        </Text>
        <Text fontSize="sm">
          <b>Address:</b> Pune &nbsp;&nbsp;&nbsp; <b>Weight (Kg):</b> 80, <b>Height (Cm):</b> 200 (B.M.I. = 20.00),
          <b> BP:</b> 120/80 mmHg
        </Text>
        <Text fontSize="sm">
          <b>Date:</b> {new Date().toLocaleDateString()}
        </Text>
      </Box>

      <Divider mb={4} />

      {/* Chief Complaints and Clinical Findings */}
      <HStack align="start" spacing={4} mb={4}>
        <Box w="50%">
          <Text fontWeight="bold" mb={2}>
            Chief Complaints
          </Text>
          <Text fontSize="sm">* Fever with chills (4 days)</Text>
          <Text fontSize="sm">* Headache (2 days)</Text>
        </Box>
        <Box w="50%">
          <Text fontWeight="bold" mb={2}>
            Clinical Findings
          </Text>
          <Text fontSize="sm">* These are test findings for a test patient</Text>
          <Text fontSize="sm">* Entering sample diagnosis and sample prescription</Text>
        </Box>
      </HStack>

      {/* Diagnosis */}
      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>
          Diagnosis:
        </Text>
        <Text fontSize="sm">* Malaria</Text>
      </Box>

      <Divider mb={4} />

      {/* Medications */}
      <Box mb={4}>
        <Heading size="sm" mb={4}>
          Medications
        </Heading>
        <Table variant="simple" size="sm" border="1px solid gray">
          <Thead>
            <Tr>
              <Td><b>Medicine Name</b></Td>
              <Td><b>Dosage</b></Td>
              <Td><b>Duration</b></Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Tab. Abciximab</Td>
              <Td>1 Morning</Td>
              <Td>8 Days (Tot: 8 Tab)</Td>
            </Tr>
            <Tr>
              <Td>Tab. Vomilast</Td>
              <Td>1 Morning, 1 Night (After Food)</Td>
              <Td>8 Days (Tot: 16 Tab)</Td>
            </Tr>
            <Tr>
              <Td>Cap. Zoclar 500</Td>
              <Td>1 Morning</Td>
              <Td>3 Days (Tot: 3 Cap)</Td>
            </Tr>
            <Tr>
              <Td>Tab. Gestakind 10/SR</Td>
              <Td>1 Night</Td>
              <Td>4 Days (Tot: 4 Tab)</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Divider mb={4} />

      {/* Advice */}
      <Box mb={4}>
        <Text fontWeight="bold" mb={2}>
          Advice:
        </Text>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm">* Take bed rest</Text>
          <Text fontSize="sm">* Do not eat outside food</Text>
          <Text fontSize="sm">* Eat easy-to-digest food like boiled rice with dal</Text>
        </VStack>
      </Box>

      <Divider mb={4} />

      {/* Follow-Up */}
      <Box>
        <Text fontWeight="bold" mb={2}>
          Follow-Up:
        </Text>
        <Text fontSize="sm">04-09-2023</Text>
      </Box>

      <Text mt={6} fontSize="xs" textAlign="center">
        Substitute with equivalent Generics as required.
      </Text>

      {/* Buttons */}
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
