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


// Doctor List Component
const DoctorList = () => {
  // const { isOpen, onToggle } = useDisclosure();
  // const bg = useColorModeValue("gray.50", "gray.800");
  // const textColor = useColorModeValue("gray.800", "gray.100");
  const navigate = useNavigate();
  const toast=useToast()
  const { isOpen, onOpen, onClose,onToggle } = useDisclosure();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    onOpen();
  };

  // const handleDelete = (doctorName) => {
  //   alert(`Deleted doctor: ${doctorName}`);
  // };
  const [doctorsData,SetdoctorsData]=useState([])
  // const doctorsData = [
  //   {
  //     "Doctor_name": "Doctor2",
  //     "Email_Address": "dfxcghj",
  //     "Medical_License_Number": "mec002",
  //     "Image": "http://res.cloudinary.com/dyv9xgbfx/image/upload/v1727507542/zx5djvkmtwozsfxbmvla.jpg",
  //     "DOB": "1999-11-01",
  //     "Gender": "male",
  //     "Current_Address": "cgfvbhjkl",
  //     "Qualifications": "cgfvhbj",
  //     "Specialization": "qwsd",
  //     "Years_of_experience": "dfghjki",
  //     "Contract_type": "gfhj",
  //     "Date_Joined": "28/9/2024",
  //     "Day_Joined": "Saturday",
  //     "Time_Joined": "12:42:42 pm"
  //   },
  //   {
  //     "Doctor_name": "Doctor3",
  //     "Email_Address": "fgckj21gibudqwbiwdbjuqwbuwbjefbkjefefefbjefef",
  //     "Medical_License_Number": "mec007",
  //     "Image": "http://res.cloudinary.com/dyv9xgbfx/image/upload/v1727507603/ltqzjidaanypisr3llsz.jpg",
  //     "DOB": "1989-12-09",
  //     "Gender": "male",
  //     "Current_Address": "gvbhjknlm",
  //     "Qualifications": "Doctor2",
  //     "Specialization": "qwsd",
  //     "Years_of_experience": "fygu8",
  //     "Contract_type": "gfhj",
  //     "Date_Joined": "28/9/2024",
  //     "Day_Joined": "Saturday",
  //     "Time_Joined": "12:43:39 pm"
  //   }
  // ];

  const fetchdetails=async()=>{
    const Admin=jwtDecode(localStorage.getItem('jwt')).adminuser;
    const response=await axios.post('http://localhost:5000/admin/getalldetailsofnurse',{Admin},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    if(response.data.msg==='Details are shown below')
    {
        toast({
          title:response.data.msg,
          status:'success',
          duration:3000,
          // position:'top'
        })
        SetdoctorsData(response.data.details);
    }
    else{
      toast({
        title:response.data.msg,
        status:'error',
        duration:3000,
        // position:'top'
      })
    }
  }
  
  useEffect(()=>{
    fetchdetails();
  },[])
  const { isOpen: isDoctorModalOpen, onOpen: onDoctorModalOpen, onClose: onDoctorModalClose } = useDisclosure();
  const [medicalnum,SetMedicalnum]=useState()
  const handledelete=(num)=>{
    SetMedicalnum(num);
    onDoctorModalOpen();
  }

  const handlesubmit=async()=>{
    const response=await axios.post("http://localhost:5000/admin/deletedetailnurse",{Medical_License_Number:medicalnum},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    if(response.data.msg==='Delete Successfully')
    {
      toast({
        title:response.data.msg,
        status:'success',
        duration:1500,
        // position:'top',
      })
      const finaldetails=doctorsData.filter(detail=>{
        return detail._id!=medicalnum;
      })
      SetdoctorsData(finaldetails);
    }
    else
    {
      toast({
        title:response.data.msg,
        status:'error',
        duration:1500,
        // position:'top'
      })
    }
    onDoctorModalClose()
  }

  return (
    <Box p={5} ml={{ base: 0, md: '250px' }} pt={8} w={'100%'} mt={-4}>
      {/* <Flex
        direction="column"
        flex="1"
        ml={{ base: 0, md: "250px" }}
        p={4}
        bg={bg}
        h="full"
      > */}
        {/* Top Navigation Bar */}
        <Flex justify="space-between" align="center" mb={6} >
          <HStack spacing={4}>
            
            <Heading>Nurses List</Heading>
            
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
          {doctorsData.map((doctor, index) => (
            <Tr key={index}>
              <Td>{doctor.Doctor_name}</Td>
              <Td>{doctor.Email_Address}</Td>
              <Td>{doctor.Medical_License_Number}</Td>
              <Td>
                <Button
                  leftIcon={<MdInfo />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(doctor)}
                >
                  View Details
                </Button>
                <IconButton
                  icon={<MdDelete />}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                  ml={3}
                  onClick={()=>handledelete(doctor._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Doctor Details */}
      {selectedDoctor && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Doctor Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Image
                  boxSize="150px"
                  borderRadius="full"
                  src={selectedDoctor.Image}
                  alt={selectedDoctor.Doctor_name}
                  mb={4}
                />
                <Text><strong>Name:</strong> {selectedDoctor.Doctor_name}</Text>
                <Text><strong>Date of Birth:</strong> {selectedDoctor.DOB}</Text>
                <Text><strong>Gender:</strong> {selectedDoctor.Gender}</Text>
                <Text><strong>Email:</strong> {selectedDoctor.Email_Address}</Text>
                <Text><strong>Address:</strong> {selectedDoctor.Current_Address}</Text>
                <Text><strong>Qualifications:</strong> {selectedDoctor.Qualifications}</Text>
                <Text><strong>Specialization:</strong> {selectedDoctor.Specialization}</Text>
                <Text><strong>Medical License Number:</strong> {selectedDoctor.Medical_License_Number}</Text>
                <Text><strong>Years of Experience:</strong> {selectedDoctor.Years_of_experience}</Text>
                <Text><strong>Contract Type:</strong> {selectedDoctor.Contract_type}</Text>
                <Text><strong>Joined On:</strong> {selectedDoctor.Date_Joined} ({selectedDoctor.Day_Joined})</Text>
                <Text><strong>Time Joined:</strong> {selectedDoctor.Time_Joined}</Text>
                <Divider my={4} />
                <Button colorScheme="red" onClick={onClose}>Close</Button>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Modal isOpen={isDoctorModalOpen} onClose={onDoctorModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this doctor? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            {/* Cancel Button */}
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            {/* Delete Button */}
            <Button colorScheme="red" ml={3} onClick={handlesubmit}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// Main App Component
const ViewNurses = () => {
  return (
    <Box display="flex" w="100%" minH="100vh">
      <Sidebar />
      <DoctorList />
    </Box>
  );
};

export default ViewNurses;
