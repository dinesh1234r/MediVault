import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Input,
  Button,
  Image,
  List,
  ListItem,
  IconButton,
  useToast,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { DeleteIcon,AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NurseEntryPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [disease, Setdisease] = useState("");
  const [key, Setkey] = useState("");
  const [value, Setvalue] = useState("");
  const [vitals, Setvitals] = useState({});
  const [patient, setPatient] = useState({});
  const dob=JSON.parse(localStorage.getItem('patient')).DOB;
  const [age, setAge] = useState(null);

  useEffect(() => {
    if(localStorage.getItem("Jwt")==undefined)
    {
      navigate("/")
    }
    if(localStorage.getItem("patient")==undefined)
    {
      navigate("//patient-login")
    }
    // Fetch patient details after face recognition
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData) {
      setPatient(patientData);
    } else {
      toast({
        title: "Patient details not found.",
        status: "error",
        duration: 1200,
        position: "top",
      });
      navigate("/home");
    }

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

calculateAge();
  }, [toast, navigate]);

  const saving = () => {
    if (key.trim() && value.trim()) {
      Setvitals((prev) => ({ ...prev, [key]: value }));
      Setkey("");
      Setvalue("");
    } else {
      toast({
        title: "Please provide both key and value for the vital.",
        status: "warning",
        duration: 1200,
        position: "top",
      });
    }
  };

  const todelete = (key1) => {
    const newVitals = { ...vitals };
    delete newVitals[key1];
    Setvitals(newVitals);
  };

  const handledata = async () => {
    try {
      const _id = patient._id;
      const response = await axios.post(
        "https://medivault.onrender.com/patient/entrypatient",
        { _id, disease, vitals },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.msg === "Datas added successfully") {
        toast({
          title: response.data.msg,
          status: "success",
          duration: 1200,
          position: "top",
        });
        Setdisease("");
        Setvitals({});
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
        title: "Error submitting data.",
        description: err.message,
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  const handlelogout = () => {
    localStorage.removeItem("patient");
    navigate("/patient-login");
  };

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      p={4}
    >
      <Box
        bg={boxBg}
        p={8}
        rounded="md"
        shadow="xl"
        width={{ base: "90%", md: "600px" }}
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" textAlign="center" color="teal.500">
            Patient Entry
          </Heading>

          {/* Patient Details */}
          <Box textAlign="center">
            <Image
              src={JSON.parse(localStorage.getItem('patient')).Photo || "https://via.placeholder.com/150"}
              alt="Patient Photo"
              borderRadius="md"
              boxSize="150px"
              objectFit="cover"
              mx="auto"
              mb={4}
            />
            <Text>
              <strong>Name:</strong> {JSON.parse(localStorage.getItem("patient")).Name || "N/A"}
            </Text>
            <Text>
              <strong>Age:</strong> {age || "N/A"}
            </Text>
          </Box>

          {/* Disease Input */}
          <Input
            value={disease}
            onChange={(e) => Setdisease(e.target.value)}
            placeholder="Enter disease details"
            bg="gray.100"
          />

          {/* Add Vitals */}
          <Box>
            <Heading as="h3" size="sm" mb={2}>
              Add Vitals
            </Heading>
            <HStack mb={4}>
              <Input
                placeholder="Vital Name (e.g., Blood Pressure)"
                value={key}
                onChange={(e) => Setkey(e.target.value)}
              />
              <Input
                placeholder="Vital Value (e.g., 120/80)"
                value={value}
                onChange={(e) => Setvalue(e.target.value)}
              />
              <IconButton
                      colorScheme="teal"
                      icon={<AddIcon />}
                      onClick={saving}
              />
              {/* <Button colorScheme="teal" onClick={saving}>
                Add
              </Button> */}
            </HStack>

            {/* List of Vitals */}
            {Object.keys(vitals).length > 0 && (
              <List spacing={2}>
                {Object.entries(vitals).map(([key, value]) => (
                  <ListItem
                    key={key}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bg="gray.50"
                    p={2}
                    rounded="md"
                  >
                    <Text>
                      {key}: {value}
                    </Text>
                    <IconButton
                      size="sm"
                      colorScheme="red"
                      icon={<DeleteIcon />}
                      onClick={() => todelete(key)}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Actions */}
          <HStack justifyContent="space-between">
            <Button colorScheme="red" onClick={handlelogout}>
              Logout
            </Button>
            <Button colorScheme="blue" onClick={handledata}>
              Submit Entry
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default NurseEntryPage;
