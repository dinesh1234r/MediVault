import React from 'react'
import SideBar from './Sidebar';
import Patients from './Patient';
import { HStack,Flex,Box,Image } from '@chakra-ui/react';

function Home() {
  if(!localStorage.getItem('Jwt'))
    {
        return (
          <Box textAlign="center" mt="20">
            <Text fontSize="xl" color="red.500" fontWeight="bold">
              You are not authorized to access this page.
            </Text>
            <Button mt={4} onClick={() => navigate('/')}>
              Go to Login
            </Button>
          </Box>
        )
    }
  return (
    <HStack w={'100%'} >
        <Box w={'20%'} justifyContent={'center'}>
            <SideBar />
        </Box>
        <Box w={'80%'} >
            <Patients/>
        </Box>
        
    </HStack>
  )
}

export default Home