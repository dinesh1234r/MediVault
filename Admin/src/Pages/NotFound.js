import React from 'react';
import { Box, Heading, Text, Button, VStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

function NotFound() {
    const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); 
  };

  return (
    <Box textAlign="center" py={10} px={6}>
      <Image 
        src="https://img.freepik.com/premium-vector/editable-sticker-robot-error_203633-9543.jpg" 
        alt="404 image" 
        boxSize="150px" 
        mx="auto" 
        mb={4} 
      />
      <Heading as="h1" size="2xl" mb={4}>
        404
      </Heading>
      <Text fontSize="lg" mb={6}>
        Oops! The page you are looking for does not exist.
      </Text>
      <VStack spacing={4}>
        <Button colorScheme="teal" onClick={handleBackHome}>
          Go to Home
        </Button>
        <Button colorScheme="gray" onClick={() =>{
            if(localStorage.getItem('Jwt'))
            {
                navigate('/home')
            }
            else
            {
                navigate('/')
            }
        }}>
          Go Back
        </Button>
      </VStack>
    </Box>
  )
}

export default NotFound