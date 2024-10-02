import React from 'react'
import SideBar from './Sidebar';
import Patients from './Patient';
import { HStack,Flex,Box,Image } from '@chakra-ui/react';

function Home() {
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