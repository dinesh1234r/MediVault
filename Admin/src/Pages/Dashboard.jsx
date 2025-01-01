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
import Sidebar from './Sidebar'

// const Sidebar = () => {
//   return (
//     <Box
//       w={{ base: "full", md: "250px" }}
//       bg={useBreakpointValue({ base: "teal.500", md: "teal.700" })}
//       color="white"
//       h="full"
//       p={4}
//       display={{ base: "none", md: "block" }}
//       position="fixed"
//     >
//       <VStack align="start" spacing={6}>
//         <Link to="/">
//           <HStack>
//             <FiHome />
//             <Text>Dashboard</Text>
//           </HStack>
//         </Link>

//         {/* Manage Sections */}
//         <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
//           Manage
//         </Heading>
//         <Link to="/doctors">
//           <HStack>
//             <FiUsers />
//             <Text>Doctors</Text>
//           </HStack>
//         </Link>
//         <Link to="/nurses">
//           <HStack>
//             <FiBriefcase />
//             <Text>Nurses</Text>
//           </HStack>
//         </Link>
//         <Link to="/scancenter">
//           <HStack>
//             <FiClipboard />
//             <Text>Scan Centers</Text>
//           </HStack>
//         </Link>

//         {/* Create Sections */}
//         <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
//           Create
//         </Heading>
//         <Link to="/create-doctor">
//           <HStack>
//             <FiUserPlus />
//             <Text>Create Doctor</Text>
//           </HStack>
//         </Link>
//         <Link to="/create-nurse">
//           <HStack>
//             <FiUserPlus />
//             <Text>Create Nurse</Text>
//           </HStack>
//         </Link>
//         <Link to="/create-scancenter">
//           <HStack>
//             <FiUserPlus />
//             <Text>Create Scan Center</Text>
//           </HStack>
//         </Link>

//         {/* Settings */}
//         <Heading as="h3" size="sm" mt={4} mb={2} textTransform="uppercase">
//           Settings
//         </Heading>
//         <Link to="/settings">
//           <HStack>
//             <FiSettings />
//             <Text>Settings</Text>
//           </HStack>
//         </Link>
//       </VStack>
//     </Box>
//   );
// };

const AdminDashboard = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const navigate = useNavigate();

  // Example Data for Counts
  const doctorCount = 25; // Example count for doctors
  const nurseCount = 40; // Example count for nurses
  const scanCenterCount = 15; // Example count for scan centers

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
                <Heading size="xl">{doctorCount}</Heading>
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
                <Heading size="xl">{nurseCount}</Heading>
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
                <Heading size="xl">{scanCenterCount}</Heading>
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
