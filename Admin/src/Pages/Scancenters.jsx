import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Stack,
  Divider,
  Image,
  Flex,
  Toast,
  useToast,
  ModalFooter,
  HStack,
  Avatar,
  Heading
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiUserPlus,
  FiBriefcase,
  FiClipboard,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdInfo } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Sidebar from './Sidebar';


const ScanCenterList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedScanCenter, setSelectedScanCenter] = useState(null);
  const [scanCentersData, setScanCentersData] = useState([]); // Initialize as an empty array
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const [licenseToDelete, setLicenseToDelete] = useState('');

  // Fetch details from API
  const fetchScanCenters = async () => {
    const admin = localStorage.getItem('ID');
    try {
      const response = await axios.post(
        'https://medivault.onrender.com/admin/getallScancenter',
        { Admin: admin },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.msg === 'Details are shown below') {
        toast({
          title: response.data.msg,
          status: 'success',
          duration: 3000,
          // position: 'top',
        });
        setScanCentersData(response.data.result || []); // Fallback to empty array
      } else {
        toast({
          title: response.data.msg,
          status: 'error',
          duration: 3000,
          // position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to fetch scan center details.',
        description: error.message,
        status: 'error',
        duration: 3000,
        // position: 'top',
      });
    }
  };

  useEffect(() => {
    fetchScanCenters();
  }, []);

  // Handle view details
  const handleViewDetails = (scanCenter) => {
    setSelectedScanCenter(scanCenter);
    onOpen();
  };

  // Handle delete modal
  const handleDelete = (licenseNumber) => {
    setLicenseToDelete(licenseNumber);
    onDeleteModalOpen();
  };

  // Submit delete request
  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.post(
        'https://medivault.onrender.com/admin/deletescancenter',
        { UID: licenseToDelete },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.msg === 'Delete Successfully') {
        toast({
          title: response.data.msg,
          status: 'success',
          duration: 1500,
          // position: 'top',
        });
        const updatedData = scanCentersData.filter(
          (center) => center._id !== licenseToDelete
        );
        setScanCentersData(updatedData);
      } else {
        toast({
          title: response.data.msg,
          status: 'error',
          duration: 1500,
          // position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Failed to delete scan center.',
        description: error.message,
        status: 'error',
        duration: 1500,
        // position: 'top',
      });
    }
    onDeleteModalClose();
  };

  return (
    <Box p={5} ml={{ base: 0, md: '250px' }} pt={8} w={'100%'} mt={-4}>
      <Flex justify="space-between" align="center" mb={6}>
        <HStack spacing={4}>
          <Heading>Scan Centers List</Heading>
        </HStack>
        <HStack>
          <Avatar name="Admin" size="sm" />
          <Button
            colorScheme="teal"
            variant="outline"
            leftIcon={<FiLogOut />}
            onClick={() => {
              localStorage.clear();
              navigate('/')
            }}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
      <Table variant="striped" colorScheme="teal" mb={6}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Medical License Number</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scanCentersData.length > 0 ? (
            scanCentersData.map((center, index) => (
              <Tr key={index}>
                <Td>{center.username}</Td>
                <Td>{center.Email_Address}</Td>
                <Td>{center.Medical_License_Number}</Td>
                <Td>
                  <Button
                    leftIcon={<MdInfo />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(center)}
                  >
                    View Details
                  </Button>
                  <IconButton
                    icon={<MdDelete />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    ml={3}
                    onClick={() => handleDelete(center._id)}
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4} textAlign="center">
                No scan center data available.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* View Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan Center Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedScanCenter ? (
              <Stack spacing={4}>
                <Flex align="center">
                  <Avatar
                    size="lg"
                    name={selectedScanCenter.username}
                    src={selectedScanCenter.Image}
                  />
                  <Box ml={4}>
                    <Heading size="sm">{selectedScanCenter.username}</Heading>
                    <Text fontSize="sm">
                      License Number: {selectedScanCenter.Medical_License_Number}
                    </Text>
                  </Box>
                </Flex>
                <Divider />
                <Text>Email: {selectedScanCenter.Email_Address}</Text>
                <Text>Address: {selectedScanCenter.Current_Address}</Text>
              </Stack>
            ) : (
              <Text>No data available.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this scan center?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onDeleteModalClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};



// Main App Component
const ViewScancenters = () => {
  return (
    <Box display="flex" w="100%" minH="100vh">
      <Sidebar />
      <ScanCenterList />
    </Box>
  );
};

export default ViewScancenters;
