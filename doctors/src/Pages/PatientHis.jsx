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

const PatientHistory = () => {
  const toast = useToast();
  const [patient, setPatient] = useState({
    diseases: [],
    history: [],
  });
  const [selectedDisease, setSelectedDisease] = useState("");
  const [historyFilter, setHistoryFilter] = useState([]);
  const [notes, setNotes] = useState("");
  // const [prescription, setPrescription] = useState();
  const [history, setHistory] = useState([]);

  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0'); 
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const year = currentDate.getFullYear();
  const [age, setAge] = useState(null);
  const dob=JSON.parse(localStorage.getItem('patient')).DOB;
  const [diseases,SetDiseases]=useState([]);
  const [todayreport,SetTodayReport]=useState({});
  const [todayDisease,setTodayDisease]=useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const _id = JSON.parse(localStorage.getItem("patient"))._id;
        const response = await axios.post(
          "https://medivault.onrender.com/patient/history",
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
          // Check for today's data
          // const today = new Date().toISOString().split("T")[0];
          result.forEach((data) => {
            if (data.Date === simpleFormattedDate) {
              setNotes(data.notes);
              // setPrescription(data.prescription);
              setMedicines(data.preciption)
              setTodayDisease(data.disease)
              if(data.report.placeholder&& data.report.placeholder === "to be updated")
              {

              }
              else
              {
                console.log(data.report)
                SetTodayReport(data.report);
              }
            }
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

  const saveNotes = async () => {
    try {
      const _id = JSON.parse(localStorage.getItem("patient"))._id;
      const response = await axios.post(
        "https://medivault.onrender.com/patient/notesadded",
        { _id, notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.msg === "Notes added successfully") {
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
        title: "Error adding notes",
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

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
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    morning: false,
    afternoon: false,
    dinner: false,
    foodTiming: "",
  });

  // Save Medicines to Backend
  const saveMedicines = async () => {
    try{
      const _id=JSON.parse(localStorage.getItem('patient'))._id
      const Doctor=jwtDecode(JSON.stringify(localStorage.getItem('Jwt'))).user;
      console.log(medicines)
      const response=await axios.post('https://medivault.onrender.com/patient/updateprecription',{_id,preciption:medicines,Doctor},{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
            'Content-Type': 'application/json'
          }
        })
      if(response.data.msg==="Precription added successfully")
      {
          toast({
              title:response.data.msg,
              position:"top",
              duration:1200,
              status:"success"
          })
          // setMedicines([])
      }
      else
      {
          toast({
              title:response.data.msg,
              position:"top",
              duration:1200,
              status:"error"
          })
      }
  }
  catch(err)
  {
      toast({
          title:"Error occured in sending precription",
          position:"top",
          duration:1200,
          status:"error"
      })
  }
  };

  // Add Medicine to List
  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.foodTiming) {
      toast({
        title: "Please fill all required fields.",
        status: "error",
        duration: 1500,
        position: "top",
      });
      return;
    }
    setMedicines((prev) => [...prev, newMedicine]);
    console.log(medicines)
    setNewMedicine({
      name: "",
      morning: false,
      afternoon: false,
      dinner: false,
      foodTiming: "",
    });
  };

  // Remove Medicine from List
  const removeMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "Medicine removed successfully.",
      status: "info",
      duration: 1500,
      position: "top",
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pdfname,Setpdfname]=useState("");
  const [selectpdf,Setselectpdf]=useState("");
  const handleOpenPDF=(pdfname,pdflink)=>{
    Setselectpdf(pdflink);
    Setpdfname(pdfname)
    onOpen()
  }

  // const items = [
  //   // Uncomment to test with records
  //   "Item 1",
  //   "Item 2",
  //   "Item 3",
  //   "Item 4",
  //   "Item 5",
  //   "Item 6",
  //   "Item 7",
  //   "Item 1",
  //   "Item 2",
  //   "Item 3",
  //   "Item 4",
  //   "Item 5",
  //   "Item 6",
  //   "Item 7",
  // ];

  const handlerefreshed=()=>{
    setSelectedDisease("");
  }

  
  return (
    <VStack align="start" spacing={4} p={8}>
      <Box w="full" p={4} bg="teal.700" color="white" position="sticky" top="0" zIndex="10" boxShadow="md">
        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            {JSON.parse(localStorage.getItem('patient')).Name}, {age} years
          </Text>
          <Button colorScheme="red" onClick={() => alert("Logging out...")}>
            Logout
          </Button>
        </HStack>
      </Box>

      <HStack align="start" spacing={4}>
        <Box w="250px" p={4} bg="teal.700" color="white" rounded="md" shadow="md" position="sticky" top="60px">
          <HStack>
          <Heading size="md" mb={4}>
            Diseases
          </Heading>
          <Spacer/>
          <IconButton
      icon={<MdRefresh />} 
      aria-label="Refresh"
      mr={2} 
      onClick={()=>handlerefreshed()}
      colorScheme="teal"
      variant="outline" 
      size="sm" 
      isRound
      _hover={{ bg: "teal.500", color: "white" }} 
        />
          </HStack>
          <List spacing={3}>
            {diseases.map((disease, index) => (
              <Button
                key={index}
                variant="ghost"
                colorScheme="whiteAlpha"
                onClick={() => handleDiseaseClick(disease)}
                w="full"
                justifyContent="start"
              >
                {disease}
              </Button>
            ))}
          </List>
        </Box>

        <Box flex="1" p={4} bg="white" shadow="md" rounded="md" w={'1024px'}>
          <VStack spacing={4} align="start">
            {/* <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
              <Heading size="md" color="teal.500" mb={4}>
                Today's Details
              </Heading>
              <Textarea
                placeholder="Enter today's notes"
                mb={4}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <HStack spacing={4}>
                <Button colorScheme="teal" onClick={saveNotes}>
                  Save Notes
                </Button>
              </HStack>
            </Box> */}
            <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
              <Heading size="md" color="teal.500" mb={4}>
                Today's Details
              </Heading>

              {/* Disease Field */}
              <Box mb={4}>
                <Text fontWeight="bold" color="gray.700" mb={2}>
                  Disease:
                </Text>
                <HStack spacing={4}>
                  <Input
                    value={todayDisease}
                    onChange={(e) => setTodayDisease(e.target.value)}
                    placeholder="Enter disease"
                    bg="white"
                    size="sm"
                  />
                  <Button
                    colorScheme="teal"
                    size="sm"
                    // onClick={updateDisease}
                    _hover={{ bg: "teal.600" }}
                  >
                    Update Disease
                  </Button>
                </HStack>
              </Box>

              {/* Notes Section */}
              <Textarea
                placeholder="Enter today's notes"
                mb={4}
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                bg="white"
              />
              <HStack spacing={4}>
                <Button colorScheme="teal" onClick={saveNotes}>
                  Save Notes
                </Button>
                <Button
                  colorScheme="purple"
                  // onClick={handlePrescription}
                  _hover={{ bg: "purple.600" }}
                >
                  Prescription
                </Button>
              </HStack>
            </Box>


            <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
              <Heading size="md" color="teal.500" mb={4}>
                Medicines
              </Heading>
              <HStack spacing={4}>
                <Input
                  placeholder="Medicine Name"
                  value={newMedicine.name}
                  onChange={(e) =>
                    setNewMedicine((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
                <Select
                  placeholder="Before/After Food"
                  value={newMedicine.foodTiming}
                  onChange={(e) =>
                    setNewMedicine((prev) => ({
                      ...prev,
                      foodTiming: e.target.value,
                    }))
                  }
                >
                  <option value="Before Food">Before Food</option>
                  <option value="After Food">After Food</option>
                </Select>
              </HStack>
              <HStack mt={2} spacing={4}>
                <Button
                  colorScheme={newMedicine.morning ? "teal" : "gray"}
                  onClick={() =>
                    setNewMedicine((prev) => ({
                      ...prev,
                      morning: !prev.morning,
                    }))
                  }
                >
                  Morning
                </Button>
                <Button
                  colorScheme={newMedicine.afternoon ? "teal" : "gray"}
                  onClick={() =>
                    setNewMedicine((prev) => ({
                      ...prev,
                      afternoon: !prev.afternoon,
                    }))
                  }
                >
                  Afternoon
                </Button>
                <Button
                  colorScheme={newMedicine.dinner ? "teal" : "gray"}
                  onClick={() =>
                    setNewMedicine((prev) => ({
                      ...prev,
                      dinner: !prev.dinner,
                    }))
                  }
                >
                  Dinner
                </Button>
              </HStack>
              <Button colorScheme="teal" mt={4} onClick={addMedicine}>
                Add Medicine
              </Button>
              <List mt={4}>
                {medicines.length > 0 ? (
                  medicines.map((medicine, index) => (
                    <ListItem key={index} p={2} border="1px" borderColor="gray.300">
                      {medicine.name} - {medicine.foodTiming} - ({medicine.morning!=false?'morning,':''}{medicine.afternoon!=false?'afternoon,':''}{medicine.dinner!=false?'dinner':''})
                      <Button
                        colorScheme="red"
                        size="sm"
                        ml={4}
                        onClick={() => removeMedicine(index)}
                      >
                        Remove
                      </Button>
                    </ListItem>
                  ))
                ) : (
                  <Text>No medicines added yet.</Text>
                )}
              </List>
              <Button colorScheme="blue" onClick={saveMedicines} mt={4}>
                Save Medicines
              </Button>
            </Box>
            <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
            <Text fontSize="xl" fontWeight="bold">
                  Reports
            </Text>
          
                {/* Conditional Rendering */}
                {Object.keys(todayreport).length === 0? (
                  <Box
                    w="100%"
                    bg="red.100"
                    color="red.500"
                    p={4}
                    borderRadius="md"
                    textAlign="center"
                    boxShadow="sm"
                  >
                    No records found
                  </Box>
                ) : (
                  <Box
                    w="100%"
                    h="10vh"
                    overflowX="auto"
                    overflowY="hidden"
                    whiteSpace="nowrap"
                    p={2}
                    bg="gray.100"
                    borderRadius="md"
                    boxShadow="sm"
                    display="flex"
                    alignItems="center"
                  >
                    {Object.entries(todayreport).map(([key, value])=> (
                      <Button
                        key={key}
                        display="inline-block"
                        bg="teal.500"
                        color="white"
                        p={2}
                        m={1}
                        borderRadius="full"
                        minW="80px"
                        textAlign="center"
                        fontSize="sm"
                        boxShadow="md"
                        _hover={{
                          bg: "teal.600",
                          transform: "scale(1.05)",
                          transition: "0.2s",
                        }}
                        onClick={()=>handleOpenPDF(key,value)}
                      >
                        {key}
                      </Button>
                    ))}
                  </Box>
                )}
            </Box>
          </VStack>
          
        </Box>
      </HStack>
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
                // <Box key={index} mb={4} p={4} bg="white" shadow="sm" rounded="md">
                //   <Heading size="sm">{record.disease}</Heading>
                //   <Text>Diagnosis Date: {record.date}</Text>
                //   <Text>Vitals: {JSON.stringify(record.vitals)}</Text>
                //   <HStack>
                //   <Text>Report:</Text>
                //   {Object.keys(record.report).length === 0||record.report.placeholder||record.report.placeholder==="to be updated"? (
                //   <Box
                //     w="100%"
                //     bg="red.100"
                //     h="6vh"
                //     color="red.500"
                //     p={4}
                //     borderRadius="md"
                //     textAlign="center"
                //     boxShadow="sm"
                    
                //   >
                //     No records found
                //   </Box>
                // ) : (
                //   <Box
                //     w="100%"
                //     h="6vh"
                //     overflowX="auto"
                //     overflowY="hidden"
                //     whiteSpace="nowrap"
                //     p={2}
                //     // bg="gray.100"
                //     // borderRadius="md"
                //     // boxShadow="sm"
                //     display="flex"
                //     alignItems="center"
                //   >
                //     {Object.entries(record.report).map(([key, value],index)=> (
                //       <Button
                //         key={index}
                //         display="inline-block"
                //         bg="teal.500"
                //         color="white"
                //         p={2}
                //         m={1}
                //         borderRadius="full"
                //         minW="80px"
                //         textAlign="center"
                //         fontSize="sm"
                //         boxShadow="md"
                //         _hover={{
                //           bg: "teal.600",
                //           transform: "scale(1.05)",
                //           transition: "0.2s",
                //         }}
                //         onClick={()=>handleOpenPDF(key,value)}
                //       >
                //         {key}
                //       </Button>
                //     ))}
                //   </Box>
                // )}
          
                //   </HStack>
                //   <Text mt={4} fontStyle="italic">
                //     Notes: {record.notes}
                //   </Text>
                // </Box>
              //   <Box key={index} mb={4} p={4} bg="gray.50" shadow="md" rounded="lg">
              //   <HStack justifyContent="space-between" alignItems="center">
              //     <Box>
              //       <Heading size="sm" color="teal.600">
              //         {record.disease}
              //       </Heading>
              //       <Text fontSize="sm" color="gray.600">
              //         Diagnosis Date: {record.Date}
              //       </Text>
              //     </Box>
              //     <Box bg="blue.100" p={2} rounded="full" shadow="sm">
              //       <Text fontWeight="bold" color="blue.600" fontSize="sm">
              //         {/* {record.disease === "COVID-19" ? "High Alert" : "Stable"} */}
              //       </Text>
              //     </Box>
              //   </HStack>

              //   <Divider my={2} />

              //   <Text fontSize="sm" color="gray.700">
              //     Vitals:
              //   </Text>
              //   <Box
              //     bg="green.50"
              //     p={3}
              //     rounded="md"
              //     shadow="sm"
              //     my={2}
              //     fontSize="sm"
              //     fontWeight="medium"
              //   >
              //     {JSON.stringify(record.vitals)}
              //   </Box>

              //   <Accordion allowToggle>
              //     <AccordionItem>
              //       <AccordionButton>
              //         <Box flex="1" textAlign="left" fontWeight="bold" color="teal.500">
              //           Report Details
              //         </Box>
              //         <AccordionIcon />
              //       </AccordionButton>
              //       <AccordionPanel>
              //         {Object.keys(record.report).length === 0 ||
              //         record.report.placeholder === "to be updated" ? (
              //           <Box
              //             bg="red.100"
              //             p={4}
              //             rounded="md"
              //             textAlign="center"
              //             color="red.500"
              //             shadow="sm"
              //           >
              //             No records found
              //           </Box>
              //         ) : (
              //           <Flex wrap="wrap" gap={2} mt={2}>
              //             {Object.entries(record.report).map(([key, value], index) => (
              //               <Button
              //                 key={index}
              //                 bg="teal.500"
              //                 color="white"
              //                 px={4}
              //                 py={2}
              //                 rounded="full"
              //                 fontSize="sm"
              //                 shadow="md"
              //                 _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
              //                 onClick={() => handleOpenPDF(key, value)}
              //               >
              //                 {key}
              //               </Button>
              //             ))}
              //           </Flex>
              //         )}
              //       </AccordionPanel>
              //     </AccordionItem>
              //   </Accordion>

              //   <Text mt={4} fontStyle="italic" color="gray.500">
              //     Notes: {record.notes}
              //   </Text>
              // </Box>
              <Box key={index} mb={4} p={4} bg="gray.50" shadow="md" rounded="lg">
              <HStack justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading size="sm" color="teal.600">
                    {record.disease}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Diagnosis Date: {record.date}
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
                  // onClick={() => handlePrescription(record)}
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
