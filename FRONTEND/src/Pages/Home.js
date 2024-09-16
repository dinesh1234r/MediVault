import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel,Switch,Divider, Button ,Box,Grid, GridItem, HStack, Container} from '@chakra-ui/react'
import AddDoctors from './AddDoctors'
import GetAllDoctor from './GetAllDoctor'
import { useNavigate } from 'react-router-dom'
import Toogle from './Toogle'
import AddNurse from './AddNurse'
import GetAllNurse from './GetAllNurse'

function Home() {
  const [isLoading,SetisLoading]=useState(false);
  const navigate=useNavigate();
  let check=false;
  const jwt=localStorage.getItem('jwt');
  useEffect(()=>{
    if(jwt===null||jwt==undefined)
      {
        navigate('/');
      }
  },[])

  const clearhistory=()=>{
    SetisLoading(true);
    setTimeout(()=>{
      localStorage.clear();
      navigate('/');
      SetisLoading(false);
    },2000)
    
  }
  
  return (
    <Box>
      <Box maxW="100%" >
        <HStack flexDirection="row-reverse" spacing={10} p={3} >
        <Button colorScheme='red' onClick={clearhistory} isLoading={isLoading} loadingText="Logging out">Logout</Button>
        <div><Toogle check={check}/></div>
        </HStack>
      </Box>
      <Divider orientation='horizontal' />
    <Tabs variant='soft-rounded' colorScheme='green' p={2}>  
      <TabList>
        <Tab>Get all Doctors list</Tab>
        <Tab>Add more Doctor</Tab>
        <Tab>Add more Nurse</Tab>
        <Tab>Get all Nurse list</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <GetAllDoctor/>
          </TabPanel>
        <TabPanel><AddDoctors/></TabPanel>
        <TabPanel><AddNurse/></TabPanel>
        <TabPanel><GetAllNurse/></TabPanel>
      </TabPanels>
    </Tabs>
    </Box>
  )
}

export default Home