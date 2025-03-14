import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Spinner,
  Flex,
  HStack,
  Spacer
} from "@chakra-ui/react";
import axios from "axios";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MedicalSummary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("AI is summarizing");
  const navigate=useNavigate()

  useEffect(() => {
    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      setLoadingText(`AI is summarizing${".".repeat(dotCount)}`);
    }, 500);

    fetchSummary().then(() => clearInterval(interval));
  }, []);

  const fetchSummary = async () => {
    try {
        
      const response = await axios.post("http://localhost:5000/ai/summarize", {id:JSON.parse(localStorage.getItem("patient"))._id});
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to fetch medical summary.");
    }
    setLoading(false);
  };

  return (
    <Box p={5} maxW="800px" mx="auto" boxShadow="md" borderRadius="lg">
      <Heading size="lg" textAlign="center" mb={4} color="teal.600">
        Patient Medical Summary
      </Heading>
      
      <VStack spacing={4} align="start">
        {loading ? (
          <Box p={4} bg="gray.100" borderRadius="md" textAlign="center" w="100%">
            <Spinner size="xl" color="teal.500" />
            <Text fontSize="lg" fontWeight="bold" mt={2}>
              {loadingText}
            </Text>
          </Box>
        ) : (
          <Box p={4} bg="gray.100" borderRadius="md">
            <Text whiteSpace="pre-line">{summary}</Text>
          </Box>
        )}
      </VStack>
      <HStack>
        <Spacer/>
        <Button colorScheme="gray" leftIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </HStack>
    </Box>
  );
};

export default MedicalSummary;
