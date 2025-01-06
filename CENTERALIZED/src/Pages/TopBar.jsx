import React from "react";
import { Box, Flex, Heading, Button, Spacer, HStack, Link,Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate=useNavigate();
  return (
    <Box
      as="header"
      w="100%"
      bg="teal.600"
      color="white"
      px={6}
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="md"
    >
      <Flex align="center">
        {/* Left Side: Navigation */}
        <HStack spacing={6}>
          <Heading as="h1" size="md" letterSpacing="wide">
            Hospital Management
          </Heading>
          <Text fontSize="lg" _hover={{ textDecoration: "underline" }} onClick={()=>navigate('/dashboard')}>
            Dashboard
          </Text>
          <Text fontSize="lg" _hover={{ textDecoration: "underline" }} onClick={()=>navigate('/add-hospital')}>
            Add Hospital
          </Text>
        </HStack>

        {/* Spacer pushes the Logout button to the right */}
        <Spacer />

        {/* Right Side: Logout Button */}
        <Button colorScheme="red" variant="outline" size="sm">
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default TopBar;
