import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Input,
  Textarea,
  Button,
  HStack,
  useColorModeValue,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import axios from "axios";
// import { storage } from "./firebaseConfig"; // Ensure you have configured Firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const PatientDetailsPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [today, Settoday] = useState({});
  const [pdf, Setpdf] = useState(null);
  const [saving, Setsaving] = useState({});
  const [pdfFiles, setPdfFiles] = useState([]);

  // Fetch patient details on mount
  useEffect(() => {
    const fetchDetails = async () => {
      const _id = JSON.parse(localStorage.getItem("patient"))._id;
      const response = await axios.post(
        "https://medivault.onrender.com/patient/entryreport",
        { _id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.msg === "Entry Accepted") {
        console.log(response.data.result.report)
        Settoday(response.data.result);
        Setsaving(response.data.result.report)
        toast({
          title: response.data.msg,
          status: "success",
          position: "top",
          duration: 1200,
        });
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          position: "top",
          duration: 1200,
        });
      }
    };
    fetchDetails();
  }, []);

  const handleFileChange = (e) => {
    Setpdf(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!pdf) {
      toast({
        title: "Please select a PDF file to upload.",
        duration: 1200,
        position: "top",
        status: "error",
      });
      return;
    }

    const filename = prompt("Enter a name for your file:");
    if (filename == undefined || filename.trim() === "") {
      toast({
        title: "Please Enter a Name for the Report",
        duration: 1200,
        position: "top",
        status: "warning",
      });
      return;
    }

    const storageRef = ref(storage, `pdfs/${filename || pdf.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdf);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Handle upload progress here
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          Setsaving((prev) => ({ ...prev, [filename]: url }));
          toast({
            title: "PDF uploaded successfully.",
            status: "success",
            duration: 1200,
            position: "top",
          });
        });
      }
    );
  };

  const handleDeletePdf = (key) => {
    const temp = { ...saving };
    delete temp[key];
    Setsaving(temp);
  };

  const handleReport = async () => {
    try {
      const _id = JSON.parse(localStorage.getItem("patient"))._id;
      const response = await axios.post(
        "https://medivault.onrender.com/patient/updatereport",
        { _id, report: saving },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.msg === "Report Added successfully") {
        toast({
          title: response.data.msg,
          duration: 1200,
          position: "top",
          status: "success",
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
        title: "Error in adding report",
        status: "error",
        duration: 1200,
        position: "top",
      });
    }
  };

  const handleLogout = () => {
    navigate("/home");
    localStorage.removeItem("patient");
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
            Patient Details
          </Heading>

          {/* Patient Info */}
          <VStack align="start" spacing={4}>
            <Text>
              <strong>Name:</strong> {JSON.parse(localStorage.getItem("patient")).Name}
            </Text>
            <Text>
              <strong>Age:</strong> {today.age || "N/A"}
            </Text>
            <Text>
              <strong>Disease:</strong> {today.disease || "N/A"}
            </Text>
            <Text>
              <strong>Date:</strong> {today.date || new Date().toLocaleDateString()}
            </Text>
          </VStack>

          {/* Note Box */}
          <Textarea
            value={today.note || "No notes available."}
            isReadOnly
            placeholder="Note"
            bg="gray.100"
          />

          {/* File Upload */}
          <HStack>
            <Input type="file" accept="application/pdf" onChange={handleFileChange} />
            <Button colorScheme="teal" onClick={handleUpload}>
              Upload PDF
            </Button>
          </HStack>
          

          {/* Selected Files */}
          {Object.keys(saving).length > 0 && (
            <Box>
              <Heading as="h3" size="sm" mb={2}>
                Uploaded PDFs
              </Heading>
              <List spacing={2}>
                {Object.keys(saving).map((key) => (
                  <ListItem
                    key={key}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    bg="gray.50"
                    p={2}
                    rounded="md"
                  >
                    <Text>{key}</Text>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeletePdf(key)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Actions */}
          <HStack justifyContent="space-between">
            <Button colorScheme="blue" onClick={handleReport}>
              Save Report
            </Button>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default PatientDetailsPage;
