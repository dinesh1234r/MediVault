import React, { useState,useEffect } from 'react';
import { HStack,Flex,Box,Text,Card,CardHeader,CardBody,Image,Input,useToast,Spacer,Divider,Button,VStack,CardFooter,UnorderedList,Textarea,ListItem,useDisclosure, Heading } from '@chakra-ui/react';
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
  import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

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
    
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isfirst,
        onOpen: onfirst,
        onClose: onClosefirst,
      } = useDisclosure();
      const {
        isOpen: issecond,
        onOpen: onsecond,
        onClose: onClosesecond,
      } = useDisclosure();

    const [preciption,Setpreciption]=useState([{}])
    const [current,Setcurrent]=useState({
        medicine:"",
        morning:"",
        lunch:"",
        dinner:"",
        shift:""
    })

    const medicines = [
        { medicine: 'Amoxicillin', morning: '1',lunch:'0' ,dinner:'1',shift:'before' },
        { medicine: 'Ibuprofen', morning: '1',lunch:'0', dinner:'1',shift:'before'  },
        { medicine: 'Paracetamol', morning: '1',lunch:'0',dinner:'1',shift:'before'  },
      ];

    const handlechange=(e)=>{
        Setcurrent((prev)=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const handleclick=()=>{
        Setpreciption([...preciption,current])

        console.log(preciption)
        Setcurrent({medicine:"",
            morning:"",
            lunch:"",
            dinner:"",
            shift:""})
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
                        <HStack>
                            <strong>Vitals:</strong>
                            <Spacer/>
                            {data?.vitals && Object.entries(data.vitals).map(([key1, value1], index) => (
                                <Card key={index}>
                                    <Text>{`${key1}: ${value1}`}</Text>
                                </Card>
                            ))}
                        </HStack>
                        <Spacer h={2}/>
                        <Divider/>
                        <Spacer h={2}/>
                        <HStack><strong>Textarea</strong>
                        {currentDate===data.Date?(<>
                            <Textarea value={notes} onChange={(e)=>Setnotes(e.target.value)}/>
                            <Spacer/><Button onClick={()=>savingnotes()}>save</Button></>):(<Textarea value={data.notes} isDisabled/>)}
                            <VStack>
                            <Button>Report</Button>
                            {
                                currentDate==data.Date?<Button leftIcon={<AddIcon/>} colorScheme='red' onClick={onfirst}>Precription</Button>:<Button colorScheme='blue' onClick={onsecond}>Precription</Button>
                            }
                            </VStack>
                        </HStack>
                    </CardBody>
                    
                </Card>
                <Spacer h={4}/>
                </>
            ))}
            </Box>
                <Drawer onClose={onClosefirst} isOpen={isfirst} size={'full'}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>PRECRIPTION</DrawerHeader>
                <Divider/>
                <DrawerBody>
                    <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    Medcicine
                                </Th>
                                <Th>
                                    Morning
                                </Th>
                                <Th>
                                    Lunch   
                                </Th>
                                <Th>
                                    Dinner
                                </Th>
                                <Th>
                                    Before/After Food
                                </Th>
                                <Th>
                                    Save
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td><Input name='medicine' value={current.medicine} onChange={(e)=>handlechange(e)} borderColor={'black'}/></Td>
                            <Td><Input name='morning' value={current.morning} onChange={(e)=>handlechange(e)} borderColor={'black'}/></Td>
                            <Td ><Input name='lunch' value={current.lunch} onChange={(e)=>handlechange(e)} borderColor={'black'}/></Td>
                            <Td ><Input name='dinner' value={current.dinner} onChange={(e)=>handlechange(e)} borderColor={'black'}/></Td>
                            <Td ><Input name='shift' value={current.shift} onChange={(e)=>handlechange(e)} borderColor={'black'}/></Td>
                            <Td><Button onClick={()=>handleclick()}>save</Button></Td>
                        </Tr>
                           

                        </Tbody>
                        </Table>
                    </TableContainer>
                    <Spacer h={5}/>
                    <strong>Updated column</strong>
                    <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>
                                    Medcicine
                                </Th>
                                <Th>
                                    Morning
                                </Th>
                                <Th>
                                    Lunch   
                                </Th>
                                <Th>
                                    Dinner
                                </Th>
                                <Th>
                                    Before/After Food
                                </Th>
                                <Th>
                                    Delete
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        
                            {Array.isArray(preciption) && preciption.length > 0 ? (
                                preciption.map((data, index) => (
                                    <Tr key={index}>
                                    <Td>{data.medicine}</Td>
                                    <Td>{data.morning}</Td>
                                    <Td>{data.lunch}</Td>
                                    <Td>{data.dinner}</Td>
                                    <Td>{data.shift}</Td>
                                    </Tr>
                                ))
                                ) : (
                                <Tr>
                                    <Td colSpan={5}>No prescriptions available</Td>
                                </Tr>
                                )}

                        </Tbody>
                        </Table>
                    </TableContainer>
                </DrawerBody>
                </DrawerContent>
                
      </Drawer>
      <Drawer onClose={onClosesecond} isOpen={issecond} size={'full'}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>PRECRIPTION</DrawerHeader>
                <Divider/>
                <DrawerBody mx={'auto'}>
                                <Box
                    direction="column"
                    justify="center"
                    align="center"
                    width="210mm"
                    // height="297mm"
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="md"
                    padding="20px"
                    backgroundColor="white"
                    overflow="hidden"
                    >
                        <HStack w={'100%'} >
                            <Image src={'https://st4.depositphotos.com/14268534/40301/v/450/depositphotos_403014308-stock-illustration-hospital-logo-initial-letter-logo.jpg'} alt='not image' boxSize={40} />
                        
                            <VStack>
                                <Heading>ABC HOSIPITAL</Heading>
                                <strong>villooni,eruthempathy-po,chittur,palakkad-678555</strong>
                                <strong>abc@gmail.com,8893456789</strong>
                            </VStack>
                            <Spacer/>
                            
                        </HStack>
                        <HStack w={'100%'}>
                        <Text>Consultation:
                        Mon - sat : 8.00am to 11.00 am </Text>
                            <Spacer/>
                            
                            <VStack w={'20%'}>
                                <strong>Dr.Doctor1</strong>
                                <strong>MBBS, MD..(Med)</strong>
                            </VStack>
                        </HStack>
                        <Divider/>
                        <HStack w={'100%'}>
                            <VStack >
                                <HStack ml={2}><strong>Name :</strong><Text>Patient</Text></HStack>
                                <HStack ><strong>Gender :</strong><Text>Male</Text></HStack>
                            </VStack>
                            <Spacer/>
                            <VStack >
                                <HStack ><strong>Date :</strong><Text>10/10/2022</Text></HStack>
                                <HStack ><strong>Age :</strong><Text>35</Text></HStack>
                            </VStack>
                        </HStack>
                        <Divider/>
                        <Spacer h={4}/>
                        <HStack w={'100%'}>
                            <strong>
                                Medicines
                            </strong>
                        </HStack>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>
                                            Medicine
                                        </Th>
                                        <Th>
                                            Morning
                                        </Th>
                                        <Th>
                                            Lunch
                                        </Th>
                                        <Th>
                                            Dinner
                                        </Th>
                                        <Th>
                                            Before/After Food
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {Array.isArray(medicines) && medicines.length > 0 ? (
                                medicines.map((data, index) => (
                                    <Tr key={index}>
                                    <Td>{data.medicine}</Td>
                                    <Td>{data.morning}</Td>
                                    <Td>{data.lunch}</Td>
                                    <Td>{data.dinner}</Td>
                                    <Td>{data.shift}</Td>
                                    </Tr>
                                ))
                                ) : (
                                <Tr>
                                    <Td colSpan={5}>No prescriptions available</Td>
                                </Tr>
                                )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </DrawerBody>
                </DrawerContent>
                </Drawer>
        </Box>
    </Box>
  )
}

export default PatientHistory