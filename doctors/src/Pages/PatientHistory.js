import React, { useState,useEffect } from 'react';
import { HStack,Flex,Box,Text,Card,CardHeader,CardBody,Image,Input,useToast,Spacer,Divider,Button,VStack,CardFooter,UnorderedList,Textarea,ListItem,useDisclosure, Heading,IconButton } from '@chakra-ui/react';
import axios from 'axios'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
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
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { FiLogOut } from 'react-icons/fi';
  import { useNavigate } from 'react-router-dom'
  import {jwtDecode} from 'jwt-decode';
  import { addHistory,clearHistory } from '../Redux/Slice';
 import { useDispatch } from 'react-redux';
 import { useSelector } from 'react-redux';

function PatientHistory() {
    const filter=useSelector((state)=>state.history.filter)
    
    const toast=useToast();
    const navigate=useNavigate()
    const [history,SetHistory]=useState([{}]);
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    const [age, setAge] = useState(null);
    const dob=JSON.parse(localStorage.getItem('patient')).DOB;
    // console.log(dob)
    useEffect(() => {
        calculateAge();
      }, []); 

    const calculateAge=()=>{
        const date=new Date();
        const birth=new Date(dob);
        let age=date.getFullYear()-birth.getFullYear();
        let month=date.getMonth()-birth.getMonth();
        if(month<0||(month===0&&date.getDate()<birth.getDate()))
        {
            age--;
        }
        setAge(age);
    }

    const simpleFormattedDate = `${day}/${month}/${year}`;
    // console.log(simpleFormattedDate)

    // console.log(currentDate)
    const [notes,Setnotes]=useState("")
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchhistory=async()=>{
            try{
                const _id=JSON.parse(localStorage.getItem('patient'))._id;
                const response=await axios.post('https://medivault.onrender.com/patient/history',{_id},{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
                      'Content-Type': 'application/json'
                    }
                  })
                if(response.data.msg==="History received")
                {
                    const result=response.data.result.reverse();
                    dispatch(addHistory(result))
                    result.map((data)=>{
                        if(data.Date===simpleFormattedDate)
                        {
                            Setnotes(data.notes);
                            Setpreciption(data.preciption)
                        }
                    })
                    // console.log(result)
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
    const [historyFilter,sethistoryFilter]=useState([])
    useEffect(() => {
        if (filter !== '') {
          const h1 = history.filter((data) => filter === data.disease);
          sethistoryFilter(h1);
        } else {
          sethistoryFilter(history); 
        }
      }, [filter, history]); 
    const savingnotes=async()=>{
        try{
            const _id=JSON.parse(localStorage.getItem('patient'))._id;
            const response=await axios.post('https://medivault.onrender.com/patient/notesadded',{_id,notes},{
                headers:{
                  'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
                  'Content-Type': 'application/json'
                }
              })
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
      const {
        isOpen: isreport,
        onOpen: onreport,
        onClose: onClosereport,
      } = useDisclosure();
      const {
        isOpen: ispdf,
        onOpen: onpdf,
        onClose: onClosepdf,
      } = useDisclosure();

    const [preciption,Setpreciption]=useState([])
    const [current,Setcurrent]=useState({
        medicine:"",
        morning:"",
        lunch:"",
        dinner:"",
        shift:""
    })

    

    const [medicines,Setmedicines]=useState([]);
    
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

    const handlelogout=()=>{
        navigate('/home')
        localStorage.removeItem('patient');
        dispatch(clearHistory())
      }

      const handledelete=(index)=>{
        const temp=[...preciption];
        temp.splice(index,1);
        Setpreciption(temp);
      }

      const handlesendprecription=async()=>{
        try{
            const _id=JSON.parse(localStorage.getItem('patient'))._id
            const Doctor=jwtDecode(JSON.stringify(localStorage.getItem('Jwt'))).user;
            const response=await axios.post('https://medivault.onrender.com/patient/updateprecription',{_id,preciption,Doctor},{
                headers:{
                  'Authorization':`Bearer ${localStorage.getItem('Jwt')}`,
                  'Content-Type': 'application/json'
                }
              })
            if(response.data.msg==="Precription added successfully")
            {
                toast({
                    title:response.data.msg,
                    position:"top",
                    duration:1200,
                    status:"success"
                })
            }
            else
            {
                toast({
                    title:response.data.msg,
                    position:"top",
                    duration:1200,
                    status:"error"
                })
            }
        }
        catch(err)
        {
            toast({
                title:"Error occured in sending precription",
                position:"top",
                duration:1200,
                status:"error"
            })
        }
      }

      const handlereport=(data)=>{
        Setmedicines(data);
      }
      const [pdfdata,Setpdfdata]=useState({})
      const handlereporttoview=(data)=>{
        if(data.placeholder)
        {
            toast({
                title:"Reports not Found",
                duration:1200,
                status:"warning"
            })
            return;
        }
        onreport()
        Setpdfdata(data);
      }

    //   const btnRef = React.useRef()
    const [pdfview,Setpdfview]=useState("");
    const [pdfname,Setpdfname]=useState("");
    const [doctorname,Setdoctorname]=useState("");
    const [datas,Setdatas]=useState({})

  return (
    <Box h={'100vh'}>
        <HStack ml={20} mr={10} mt={5} mb={2}>
            <Text fontSize={20}>Name:</Text><Text fontSize={20}>{JSON.parse(localStorage.getItem("patient")).Name}</Text>
            <Spacer/>
            <Text fontSize={20}>Age:</Text><Text fontSize={20}>{age}</Text>
            <IconButton aria-label="Logout" color={'red'} bg={'white'} icon={<FiLogOut/>} onClick={()=>handlelogout()}/>
        </HStack>
        <Divider/>
        <Box overflowY={'scroll'} h={'90vh'}>
            <Box w={'60%'} mx={'auto'} mt={4}>
            {historyFilter.map((data)=>(
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
                        {simpleFormattedDate===data.Date?(<>
                            <Textarea value={notes} onChange={(e)=>Setnotes(e.target.value)}/>
                            <Spacer/><Button onClick={()=>savingnotes()}>save</Button></>):(<Textarea value={data.notes} isDisabled/>)}
                            <VStack>
                            <Button onClick={()=>{handlereporttoview(data.report);}}>Report</Button>
                            {
                                simpleFormattedDate==data.Date?<Button leftIcon={<AddIcon/>} colorScheme='red' onClick={()=>{handlereport(data.preciption);onfirst()}}>Prescription</Button>:<Button colorScheme='blue' onClick={()=>{handlereport(data.preciption);Setdatas(data);onsecond();}}>Prescription</Button>
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
                <DrawerHeader>
                    <HStack mr={6}>
                        <Text>PRECRIPTION</Text>
                        <Spacer/>
                        <Button onClick={()=>handlesendprecription()}>Save</Button>
                    </HStack>
                </DrawerHeader>
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
                            <Td><IconButton icon={<AddIcon/>} color={'green'} onClick={()=>handleclick()}/></Td>
                        </Tr>
                           

                        </Tbody>
                        </Table>
                    </TableContainer>
                    <Spacer h={5}/>
                    <HStack>
                        <strong>Updated column</strong>
                        <Spacer/>
                        <Button>print</Button>
                    </HStack>
                    <TableContainer>
                    <Box h={'60vh'} overflowY={'scroll'}>
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
                                <Th>
                                    Delete
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            
                            {Array.isArray(preciption) && preciption.length > 0 ? (
                                preciption.map((data, index) => (
                                    <>
                                    <Spacer h={2}/>
                                    <Tr key={index}>
                                    <Td>{data.medicine}</Td>
                                    <Td>{data.morning}</Td>
                                    <Td>{data.lunch}</Td>
                                    <Td>{data.dinner}</Td>
                                    <Td>{data.shift}</Td>
                                    <IconButton icon={<DeleteIcon/>} colorScheme='red' isRound onClick={()=>handledelete(index)}/>
                                    </Tr>
                                    </>
                                ))
                                ) : (
                                <Tr>
                                    <Td colSpan={5}>No prescriptions available</Td>
                                </Tr>
                                )}

                        </Tbody>
                        </Table>
                        </Box>
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
                                <strong>{`Dr.${datas.Doctor}`}</strong>
                                <strong>MBBS, MD..(Med)</strong>
                            </VStack>
                        </HStack>
                        <Divider/>
                        <HStack w={'100%'}>
                            <VStack >
                                <HStack ml={2}><strong>Name :</strong><Text>{JSON.parse(localStorage.getItem("patient")).Name}</Text></HStack>
                                <HStack ><strong>Gender :</strong><Text>Male</Text></HStack>
                            </VStack>
                            <Spacer/>
                            <VStack >
                                <HStack ><strong>Date :</strong><Text>{datas.Date}</Text></HStack>
                                <HStack ><strong>Age :</strong><Text>{age}</Text></HStack>
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
                                    {/* <Td><IconButton /></Td> */}
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
                <Modal
        isOpen={isreport}
        placement='right'
        onClose={onClosereport}
        // finalFocusRef={btnRef}
        size={'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Reports</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
            {pdfdata&&Object.entries(pdfdata).map(([key, value]) => (
                <Button onClick={()=>{Setpdfview(value);Setpdfname(key);onpdf()}}>{key+".pdf"}</Button>
            ))}
            </Flex>
          </ModalBody>

        </ModalContent>
      </Modal>
      <Drawer
        isOpen={ispdf}
        placement='top'
        onClose={onClosepdf}
        size={'full'}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`${pdfname}.pdf`}</DrawerHeader>

          <DrawerBody>
            <Box h={'90vh'}>
            <iframe
                title="PDF Viewer"
                src={pdfview}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            </Box>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClosepdf}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
        </Box>
    </Box>
  )
}

export default PatientHistory