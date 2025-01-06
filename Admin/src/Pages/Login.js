import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Text,
  Link,
  Image,
  useColorModeValue,
  useToast,
  Spinner,
  Fade,
  ScaleFade
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBgColor = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  const handleLogin = async () => {
    if (email.length === 0 || password.length === 0) {
      toast({
        title: "Fields should not be empty",
        status: "warning",
        duration: 1200,
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("https://medivault.onrender.com/admin/login", {
        adminuser: email, // assuming `adminuser` is used as the identifier in your backend
        password,
      });

      if (response.data.msg === "Login successful") {
        console.log(response.data)
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("ID",response.data.ID);
        toast({
          title: response.data.msg,
          status: "success",
          duration: 1000,
          position: "top",
          isClosable: true,
          onCloseComplete: () => {
            navigate("/dashboard"); 
          },
        });
      } else {
        toast({
          title: response.data.msg,
          status: "error",
          duration: 3000,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bgGradient="linear(to-r, teal.400, blue.500)">
      <ScaleFade initialScale={0.9} in={true}>
        <Box
          w={{ base: "90%", sm: "400px" }}
          p={8}
          bg={cardBgColor}
          boxShadow="xl"
          borderRadius="xl"
          border="2px solid"
          borderColor="teal.500"
          transition="all 0.3s ease"
          _hover={{ boxShadow: "2xl", transform: "scale(1.02)" }}
        >
          <Flex justify="center" mb={6}>
            <Image
              src="https://via.placeholder.com/150x50?text=Admin+Logo"
              alt="Logo"
              borderRadius="lg"
              boxShadow="md"
              mb={6}
            />
          </Flex>
          <Heading size="lg" textAlign="center" mb={4} color="teal.600" fontFamily="Poppins, sans-serif">
            Admin Login
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center" mb={6} fontWeight="semibold">
            Please enter your credentials to access the admin dashboard.
          </Text>

          <FormControl id="email" isRequired mb={4}>
            <FormLabel fontWeight="bold" color="teal.600">
              Email
            </FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="teal.500"
              borderRadius="lg"
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 10px rgba(0, 128, 128, 0.5)" }}
            />
          </FormControl>
          <FormControl id="password" isRequired mb={4}>
            <FormLabel fontWeight="bold" color="teal.600">
              Password
            </FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="teal.500"
              borderRadius="lg"
              _focus={{ borderColor: "teal.500", boxShadow: "0 0 10px rgba(0, 128, 128, 0.5)" }}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            w="full"
            mt={4}
            onClick={handleLogin}
            isLoading={isLoading}
            loadingText="Logging in..."
            borderRadius="md"
            _hover={{ bg: "teal.600", transform: "scale(1.05)" }}
            transition="all 0.3s ease"
          >
            Login
          </Button>

          <Flex justify="center" mt={4}>
            <Text fontSize="sm" mr={1}>
              Forgot your password?
            </Text>
            <Link color="teal.500" href="#">
              Reset it
            </Link>
          </Flex>
        </Box>
      </ScaleFade>
    </Flex>
  );
};

export default AdminLogin;
