import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  VStack,
  HStack,
  Button,
  Avatar,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
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
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import Sidebar from './Sidebar'
import axios from "axios";

const AdminDashboard = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const navigate = useNavigate();

  const [values,Setvalues]=useState({});

  useEffect(()=>{
    const fetchcount=async()=>{
      try{
        const id=localStorage.getItem('ID')
        const response=await axios.post("https://medivault.onrender.com/admin/getcount",{id});
        if(response.data.msg==="Count received")
        {
          const doctors=response.data.Doctors;
          const nurses=response.data.Nurses;
          const scancenters=response.data.Scancenters;
          Setvalues({doctors,nurses,scancenters})
        }
      }
      catch(err)
      {
        alert("Error...")
      }
    }
    fetchcount();
  },[])

  return (
    <Box minH="100vh" bg={bg} display="flex" direction="column">
      <Sidebar />

      <Flex
        direction="column"
        flex="1"
        ml={{ base: 0, md: "250px" }}
        p={4}
        bg={bg}
        h="full"
      >
        {/* Top Navigation Bar */}
        <Flex justify="space-between" align="center" mb={6}>
          <HStack spacing={4}>
            <IconButton
              display={{ base: "inline-flex", md: "none" }}
              aria-label="Open Sidebar"
              icon={<FiMenu />}
              onClick={onToggle}
              variant="outline"
              color="teal.500"
            />
            
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

        {/* Dashboard Content - Summary Section */}
        <Flex
          align="center"
          justify="center"
          direction="column"
          textAlign="center"
          flex="1"
        >
          <Heading size="lg" mb={6}>
            Welcome to the Admin Dashboard
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full" px={4}>
            {/* Doctors Card */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                bg="teal.500"
                color="white"
                p={10}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
              >
                <Heading size="xl">{values.doctors}</Heading>
                <Text mt={2} fontSize="lg">
                  Total Doctors
                </Text>
              </Box>
            </motion.div>

            {/* Nurses Card */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                bg="blue.500"
                color="white"
                p={10}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
              >
                <Heading size="xl">{values.nurses}</Heading>
                <Text mt={2} fontSize="lg">
                  Total Nurses
                </Text>
              </Box>
            </motion.div>

            {/* Scan Centers Card */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                bg="purple.500"
                color="white"
                p={10}
                borderRadius="lg"
                textAlign="center"
                boxShadow="lg"
              >
                <Heading size="xl">{values.scancenters}</Heading>
                <Text mt={2} fontSize="lg">
                  Total Scan Centers
                </Text>
              </Box>
            </motion.div>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;
