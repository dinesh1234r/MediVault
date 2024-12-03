import React,{useRef} from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,Button,
  HStack,useColorModeValue,Stack,
  Image,Flex, Link,FormControl,
  FormLabel,
  Input,
  Textarea,
  Spacer,
} from "@chakra-ui/react";
import { FaHospital, FaUserNurse, FaUserMd, FaFileAlt } from "react-icons/fa";
import { MdAdminPanelSettings, MdPerson, MdLocalHospital, MdAssignment } from 'react-icons/md';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'; 

const Intro = () => {
    const overviewRef = useRef(null);
    const contactRef = useRef(null);
    const techRef = useRef(null);
    const loginRef = useRef(null);
  
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

  return (
    <Box w={'100%'}>
         <Box
      position="sticky"
      top="0"
      zIndex="1000"
      bg={useColorModeValue('teal.500', 'teal.700')}
      p={4}
      boxShadow="md"
      w={'100%'}
    >
      <Flex justify="center" gap={10}>
        <Spacer/>
        <Link
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline', color: 'teal.200' }} 
          onClick={() => scrollToSection(overviewRef)}
        >
          Overview
        </Link>
        <Link
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline', color: 'teal.200' }}
          onClick={() => scrollToSection(techRef)}
        >
          Tech Used
        </Link>
        <Link
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline', color: 'teal.200' }}
          onClick={() => scrollToSection(loginRef)}
        >
          Login Account
        </Link>
        <Link
          color="white"
          fontWeight="semibold"
          _hover={{ textDecoration: 'underline', color: 'teal.200' }} 
          onClick={() => scrollToSection(contactRef)}
        >
          Contact
        </Link>
      </Flex>
    </Box>
      <Box  
          ref={overviewRef}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
          
          >
        
      <Heading mb={6} textAlign="center">
        Digital Patient Record Management System
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={10} mb={10}>

        
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
            <Icon as={FaHospital} w={10} h={10} color="teal.500" />
            <Heading size="md">Multiple Hospitals</Heading>
            <Text>
              Secure access across multiple hospitals, ensuring patient data
              management in private and government facilities.
            </Text>
          </VStack>
        </Box>

        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
            <Icon as={FaUserNurse} w={10} h={10} color="teal.500" />
            <Heading size="md">Nurse Role</Heading>
            <Text>
              Nurses create patient IDs and manage vitals entry, ensuring accurate data tracking.
            </Text>
          </VStack>
        </Box>

        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
            <Icon as={FaUserMd} w={10} h={10} color="teal.500" />
            <Heading size="md">Doctor Role</Heading>
            <Text>
              Doctors access patient records, prescribe medicines, and manage treatment history.
            </Text>
          </VStack>
        </Box>

        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
            <Icon as={FaFileAlt} w={10} h={10} color="teal.500" />
            <Heading size="md">Scan Center</Heading>
            <Text>
              Scan centers upload patient reports, securely handling all imaging and reports.
            </Text>
          </VStack>
        </Box>

        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
          <Image
              src="https://1.bp.blogspot.com/-Ckn1SCIrp1o/YBaxJGUZ53I/AAAAAAAABcY/E_i9t7zt1S4f8tVuSN73yPnp6gweKNWYACLcBGAsYHQ/s886/Firebase%2B%255Bbagilogo.com%255D.png"
              alt="Cloud Storage"
              boxSize="60px"
              objectFit="cover"
            />
            <Heading size="md">Secure Storage</Heading>
            <Text>
              Utilized Cloudinary and Firebase for secure and efficient storage
              of patient data and images.
            </Text>
          </VStack>
        </Box>
        <Box
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="lg"
          textAlign="center"
        >
          <VStack>
            <Image
              src="https://freeappsforme.com/wp-content/uploads/2019/08/3xLOGIC-Facial-Recognition-logo-1024x1024.jpg"
              alt="Facial Recognition"
              boxSize="60px"
              objectFit="cover"
            />
            <Heading size="md">Facial Recognition</Heading>
            <Text>
              Implemented facial recognition for secure access to patient
              records, enhancing privacy and security.
            </Text>
          </VStack>
        </Box>
        
      </SimpleGrid>
      </Box>
      <Box ref={techRef} p={10} bg="gray.50" minH="100vh">
        <Text fontSize="3xl" fontWeight="bold">Tech Used</Text>
        <Text mt={4}>
            The Tech Used section highlights the various technologies implemented in the development of this project, showcasing a blend of modern frameworks and tools to create a robust digital patient record management system.
        </Text>
        <Text mt={4}>
            <strong>Frontend Development:</strong> On the frontend, we utilized <strong>React</strong>, a powerful JavaScript library known for its ability to create dynamic and responsive user interfaces. React's component-based architecture allows for efficient code reuse and organization, making it an ideal choice for building complex applications. To enhance the user experience further, we integrated <strong>Chakra UI</strong>, a modern component library that provides a set of accessible, reusable, and customizable UI components. With Chakra UI, we ensured that our application is not only visually appealing but also responsive across various devices and screen sizes, facilitating a seamless experience for users interacting with the system.
        </Text>
        <Text mt={4}>
            <strong>Backend Development:</strong> The backend is powered by <strong>Node.js</strong> and <strong>Express.js</strong>, which form a robust foundation for handling API requests efficiently. Node.js allows for building scalable network applications, leveraging an event-driven architecture that handles multiple connections simultaneously. Express.js, a minimal and flexible Node.js web application framework, simplifies the process of building RESTful APIs, providing essential features for web and mobile applications. This combination enables our system to process user requests quickly and reliably, ensuring smooth interactions with the database.
        </Text>
        <Text mt={4}>
            <strong>Database Management:</strong> For data storage, we chose <strong>MongoDB</strong>, a NoSQL database known for its flexibility and scalability. MongoDB's document-based structure allows for the easy storage and retrieval of complex patient records without rigid schemas. This is particularly beneficial in a healthcare environment where patient data can vary significantly. By using MongoDB, we can efficiently manage and query large volumes of data, ensuring quick access to essential information for healthcare professionals.
        </Text>
        <Text mt={4}>
            <strong>Authentication and Security:</strong> The authentication process employs <strong>facial recognition technology</strong>, a cutting-edge solution that guarantees secure access to the system. This innovative approach enhances patient data protection by ensuring that only authorized personnel can access sensitive information. By leveraging machine learning algorithms, the facial recognition system can accurately verify user identities, reducing the risk of unauthorized access and ensuring compliance with healthcare regulations.
        </Text>
        <Text mt={4}>
            <strong>Image and Report Handling:</strong> To manage images and medical reports, we utilized <strong>Cloudinary</strong> and <strong>Firebase Storage</strong>. Cloudinary is a powerful cloud-based image and video management service that allows for efficient image storage, optimization, and delivery. It supports various image formats and provides features like automatic image resizing and transformation. Firebase Storage, part of the Firebase suite, offers robust and secure file storage solutions, making it easy to store and serve large files. By integrating these technologies, we ensure that our system can handle the storage and retrieval of images and reports reliably and at scale, meeting the demands of a modern healthcare environment.
        </Text>
        </Box>
        <Box
      p={10}
      bg={useColorModeValue('gray.100', 'gray.800')}
      minH="100vh"
      ref={loginRef}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgImg={"https://media.consumeraffairs.com/files/news/Hospital_building_JazzIRT_GI.jpg"}
    >
      <VStack spacing={6} width="full" maxWidth="600px"> 
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          Login Account
        </Text>
        <Text textAlign="center" maxW="lg" color={'white'}>
          The Login Account section details the secure login system integrated into the application. 
          Utilizing advanced facial recognition technology, the system ensures that only authorized hospital personnel can access sensitive patient information.
        </Text>
        <Stack spacing={4} width="full"> 
          <Box
            onClick={() => handleCardClick('https://finalyear-phase-1-admin.onrender.com')}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg={useColorModeValue('white', 'gray.700')}
            p={5}
            textAlign="center"
            cursor="pointer"
            transition="0.3s"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }} 
          >
            <HStack spacing={4}> 
              <Icon as={MdAdminPanelSettings} boxSize={8} color="teal.500" />
              <Text fontSize="xl" fontWeight="semibold">Hospital Admin</Text>
            </HStack>
          </Box>

          <Box
            onClick={() => handleCardClick('https://finalyear-phase-1-doctors.onrender.com')}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg={useColorModeValue('white', 'gray.700')}
            p={5}
            textAlign="center"
            cursor="pointer"
            transition="0.3s"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
          >
            <HStack spacing={4}>
              <Icon as={MdPerson} boxSize={8} color="teal.500" />
              <Text fontSize="xl" fontWeight="semibold">Doctors</Text>
            </HStack>
          </Box>

          <Box
            onClick={() => handleCardClick('https://finalyear-phase-1-nurse.onrender.com')}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg={useColorModeValue('white', 'gray.700')}
            p={5}
            textAlign="center"
            cursor="pointer"
            transition="0.3s"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }}
          >
            <HStack spacing={4}>
              <Icon as={MdLocalHospital} boxSize={8} color="teal.500" />
              <Text fontSize="xl" fontWeight="semibold">Nurses</Text>
            </HStack>
          </Box>

          <Box
            onClick={() => handleCardClick('https://finalyear-phase-1-scancenter.onrender.com')}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg={useColorModeValue('white', 'gray.700')}
            p={5}
            textAlign="center"
            cursor="pointer"
            transition="0.3s"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)' }} 
          >
            <HStack spacing={4}>
              <Icon as={MdAssignment} boxSize={8} color="teal.500" />
              <Text fontSize="xl" fontWeight="semibold">Scan Center</Text>
            </HStack>
          </Box>
        </Stack>
      </VStack>
    </Box>
    <Box
      p={8}
      bg={useColorModeValue('white', 'gray.700')}
      ref={contactRef}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      maxWidth="500px"
      mb={'10%'}
      mx="auto" 
      mt={10} 
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Contact Us
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Your Name" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your Email" />
          </FormControl>
          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Your Message" />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            mt={4} 
          >
            Send Message
          </Button>
        </VStack>
      </form>
    </Box>
    <Box
      as="footer"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={useColorModeValue('gray.100', 'gray.800')}
      p={4}
      boxShadow="md"
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxWidth="1200px" mx="auto">
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
          © {new Date().getFullYear()} MediVault. All rights reserved.
        </Text>
        <Flex>
          <Link href="/privacy-policy" mx={2} fontSize="sm" color={useColorModeValue('blue.500', 'blue.300')}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" mx={2} fontSize="sm" color={useColorModeValue('blue.500', 'blue.300')}>
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
    </Box>
  );
};

export default Intro;
