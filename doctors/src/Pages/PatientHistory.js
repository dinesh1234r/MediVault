import React, { useState,useEffect } from 'react';
import { HStack,Flex,Box,Text,Card,CardHeader,CardBody,useToast,Spacer,Divider,Button,VStack,CardFooter,Textarea } from '@chakra-ui/react';
import axios from 'axios'

function PatientHistory() {
    const toast=useToast();
    const [history,SetHistory]=useState([{}]);
    const currentDate = new Date().toLocaleDateString();
    console.log(currentDate)
    const [notes,Setnotes]=useState("")
    useEffect(()=>{
        const fetchhistory=async()=>{
            try{
                const _id=JSON.parse(localStorage.getItem('patient'))._id;
                const response=await axios.post('http://localhost:5000/patient/history',{_id})
                if(response.data.msg==="History received")
                {
                    const result=response.data.result.reverse();
                    result.map((data)=>{
                        if(data.Date===currentDate)
                        {
                            Setnotes(data.notes);
                        }
                    })
                    console.log(result)
                    SetHistory(result)
                    
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
            }
            catch(err)
            {
                toast({
                    title:"Error in history",
                    status:"error",
                    duration:1200,
                    position:"top"
                })
            }
        }
        fetchhistory();
        
    
    },[])

    const savingnotes=async()=>{
        try{
            const _id=JSON.parse(localStorage.getItem('patient'))._id;
            const response=await axios.post('http://localhost:5000/patient/notesadded',{_id,notes})
            if(response.data.msg==="Notes added successfully")
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
        }
        catch(err)
        {
            toast({
                title:"Error in Adding notes",
                status:"error",
                duration:1200,
                position:"top"
            })
        }
    }
    
  return (
    <Box h={'100vh'}>
        <HStack ml={20} mr={20} mt={5}>
            <Text fontSize={20}>Name:</Text><Text fontSize={20}>{JSON.parse(localStorage.getItem("patient")).Name}</Text>
            <Spacer/>
            <Text fontSize={20}>Age:</Text><Text fontSize={20}>35</Text>
        </HStack>
        <Divider/>
        <Box overflowY={'scroll'}  >
            <Box w={'60%'} mx={'auto'} mt={4}>
            {history.map((data)=>(
                <>
                <Card>
                    <CardHeader><HStack><strong>Disease:</strong><Text>{data.disease}</Text><Spacer/><strong>Date:</strong><Text >{data.Date}</Text></HStack></CardHeader>
                    <Divider/>
                    <CardBody>
                        <HStack><strong>Textarea</strong>
                        {currentDate===data.Date?(<>
                            <Textarea value={notes} onChange={(e)=>Setnotes(e.target.value)}/>
                            <Spacer/><Button onClick={()=>savingnotes()}>save</Button></>):(<Textarea value={data.notes} isDisabled/>)}
                            <VStack>
                                <Button>Report</Button>
                                <Button>Precription</Button>
                            </VStack>
                        </HStack>
                    </CardBody>
                    
                </Card>
                <Spacer h={4}/>
                </>
            ))}
            </Box>
        </Box>
    </Box>
  )
}

export default PatientHistory