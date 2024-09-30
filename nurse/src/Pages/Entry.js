import React, { useState } from 'react'
import SideBar from './SideBar'
import { HStack,Flex,Box,Text,useToast, Spacer, VStack, Divider,Stack,StackDivider, Button, Input } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter,Heading,Image } from '@chakra-ui/react'
import axios from 'axios';


function Entry() {
  const toast=useToast()
  const [disease,Setdisease]=useState("");
  const [key,Setkey]=useState("");
  const [value,Setvalue]=useState("");
  const [vitals,Setvitals]=useState({});
  const saving=()=>{
    Setvitals((prev)=>({...prev,[key]:value}))
    Setkey("")
    Setvalue("")
  }

  const todelete=(key1)=>{
    const newVitals = { ...vitals };
    delete newVitals[key1]; 
    Setvitals(newVitals)
  }
  
  const handledata=async()=>{
    try{
        const _id=JSON.parse(localStorage.getItem('patient'))._id
        const response=await axios.post('http://localhost:5000/patient/entrypatient',{_id,disease,vitals})
        if(response.data.msg==="Datas added successfully")
        {
          toast({
            title:response.data.msg,
            status:"success",
            duration:1200,
            position:"top"
          })
        }
        else
        {
          toast({
            title:response.data.msg,
            status:"error",
            duration:1200,
            position:"top"
          })
        }
        Setdisease("")
    }
    catch(err){
      toast({
        title:err,
        status:"error",
        duration:1200,
        position:"top"
      })
    }
  }
  
  return (
    <HStack w={'100%'} >
        <Box w={'20%'} justifyContent={'center'}>
            <SideBar />
        </Box>
        <Box w={'80%'} h={'100vh'}>
            <HStack ml={20} mr={20} mt={5}>
                <Text fontSize={20}>Name:</Text><Text fontSize={20}>{JSON.parse(localStorage.getItem("patient")).Name}</Text>
                <Spacer/>
                <Text fontSize={20}>Age:</Text><Text fontSize={20}>35</Text>
            </HStack>
            <Divider color={'gray'}/>
            <Spacer h={5}/>
            <HStack w={'80%'} mx={'auto'}>
              <Card w={'60%'}>
                <CardHeader>Entry For Patient's</CardHeader>
                <Divider color={'gray'}/>
                <CardBody>
                  <HStack><Text w={'35%'}>Enter the Disease:</Text><Input placeholder='Enter the Disease' value={disease} onChange={(e)=>Setdisease(e.target.value)}/></HStack>
                  <Spacer h={5}/>
                  <Text>Enter the vitals:</Text>
                  <Spacer h={5}/>
                  <HStack>
                    <Input name='key' value={key} placeholder='Enter vitals name' onChange={(e)=>Setkey(e.target.value)}/>
                    <Input name='value' value={value} placeholder='Enter the value' onChange={(e)=>Setvalue(e.target.value)}/>
                  </HStack>
                  <Spacer h={5}/>
                  <Button onClick={()=>saving()}>Save</Button>
                </CardBody>
              </Card>
              <Spacer/>
              <Image src={JSON.parse(localStorage.getItem('patient')).Photo} alt='No Records' boxSize={'20%'}/>
            </HStack>
            <Spacer h={5}/>
            <HStack>
            <Card w={'48%'} ml={'10%'}>
              <CardHeader>Entered vitals</CardHeader>
              <Divider color={'gray'}/>
              <CardBody>
                <Box overflowY={'scroll'} h={'20vh'}>
                  {Object.keys(vitals).length === 0?(<Box >No vitals Added</Box>):Object.entries(vitals).map(([key1,value1])=>(
                    <Card >
                      <CardBody>
                        <HStack>
                          <Box>{key1}</Box>
                          <Box>{value1}</Box>
                          <Spacer/>
                          <Button onClick={()=>{todelete(key1)}}>Delete</Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  ))}
                  </Box>
              </CardBody>
            </Card>
            <Spacer/>
            <Button mr={'10%'} onClick={()=>handledata()}>Click to enalble entry</Button>
            </HStack>
        </Box>
        
    </HStack>
  )
}

export default Entry