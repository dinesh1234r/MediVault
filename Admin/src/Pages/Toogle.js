import React from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    Text,
    VStack,
    useToast,
    HStack,
    useColorMode,
    useColorModeValue,
    Switch,
    Spinner
  } from '@chakra-ui/react';

function Toogle() {
    const {toggleColorMode} =useColorMode();
  return (
        <Switch onChange={toggleColorMode} size={'md'} ml={'5%'} mb={'5%'} width={'100%'}>
          Toggle {useColorModeValue('Light','Dark')} Mode
        </Switch>
  )
}

export default Toogle