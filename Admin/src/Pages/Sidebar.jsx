import React from "react";
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

const Sidebar = () => {
  return (
    <Box
      w={{ base: "full", md: "250px" }}
      bg={useBreakpointValue({ base: "teal.500", md: "teal.700" })}
      color="white"
      h="full"
      p={4}
      display={{ base: "none", md: "block" }}
      position="fixed"
    >
      <VStack align="start" spacing={6}>
        <Link to="/dashboard">
          <HStack>
            <FiHome />
            <Text>Dashboard</Text>
          </HStack>
        </Link>

        {/* Manage Sections */}
        <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
          Manage
        </Heading>
        <Link to="/doctors">
          <HStack>
            <FiUsers />
            <Text>Doctors</Text>
          </HStack>
        </Link>
        <Link to="/nurses">
          <HStack>
            <FiBriefcase />
            <Text>Nurses</Text>
          </HStack>
        </Link>
        <Link to="/scancenter">
          <HStack>
            <FiClipboard />
            <Text>Scan Centers</Text>
          </HStack>
        </Link>

        {/* Create Sections */}
        <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
          Create
        </Heading>
        <Link to="/create-doctor">
          <HStack>
            <FiUserPlus />
            <Text>Create Doctor</Text>
          </HStack>
        </Link>
        <Link to="/create-nurse">
          <HStack>
            <FiUserPlus />
            <Text>Create Nurse</Text>
          </HStack>
        </Link>
        <Link to="/create-scancenter">
          <HStack>
            <FiUserPlus />
            <Text>Create Scan Center</Text>
          </HStack>
        </Link>

        {/* Settings */}
        <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
          Settings
        </Heading>
        <Link to="/settings">
          <HStack>
            <FiSettings />
            <Text>Settings</Text>
          </HStack>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;