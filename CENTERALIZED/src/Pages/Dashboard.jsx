import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
  Image,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import TopBar from "./TopBar";

const HospitalTable = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch hospitals list from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("https://medivault.onrender.com/hospitalmanagement/gethospitals");
        setHospitals(response.data.hospitals); 
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        setIsLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleViewDetails = (hospital) => {
    setSelectedHospital(hospital);
    onOpen();
  };

  const handleDeleteHospital = (index) => {
    const updatedHospitals = hospitals.filter((_, i) => i !== index);
    setHospitals(updatedHospitals);
  };

  return (
    <Box>
      <TopBar />
      <Box p={6}>
        <Heading mb={6} textAlign="center">
          List of Hospitals
        </Heading>
        {isLoading ? (
          <Spinner size="xl" color="teal.500" />
        ) : (
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Logo</Th>
                  <Th>Hospital Name</Th>
                  <Th>Owner Name</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {hospitals.map((hospital, index) => (
                  <Tr key={index}>
                    <Td>
                      <img src={hospital.logo || "https://via.placeholder.com/50"} alt="Hospital Logo" width="50" />
                    </Td>
                    <Td>{hospital.hospitalName}</Td>
                    <Td>{hospital.ownerName}</Td>
                    <Td>{hospital.email}</Td>
                    <Td>
                      <HStack justifyContent="space-between">
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => handleViewDetails(hospital)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteHospital(index)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}

        {/* Modal for Viewing Details */}
        {selectedHospital && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{selectedHospital.hospitalName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4} align="start">
                  <Image
                    src={selectedHospital.logo || "https://via.placeholder.com/100"}
                    alt="Hospital Logo"
                    boxSize="100px"
                    borderRadius="md"
                  />
                  <Text>
                    <strong>Owner:</strong> {selectedHospital.ownerName}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {selectedHospital.email}
                  </Text>
                  <Text>
                    <strong>Address:</strong> {selectedHospital.address}
                  </Text>
                  <Text>
                    <strong>Phone:</strong> {selectedHospital.phone}
                  </Text>
                  <Text>
                    <strong>Timings:</strong> {selectedHospital.timings}
                  </Text>
                  <Text>
                    <strong>Closed On:</strong> {selectedHospital.closedOn}
                  </Text>
                  <Text>
                    <strong>Specialties:</strong> {selectedHospital.specialties}
                  </Text>
                  <Text>
                    <strong>Number of Beds:</strong> {selectedHospital.numberOfBeds}
                  </Text>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="teal" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
};

export default HospitalTable;
