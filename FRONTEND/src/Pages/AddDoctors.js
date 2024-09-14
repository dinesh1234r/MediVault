import React, { useState } from 'react'
import {
  Box,Button,Input,Heading,VStack,HStack,Radio,Image, RadioGroup,Stack,Center,Toast,useToast,FormControl,FormLabel
} from '@chakra-ui/react';
import axios from 'axios';
import { Divider } from '@chakra-ui/react'
import { jwtDecode } from 'jwt-decode';
import { BeatLoader } from 'react-spinners';



function AddDoctors() {
  const toast=useToast();
  const [isLoading,SetisLoading]=useState(false);
  const [page,Setpage]=useState(true);
  const [gender,Setgender]=useState("");
  const [values,Setvalues]=useState({
    Doctor_name:"",Email_Address:"",DOB:"",Current_Address:"",Qualifications:"",Specialization:"",Medical_License_Number:"",
    Medical_Council_Registration_Number:"",Years_of_experience:"",Contract_type:""
  });
  const handlechange=(e)=>{
    Setvalues({...values,[e.target.name]:e.target.value});
  }

  const handlesubmit=async()=>{
    SetisLoading(true);
    
    try{
    const Admin=jwtDecode(localStorage.getItem('jwt')).adminuser;
    const {Doctor_name,Email_Address,DOB,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Contract_type}=values;
    if(Doctor_name.length===0)
    {
        toast({
          title:"Name can't be Empty",
          status:"error",
          position:"top",
          duration:1500,
          isClosable:true,
          onCloseComplete:()=>{ 
          SetisLoading(false);
        }
        })
    }
    else if(Email_Address.length===0)
    {
      toast({
        title:"Email can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Current_Address.length===0)
    {
      toast({
        title:"Address can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(photo.length===0)
    {
      toast({
        title:"Photo must be Inserted",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Qualifications.length===0)
    {
      toast({
        title:"Qualifications can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Specialization.length===0)
    {
      toast({
        title:"Specialization can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Medical_License_Number.length===0)
    {
      toast({
        title:"MLN can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Medical_Council_Registration_Number.length===0)
    {
      toast({
        title:"Council no can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Years_of_experience.length===0)
    {
      toast({
        title:"YOE can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(Contract_type.length===0)
    {
      toast({
        title:"Contract type can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else if(gender.length===0)
    {
      toast({
        title:"Gender can't be Empty",
        status:"error",
        position:"top",
        duration:1500,
        isClosable:true,
        onCloseComplete:()=>{ 
        SetisLoading(false);
      }
      })
    }
    else
    {
      console.log(DOB);
    const response=await axios.post('http://localhost:5000/admin/postbyadmin',{Admin,gender,Doctor_name,DOB,photo,Email_Address,Current_Address,Qualifications,Specialization,Medical_License_Number,Medical_Council_Registration_Number,Years_of_experience,Contract_type},{
      headers:{
        'Authorization':`Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
    if(response.data.msg==="Details are saved successfully")
    {
      toast({
        title:response.data.msg,
        status:"success",
        duration:1500,
        isClosable:true,
        position:'top',
        onCloseComplete:()=>{ 
          SetisLoading(false);
        }
      })
      Setvalues({Doctor_name:"",Email_Address:"",Current_Address:"",DOB:"",Qualifications:"",Specialization:"",Medical_License_Number:"",
        Medical_Council_Registration_Number:"",Years_of_experience:"",Contract_type:""});
      Setgender("");
      Setphoto("");
    }
    else
    {
      toast({
        title:response.data.msg,
        status:"error",
        duration:1500,
        isClosable:true,
        position:'top',
        onCloseComplete:()=>{ 
          SetisLoading(false);
        }
      })
      
    }
    }
  }
  catch(err)
  {
    toast({
      title:err,
      status:"error",
      duration:3000,
      isClosable:true,
      position:'top',
      onCloseComplete:()=>{ 
        SetisLoading(false);
      }
    })
  }
  
  }

  const handleprevpage=()=>{
    Setpage(true);
  }

  const handlenextpage=()=>{
    Setpage(false);
  }

  const handlereset=()=>{
    Setvalues({Doctor_name:"",Email_Address:"",DOB:"",Current_Address:"",Qualifications:"",Specialization:"",Medical_License_Number:"",
      Medical_Council_Registration_Number:"",Years_of_experience:"",Contract_type:""});
    SetImage("");
    Setgender("");
    Setphoto("")
  }

  const preset_name="f05bb7m0"
  const cloud_name="dyv9xgbfx"
  const [photo,Setphoto]=useState("");
  const [image,SetImage]=useState("")
    const handlephoto=()=>{
      if(image.length===0)
      {
        toast({
          title:"Choose a photo",
          status:"error",
          position:"top",
        })
        return;
      }
      SetisLoading(true)
      const formData=new FormData();
      formData.append("file",image)
      formData.append("upload_preset",preset_name);
      axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
      .then(res=>{
        toast({
          title:"Photo Added Successfully",
          status:"success",
          position:'top',
          onCloseComplete:()=>{
            SetisLoading(false);
          }
        })
        Setphoto(res.data.url);
        SetImage("");
      })
      .catch(err=>{
        console.log(err);
        toast({
          title:err,
          status:'error'
        })
      })
    }

  return (
    <Box bg={'gray.200'} p={6}>
    <Box
    width="80%"
    letterSpacing={2}
    boxShadow={'md'}
    bg={'white'}
    p={4}
    mx={'auto'}  borderRadius={'lg'}
  >
    <Heading  letterSpacing={2}>Detail Form</Heading>
    <Divider p={2}/>
    {page?
    <VStack align={'baseline'} spacing={2} p={2}>
      <FormLabel >Enter Doctor's Name </FormLabel>
      <Input name='Doctor_name' placeholder='Doctor_name' value={values.Doctor_name} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel>Enter Doctor's DOB</FormLabel>
        <Input name='DOB' placeholder='DOB' size='md' type='date' alignItems={'center'} maxW={'90%'} boxShadow={'md'} ml={'5%'} bg='white' value={values.DOB} onChange={(e)=>handlechange(e)}/>
        <FormLabel>Enter Doctor's Gender</FormLabel>
        <RadioGroup >
          <Stack direction={'row'} onChange={(e)=>Setgender(e.target.value)} value={gender}>
            <Radio value='male' bg={'white'}>Male</Radio>
            <Radio value='female' bg={'white'}>Female</Radio>
            <Radio value='prefer not to say' bg={'white'}>Prefer Not to say</Radio>
          </Stack>
        </RadioGroup>
        <FormLabel>Enter Doctor's Email</FormLabel>
        <Input name='Email_Address' placeholder='Email Address' value={values.Email_Address} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel>Enter Doctor's Current Address</FormLabel>
        <Input name='Current_Address' placeholder='Current Address' value={values.Current_Address} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel>Enter Doctor's Photo</FormLabel>
        <HStack>
            <Input type='file' alignContent={'center'} w={'30%'} onChange={(e)=>SetImage(e.target.files[0])} width={'50%'}  />
            <Button colorScheme='blue' onClick={()=>handlephoto()} isLoading={isLoading} spinner={<BeatLoader size={8} color='white' />}>upload</Button>
            <Image letterSpacing={0} src={photo} bg={'gray.200'} alt="preview" boxSize='60px'/>
        </HStack>
        </VStack>:
        <VStack align={'baseline'} spacing={2} p={2}>
        <FormLabel >Enter Doctor's Qualifications</FormLabel>
        <Input name='Qualifications' placeholder='Qualifications' value={values.Qualifications} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel >Enter Doctor's Specialization Of Work</FormLabel>
        <Input name='Specialization' placeholder='Specialization (e.g., Cardiology, Pediatrics)' value={values.Specialization} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel >Enter Doctor's Specialization Of Medical License Number</FormLabel>
        <Input name='Medical_License_Number' placeholder='Medical License Number' value={values.Medical_License_Number} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel >Enter Doctor's Specialization Of Medical Council Registration Number</FormLabel>
        <Input name='Medical_Council_Registration_Number' placeholder='Medical Council Registration Number' value={values.Medical_Council_Registration_Number} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel >Enter Doctor's Specialization Of Years Of Experience</FormLabel>
        <Input name='Years_of_experience' placeholder='Years of experience' value={values.Years_of_experience} alignItems={'center'} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
        <FormLabel >Enter Doctor's Specialization Of Contract Type</FormLabel>
        <Input name='Contract_type' placeholder='Contract type' alignItems={'center'} value={values.Contract_type} maxW={'90%'} boxShadow={'md'} onChange={(e)=>handlechange(e)} ml={'5%'} bg='white'/>
      <HStack>
      <Button colorScheme='teal' onClick={handlesubmit} isLoading={isLoading} loadingText={'Submitting'} >Save</Button>
      <Button colorScheme='red' onClick={()=>handlereset()}>Reset</Button>
      </HStack>
      </VStack>
      }
      <HStack p={2} justify={'center'}>
        <Button  colorScheme="teal" onClick={()=>handleprevpage()}>
        {"<- prev"}
        </Button>
        <Button  colorScheme="teal" onClick={()=>handlenextpage()}>
        {"next ->"}
        </Button>
      </HStack>
    </Box>
    </Box>
  )
}

export default AddDoctors