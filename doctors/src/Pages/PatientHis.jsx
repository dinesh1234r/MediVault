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
} from "@chakra-ui/react";
import axios from "axios";

const PatientHistory = () => {
  const toast = useToast();
  const [patient, setPatient] = useState({
    name: "John Doe",
    age: 45,
    diseases: [],
    history: [],
  });
  const [selectedDisease, setSelectedDisease] = useState("");
  const [historyFilter, setHistoryFilter] = useState([]);
  const [notes, setNotes] = useState("");
  const [prescription, setPrescription] = useState("");
  const [history, setHistory] = useState([]);

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

        if (response.data.msg === "History received") {
          const result = response.data.result.reverse();
          setHistory(result);

          // Check for today's data
          const today = new Date().toISOString().split("T")[0];
          result.forEach((data) => {
            if (data.Date === today) {
              setNotes(data.notes);
              setPrescription(data.prescription);
            }
          });

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

    fetchHistory();
  }, []);

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
    try {
      await axios.post("https://medivault.onrender.com/patient/saveMedicines", {
        patientId: "12345", // Replace with dynamic patient ID
        medicines,
      });
      toast({
        title: "Medicines saved successfully.",
        status: "success",
        duration: 1500,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Error saving medicines.",
        status: "error",
        duration: 1500,
        position: "top",
      });
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

  



  return (
    <VStack align="start" spacing={4} p={8}>
      <Box w="full" p={4} bg="teal.700" color="white" position="sticky" top="0" zIndex="10" boxShadow="md">
        <HStack justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="bold">
            {patient.name}, {patient.age} years
          </Text>
          <Button colorScheme="red" onClick={() => alert("Logging out...")}>
            Logout
          </Button>
        </HStack>
      </Box>

      <HStack align="start" spacing={4}>
        <Box w="250px" p={4} bg="teal.700" color="white" rounded="md" shadow="md" position="sticky" top="60px">
          <Heading size="md" mb={4}>
            Diseases
          </Heading>
          <List spacing={3}>
            {patient.diseases.map((disease, index) => (
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
            <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
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
                      {medicine.name} - {medicine.foodTiming}
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

          </VStack>
        </Box>
      </HStack>
      <Box w="full" p={4} bg="gray.100" rounded="md" shadow="sm">
              <Heading size="md" color="teal.500" mb={4}>
                Patient History
              </Heading>
              {historyFilter.map((record, index) => (
                <Box key={index} mb={4} p={4} bg="white" shadow="sm" rounded="md">
                  <Heading size="sm">{record.disease}</Heading>
                  <Text>Diagnosis Date: {record.date}</Text>
                  <Text>Vitals: {JSON.stringify(record.vitals)}</Text>
                  <Text mt={4} fontStyle="italic">
                    Notes: {record.notes}
                  </Text>
                </Box>
              ))}
            </Box>
    </VStack>
  );
};

export default PatientHistory;
