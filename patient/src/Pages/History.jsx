import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  List,
  ListItem,
  useToast,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Checkbox,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Spacer,
  IconButton
} from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MdRefresh } from "react-icons/md";
import { useDispatch } from 'react-redux';
import {addPrescriptionDetails} from '../Redux/Slice'
import { useNavigate } from "react-router-dom";
import {  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';

const PatientHistory = () => {
  const toast = useToast();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [selectedDisease, setSelectedDisease] = useState("");
  const [historyFilter, setHistoryFilter] = useState([]);
  const [history, setHistory] = useState([]);

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0'); 
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const year = currentDate.getFullYear();
  const [age, setAge] = useState(null);
  const dob=JSON.parse(localStorage.getItem('patient')).DOB;
  const [diseases,SetDiseases]=useState([]);
  
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure(); 

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const _id = JSON.parse(localStorage.getItem("patient"))._id;
        const response = await axios.post(
          "http://localhost:5000/patient/history",
          { _id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data)
        if (response.data.msg === "History received") {
          const result = response.data.result.reverse();
          setHistory(result);
          const arr=[]
          result.forEach((data) => {
            if(!arr.includes(data.disease))
            {
              arr.push(data.disease);
            }
          });
          SetDiseases(arr)
          toast({
            title: response.data.msg,
            status: "success",
            duration: 1200,
            position: "top",
          });
        } else {
          toast({
            title: response.data.msg,
            status: "error",
            duration: 1200,
            position: "top",
          });
        }
      } catch (err) {
        toast({
          title: "Error fetching history",
          status: "error",
          duration: 1200,
          position: "top",
        });
      }
    };

    const calculateAge=()=>{
        const date=new Date();
        const birth=new Date(dob);
        let age=date.getFullYear()-birth.getFullYear();
        let month=date.getMonth()-birth.getMonth();
        if(month<0||(month===0&&date.getDate()<birth.getDate()))
        {
            age--;
        }
        setAge(age);
    }

    fetchHistory();
    calculateAge();
  }, []);
  const simpleFormattedDate = `${day}/${month}/${year}`;

  useEffect(() => {
    if (selectedDisease !== "") {
      const filteredHistory = history.filter(
        (data) => selectedDisease === data.disease
      );
      setHistoryFilter(filteredHistory);
    } else {
      setHistoryFilter(history);
    }
  }, [selectedDisease, history]);

  

  const handleDiseaseClick = (disease) => {
    setSelectedDisease(disease);
    toast({
      title: `Filtering history for ${disease}`,
      status: "info",
      duration: 1500,
      position: "top",
    });
  };

  const [medicines, setMedicines] = useState([]);
  

  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pdfname,Setpdfname]=useState("");
  const [selectpdf,Setselectpdf]=useState("");
  const handleOpenPDF=(pdfname,pdflink)=>{
    Setselectpdf(pdflink);
    Setpdfname(pdfname)
    onOpen()
  }

  
  const handlerefreshed=()=>{
    setSelectedDisease("");
  }

  const handlePrescription=(details)=>{
    if(details)
    {
      dispatch(addPrescriptionDetails(details));
      navigate('/prescription');
    }
    else
    {
      toast({
        title:"details are not there",
        status:"warning"
      })
    }
  }

  
  return (
    <VStack align="start" spacing={4} p={8}>
      <Box w="full" p={4} bg="teal.700" color="white" position="sticky" top="0" zIndex="10" boxShadow="md">
        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            {JSON.parse(localStorage.getItem('patient')).Name}, {age} years
          </Text>
          <Spacer/>
          <Button 
      colorScheme="teal"  
      size="md"
      onClick={()=>openModal()}
    >
      Filter
    </Button>
          <Button colorScheme="red" onClick={() =>{localStorage.removeItem("patient");navigate("/patient-login");}}>
            Logout
          </Button>
        </HStack>
      </Box>

      
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter by Disease</ModalHeader> {/* Modified name to reflect single disease selection */}
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" fontWeight="semibold">Select a Disease:</Text>
              <Box>
                {diseases.map((disease, index) => (
                  <Checkbox
                    key={index}
                    value={disease}
                    size="lg"
                    colorScheme="teal"
                    mb={2}
                    _hover={{ bg: "teal.100" }}
                    isChecked={selectedDisease === disease} // Only the selected disease will be checked
                    onChange={()=>handleDiseaseClick(disease)} // Select a new disease on change
                  >
                    {disease}
                  </Checkbox>
                ))}
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
          <IconButton
              icon={<MdRefresh />}
              aria-label="Refresh All Diseases"
              colorScheme="teal"
              onClick={handlerefreshed}
              mr={3}
              variant="outline"
              size="sm"
            />
            <Button variant="outline" mr={3} onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        size={'full'}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent mt={-1}>
          <DrawerCloseButton />
          <DrawerHeader h={'6vh'} >{`${pdfname}.pdf`}</DrawerHeader>

          <DrawerBody>
            <Box h={'90vh'}>

            <iframe
                title="PDF Viewer"
                src={selectpdf}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            </Box>
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
      
      <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
              <Heading size="md" color="teal.500" mb={4}>
                Patient History
              </Heading>
              {historyFilter.map((record, index) => (
                
              <Box key={index} mb={4} p={4} bg="gray.50" shadow="md" rounded="lg">
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading size="sm" color="teal.600">
                    {record.disease}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Diagnosis Date: {record.Date}
                  </Text>
                </Box>
                <Box bg="blue.100" p={2} rounded="full" shadow="sm">
                  <Text fontWeight="bold" color="blue.600" fontSize="sm">
                    {record.disease === "COVID-19" ? "High Alert" : "Stable"}
                  </Text>
                </Box>
              </HStack>
            
              <Divider my={2} />
            
              <Text fontSize="sm" color="gray.700">
                Vitals:
              </Text>
              <Box
                bg="green.50"
                p={3}
                rounded="md"
                shadow="sm"
                my={2}
                fontSize="sm"
                fontWeight="medium"
              >
                {JSON.stringify(record.vitals)}
              </Box>
            
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="bold" color="teal.500">
                      Report Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    {Object.keys(record.report).length === 0 ||
                    record.report.placeholder === "to be updated" ? (
                      <Box
                        bg="red.100"
                        p={4}
                        rounded="md"
                        textAlign="center"
                        color="red.500"
                        shadow="sm"
                      >
                        No records found
                      </Box>
                    ) : (
                      <Flex wrap="wrap" gap={2} mt={2}>
                        {Object.entries(record.report).map(([key, value], index) => (
                          <Button
                            key={index}
                            bg="teal.500"
                            color="white"
                            px={4}
                            py={2}
                            rounded="full"
                            fontSize="sm"
                            shadow="md"
                            _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
                            onClick={() => handleOpenPDF(key, value)}
                          >
                            {key}
                          </Button>
                        ))}
                      </Flex>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            
              {/* Prescription Button */}
              <HStack  mt={4}>
              <Text mt={4} fontStyle="italic" color="gray.500" maxW={'80%'}>
                Notes: {record.notes}
              </Text>
              <Spacer/>
                <Button
                  bg="purple.500"
                  color="white"
                  px={6}
                  py={2}
                  fontSize="sm"
                  rounded="full"
                  shadow="md"
                  _hover={{ bg: "purple.600", transform: "scale(1.05)" }}
                  onClick={() => handlePrescription(record)}
                >
                  Prescription
                </Button>
              </HStack>
            
              
            </Box>
            
              ))}
            </Box>
    </VStack>
  );
};

export default PatientHistory;
