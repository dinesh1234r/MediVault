import React, { useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  Button,
  HStack,
  useColorModeValue,
  Stack,
  Image,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Spacer,
  Fade,
  ScaleFade,
  SlideFade,
  useDisclosure,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { FaHospital, FaUserNurse, FaUserMd, FaFileAlt } from "react-icons/fa";
import { MdAdminPanelSettings, MdPerson, MdLocalHospital, MdAssignment } from 'react-icons/md';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const Intro = () => {
  const overviewRef = useRef(null);
  const contactRef = useRef(null);
  const techRef = useRef(null);
  const loginRef = useRef(null);
  
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isOpen: isFormOpen, onToggle: onFormToggle } = useDisclosure();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted!');
  };

  // Animation styles
  const floatAnimation = prefersReducedMotion 
    ? undefined 
    : {
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      };

  const pulseAnimation = prefersReducedMotion 
    ? undefined 
    : {
        scale: [1, 1.05, 1],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      };

  return (
    <Box w={'100%'} overflowX="hidden">
      {/* Animated Navbar */}
      <MotionBox
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        position="sticky"
        top="0"
        zIndex="1000"
        bgGradient="linear(to-r, teal.500, blue.500)"
        p={4}
        boxShadow="lg"
        w={'100%'}
      >
        <Flex justify="center" gap={10}>
          <Spacer/>
          <Link
            color="white"
            fontWeight="semibold"
            _hover={{ 
              textDecoration: 'none',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => scrollToSection(overviewRef)}
          >
            Overview
          </Link>
          <Link
            color="white"
            fontWeight="semibold"
            _hover={{ 
              textDecoration: 'none',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => scrollToSection(techRef)}
          >
            Tech Used
          </Link>
          <Link
            color="white"
            fontWeight="semibold"
            _hover={{ 
              textDecoration: 'none',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => scrollToSection(loginRef)}
          >
            Login Account
          </Link>
          <Link
            color="white"
            fontWeight="semibold"
            _hover={{ 
              textDecoration: 'none',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </Link>
        </Flex>
      </MotionBox>

      {/* Hero Section */}
      <Box 
        ref={overviewRef}
        p={10}
        bgGradient="linear(to-b, teal.50, blue.50)"
        position="relative"
        overflow="hidden"
      >
        <MotionBox 
          position="absolute"
          top="-50px"
          right="-50px"
          w="200px"
          h="200px"
          borderRadius="50%"
          bg="teal.100"
          opacity="0.3"
          animate={floatAnimation}
        />
        <MotionBox 
          position="absolute"
          bottom="-30px"
          left="-30px"
          w="150px"
          h="150px"
          borderRadius="50%"
          bg="blue.100"
          opacity="0.3"
          animate={{
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          spacing={6}
          textAlign="center"
        >
          <MotionHeading 
            size="2xl" 
            bgGradient="linear(to-r, teal.500, blue.600)"
            bgClip="text"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Digital Patient Record Management System
          </MotionHeading>
          <MotionText
            fontSize="xl"
            maxW="2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Revolutionizing healthcare with secure, efficient, and accessible patient record management
          </MotionText>
        </MotionVStack>

        {/* Features Grid */}
        <SimpleGrid columns={[1, 2, 3]} spacing={10} mt={16} mb={10}>
          {[
            {
              icon: FaHospital,
              title: "Multiple Hospitals",
              description: "Secure access across multiple hospitals, ensuring patient data management in private and government facilities."
            },
            {
              icon: MdAdminPanelSettings,
              title: "Admin Portal",
              description: "Comprehensive administrative controls for managing hospitals, users, and system configurations."
            },
            {
              icon: FaUserNurse,
              title: "Nurse Role",
              description: "Nurses create patient IDs and manage vitals entry, ensuring accurate data tracking."
            },
            {
              icon: FaUserMd,
              title: "Doctor Role",
              description: "Doctors access patient records, prescribe medicines, and manage treatment history."
            },
            {
              icon: FaFileAlt,
              title: "Scan Center",
              description: "Scan centers upload patient reports, securely handling all imaging and reports."
            },
            {
              icon: FaUser,
              title: "Patient Portal",
              description: "Patients can access their medical records, test results, and communicate with healthcare providers."
            },
            {
              icon: FaRobot,
              title: "AI Summarization",
              description: "Advanced AI analyzes patient history to generate concise summaries for doctors, saving valuable time."
            },
            {
              image: "https://1.bp.blogspot.com/-Ckn1SCIrp1o/YBaxJGUZ53I/AAAAAAAABcY/E_i9t7zt1S4f8tVuSN73yPnp6gweKNWYACLcBGAsYHQ/s886/Firebase%2B%255Bbagilogo.com%255D.png",
              title: "Secure Storage",
              description: "Utilized Cloudinary and Firebase for secure and efficient storage of patient data and images."
            },
            {
              image: "https://freeappsforme.com/wp-content/uploads/2019/08/3xLOGIC-Facial-Recognition-logo-1024x1024.jpg",
              title: "Facial Recognition",
              description: "Implemented facial recognition for secure access to patient records, enhancing privacy and security."
            },
            
           
          ].map((item, index) => (
            <ScaleFade 
              initialScale={0.9} 
              in={true} 
              key={index}
              transition={{ delay: index * 0.1 }}
            >
              <MotionBox
                p={6}
                shadow="lg"
                borderWidth="1px"
                borderRadius="xl"
                textAlign="center"
                bg="white"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ duration: 0.3 }}
              >
                <VStack spacing={4}>
                  {item.icon ? (
                    <MotionBox
                      animate={pulseAnimation}
                    >
                      <Icon 
                        as={item.icon} 
                        w={12} 
                        h={12} 
                        color="teal.500" 
                      />
                    </MotionBox>
                  ) : (
                    <MotionBox
                      animate={pulseAnimation}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        boxSize="70px"
                        objectFit="contain"
                      />
                    </MotionBox>
                  )}
                  <Heading size="md">{item.title}</Heading>
                  <Text color="gray.600">{item.description}</Text>
                </VStack>
              </MotionBox>
            </ScaleFade>
          ))}
        </SimpleGrid>
      </Box>

      {/* Tech Used Section */}
      <Box 
        ref={techRef} 
        p={10} 
        bgGradient="linear(to-b, gray.50, gray.100)"
        position="relative"
        overflow="hidden"
      >
        <Box 
          position="absolute"
          top="10%"
          left="10%"
          w="100px"
          h="100px"
          borderRadius="50%"
          bg="teal.200"
          opacity="0.2"
          animation={floatAnimation}
        />
        <Box 
          position="absolute"
          bottom="10%"
          right="10%"
          w="150px"
          h="150px"
          borderRadius="50%"
          bg="blue.200"
          opacity="0.2"
          animation={`${floatAnimation} 4s ease-in-out infinite`}
        />
        
        <Container maxW="container.lg">
          <MotionHeading
            fontSize="4xl"
            fontWeight="bold"
            mb={10}
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Technology Stack
          </MotionHeading>
          
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <SlideFade in={true} offsetY="20px">
              <MotionBox
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{ scale: 1.02 }}
              >
                <VStack align="start" spacing={6}>
                  <Heading size="lg" color="teal.600">Frontend Development</Heading>
                  <Text>
                    Built with <strong>React</strong> and <strong>Chakra UI</strong>, our frontend delivers a responsive, 
                    accessible user experience with beautiful, consistent components that work across all devices.
                  </Text>
                  <HStack spacing={4}>
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png" 
                      alt="React" 
                      boxSize="50px" 
                      objectFit="contain"
                    />
                    <Image 
                      src="https://img.stackshare.io/service/12421/rzylUjaf_400x400.jpg" 
                      alt="Chakra UI" 
                      boxSize="50px" 
                      objectFit="contain"
                    />
                  </HStack>
                </VStack>
              </MotionBox>
            </SlideFade>

            <SlideFade in={true} offsetY="20px" delay={0.2}>
              <MotionBox
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{ scale: 1.02 }}
              >
                <VStack align="start" spacing={6}>
                  <Heading size="lg" color="blue.600">Backend Development</Heading>
                  <Text>
                    Powered by <strong>Node.js</strong> and <strong>Express.js</strong>, our backend provides 
                    a robust, scalable foundation for handling API requests efficiently and securely.
                  </Text>
                  <HStack spacing={4}>
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" 
                      alt="Node.js" 
                      boxSize="50px" 
                      objectFit="contain"
                    />
                    <Image 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" 
                      alt="Express.js" 
                      boxSize="50px" 
                      objectFit="contain"
                    />
                  </HStack>
                </VStack>
              </MotionBox>
            </SlideFade>

            <SlideFade in={true} offsetY="20px" delay={0.4}>
              <MotionBox
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{ scale: 1.02 }}
              >
                <VStack align="start" spacing={6}>
                  <Heading size="lg" color="purple.600">Database</Heading>
                  <Text>
                    <strong>MongoDB</strong> provides flexible, scalable data storage with its document-based 
                    architecture, perfect for managing complex patient records.
                  </Text>
                  <HStack spacing={4}>
                    <Image 
                      src="https://th.bing.com/th/id/OIP.Al8weKZSstHJRmzugzj01QHaF7?rs=1&pid=ImgDetMain" 
                      alt="MongoDB" 
                      boxSize="120px" 
                      objectFit="contain"
                    />
                  </HStack>
                </VStack>
              </MotionBox>
            </SlideFade>

            <SlideFade in={true} offsetY="20px" delay={0.6}>
              <MotionBox
                p={8}
                bg="white"
                borderRadius="xl"
                boxShadow="lg"
                whileHover={{ scale: 1.02 }}
              >
                <VStack align="start" spacing={6}>
                  <Heading size="lg" color="orange.500">Storage & Security</Heading>
                  <Text>
                    <strong>Cloudinary</strong> and <strong>Firebase Storage</strong> handle media files, 
                    while advanced <strong>facial recognition</strong> ensures secure authentication.
                  </Text>
                  <HStack spacing={4}>
                    <Image 
                      src="https://th.bing.com/th/id/OIP.bWgmv2jg_WjLuIMESDqFBQAAAA?rs=1&pid=ImgDetMain" 
                      alt="Cloudinary" 
                      boxSize="120px" 
                      objectFit="contain"
                    />
                    <Image 
                      src="https://th.bing.com/th/id/OIP.79mTav-hYqM-c0WrHDrQ2AAAAA?w=300&h=225&rs=1&pid=ImgDetMain" 
                      alt="Firebase" 
                      boxSize="120px" 
                      objectFit="contain"
                    />
                  </HStack>
                </VStack>
              </MotionBox>
            </SlideFade>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Login Accounts Section */}
      <Box
        ref={loginRef}
        p={10}
        bgGradient="linear(to-b, teal.500, blue.600)"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Box 
          position="absolute"
          top="20%"
          right="10%"
          w="100px"
          h="100px"
          borderRadius="50%"
          bg="white"
          opacity="0.1"
          animation={floatAnimation}
        />
        <Box 
          position="absolute"
          bottom="20%"
          left="10%"
          w="150px"
          h="150px"
          borderRadius="50%"
          bg="white"
          opacity="0.1"
          animation={`${floatAnimation} 4s ease-in-out infinite`}
        />
        
        <Container maxW="container.md">
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionHeading
              fontSize="4xl"
              textAlign="center"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Access the System
            </MotionHeading>
            <MotionText
              textAlign="center"
              maxW="lg"
              fontSize="lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Click on any role below to access the respective login portal
            </MotionText>

            <SimpleGrid columns={[1, 2]} spacing={6} w="full">
              {[
                {
                  icon: MdDashboard, // You'll need to import MdDashboard from 'react-icons/md'
                  title: "Centralized Portal",
                  url: 'https://medivault-hospitalmanagement.onrender.com',
                  color: 'pink.200'
                },
                {
                  icon: MdAdminPanelSettings,
                  title: "Hospital Admin",
                  url: 'https://medivault-admin.onrender.com',
                  color: 'teal.200'
                },
                {
                  icon: MdPerson,
                  title: "Doctors",
                  url: 'https://medivault-doctor.onrender.com',
                  color: 'blue.200'
                },
                {
                  icon: MdLocalHospital,
                  title: "Nurses",
                  url: 'https://medivault-nurse.onrender.com',
                  color: 'green.200'
                },
                {
                  icon: MdAssignment,
                  title: "Scan Center",
                  url: 'https://medivault-scancenter.onrender.com',
                  color: 'purple.200'
                },
                {
                  icon: FaUser, // You'll need to import FaUser from 'react-icons/fa'
                  title: "Patient Portal",
                  url: 'https://medivault-patient.onrender.com',
                  color: 'orange.200'
                }
              ].map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  <MotionBox
                    p={6}
                    borderRadius="xl"
                    bg="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(10px)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.2)"
                    cursor="pointer"
                    whileHover={{ 
                      y: -5,
                      backgroundColor: "rgba(255, 255, 255, 0.2)"
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleCardClick(item.url)}
                  >
                    <HStack spacing={4}>
                      <Icon 
                        as={item.icon} 
                        boxSize={8} 
                        color={item.color} 
                      />
                      <Text fontSize="xl" fontWeight="semibold">{item.title}</Text>
                    </HStack>
                  </MotionBox>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionVStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        p={10}
        bg="white"
        ref={contactRef}
      >
        <Container maxW="container.md">
          <MotionVStack
            spacing={8}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <MotionHeading
              fontSize="4xl"
              textAlign="center"
              bgGradient="linear(to-r, teal.500, blue.600)"
              bgClip="text"
            >
              Contact Us
            </MotionHeading>
            
            <MotionBox
              w="full"
              p={8}
              borderRadius="xl"
              boxShadow="xl"
              bg="gray.50"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input 
                      type="text" 
                      placeholder="Your Name" 
                      focusBorderColor="teal.500"
                      size="lg"
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      focusBorderColor="teal.500"
                      size="lg"
                    />
                  </FormControl>
                  <FormControl id="message" isRequired>
                    <FormLabel>Message</FormLabel>
                    <Textarea 
                      placeholder="Your Message" 
                      focusBorderColor="teal.500"
                      size="lg"
                      rows={6}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    w="full"
                    mt={4}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Send Message
                  </Button>
                </VStack>
              </form>
            </MotionBox>
          </MotionVStack>
        </Container>
      </Box>

      {/* Footer */}
      <MotionBox
        as="footer"
        bg={useColorModeValue('gray.100', 'gray.800')}
        p={4}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" wrap="wrap">
            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
              © {new Date().getFullYear()} MediVault. All rights reserved.
            </Text>
            <Flex>
              <Link 
                href="/privacy-policy" 
                mx={2} 
                fontSize="sm" 
                color={useColorModeValue('blue.500', 'blue.300')}
                _hover={{ textDecoration: 'underline' }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                mx={2} 
                fontSize="sm" 
                color={useColorModeValue('blue.500', 'blue.300')}
                _hover={{ textDecoration: 'underline' }}
              >
                Terms of Service
              </Link>
            </Flex>
          </Flex>
        </Container>
      </MotionBox>
    </Box>
  );
};

export default Intro;