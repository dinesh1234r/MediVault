import React, { useState } from 'react';
import {
  Box, Button, Input, Heading, VStack, HStack, Radio, RadioGroup, Stack, FormControl, FormLabel, useToast, IconButton, Progress
} from '@chakra-ui/react';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Sidebar from './Sidebar';
import { jwtDecode } from 'jwt-decode';

const AddNurse = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("");
  const [values, setValues] = useState({
    Doctor_name: "", Email_Address: "", DOB: "", Current_Address: "", Qualifications: "", Specialization: "",
    Medical_License_Number: "", Medical_Council_Registration_Number: "", Years_of_experience: ""
  });
  const [photo, setPhoto] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validation
      if (!values.Doctor_name || !values.Email_Address || !values.Current_Address || !photo || !values.Qualifications || !values.Specialization || !values.Medical_License_Number || !values.Medical_Council_Registration_Number || !values.Years_of_experience || !gender) {
        toast({
          title: "Please fill in all the fields",
          status: "error",
          duration: 1500,
          isClosable: true,
          // position: 'top',
        });
        setIsLoading(false);
        return;
      }
      const Admin=jwtDecode(localStorage.getItem('jwt')).adminuser;
      const response = await axios.post('http://localhost:5000/admin/postbyadminfornurse', {
        Admin,gender, ...values, photo
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}`, 'Content-Type': 'application/json' }
      });

      if (response.data.msg === "Details are saved successfully") {
        toast({ title: response.data.msg, status: "success", duration: 1500, isClosable: true });
        setValues({ Nurse_name: "", Email_Address: "", Current_Address: "", DOB: "", Qualifications: "", Specialization: "", Medical_License_Number: "", Medical_Council_Registration_Number: "", Years_of_experience: "" });
        setGender("");
        setPhoto("");
        setImage("");
      } else {
        toast({ title: response.data.msg, status: "error", duration: 1500, isClosable: true });
      }
    } catch (err) {
      toast({ title: "Error submitting form", status: "error", duration: 1500, isClosable: true});
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);

  const handlePhotoUpload = () => {
    if (image.length === 0) {
      toast({ title: "Choose a photo", status: "error"});
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "f05bb7m0");
    axios.post(`https://api.cloudinary.com/v1_1/dyv9xgbfx/image/upload`, formData)
      .then(res => {
        toast({ title: "Photo Added Successfully", status: "success"});
        setPhoto(res.data.url);
        setImage("");
        setIsLoading(false);
      })
      .catch(err => {
        toast({ title: "Error uploading photo", status: "error"});
        setIsLoading(false);
      });
  };

  return (
    <Box bg="gray.100" p={6} ml={{ base: 0, md: '250px' }} transition="margin-left 0.2s ease" w={'100%'} minH="100vh">
      <Box width="90%" mx="auto" p={6} bg="white" borderRadius="lg" boxShadow="md">
        <Heading size="lg" textAlign="center" mb={4}>Add Nurse</Heading>
        <Progress value={(page - 1) * 50} max={100} colorScheme="teal" mb={4} />

        {page === 1 && (
          <VStack spacing={4} align="start">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="Doctor_name" value={values.Doctor_name} onChange={handleChange} placeholder="Enter Nurse's Name" />
            </FormControl>
            <FormControl>
              <FormLabel>DOB</FormLabel>
              <Input type="date" name="DOB" value={values.DOB} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup onChange={setGender} value={gender}>
                <Stack direction="row">
                  <Radio value="female">Female</Radio>
                  <Radio value="male">Male</Radio>
                  <Radio value="prefer not to say">Prefer not to say</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="Email_Address" value={values.Email_Address} onChange={handleChange} placeholder="Enter Email" />
            </FormControl>
            <FormControl>
              <FormLabel>Current Address</FormLabel>
              <Input name="Current_Address" value={values.Current_Address} onChange={handleChange} placeholder="Enter Current Address" />
            </FormControl>
            <FormControl>
              <FormLabel>Upload Photo</FormLabel>
              <HStack spacing={4}>
                <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <Button colorScheme="blue" onClick={handlePhotoUpload} isLoading={isLoading} spinner={<BeatLoader size={8} color="white" />}>Upload</Button>
              </HStack>
            </FormControl>
          </VStack>
        )}

        {page === 2 && (
          <VStack spacing={4} align="start">
            <FormControl>
              <FormLabel>Qualifications</FormLabel>
              <Input name="Qualifications" value={values.Qualifications} onChange={handleChange} placeholder="Enter Qualifications" />
            </FormControl>
            <FormControl>
              <FormLabel>Specialization</FormLabel>
              <Input name="Specialization" value={values.Specialization} onChange={handleChange} placeholder="Enter Specialization" />
            </FormControl>
            <FormControl>
              <FormLabel>Medical License Number</FormLabel>
              <Input name="Medical_License_Number" value={values.Medical_License_Number} onChange={handleChange} placeholder="Enter License Number" />
            </FormControl>
            <FormControl>
              <FormLabel>Medical Council Registration Number</FormLabel>
              <Input name="Medical_Council_Registration_Number" value={values.Medical_Council_Registration_Number} onChange={handleChange} placeholder="Enter Council Registration Number" />
            </FormControl>
            <FormControl>
              <FormLabel>Years of Experience</FormLabel>
              <Input name="Years_of_experience" value={values.Years_of_experience} onChange={handleChange} placeholder="Enter Years of Experience" />
            </FormControl>
          </VStack>
        )}

        <HStack justify="space-between" mt={6}>
          <IconButton icon={<FaArrowLeft />} onClick={handlePrevPage} isDisabled={page === 1} />
          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={handleSubmit} isLoading={isLoading} spinner={<BeatLoader size={8} color="white" />}>Save</Button>
            <Button colorScheme="gray" onClick={handleNextPage} isDisabled={page === 2}>Next</Button>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

const ViewAddNurse = () => {
  return (
    <Box display="flex" w={'100%'} minH="100vh">
      <Sidebar />
      <AddNurse />
    </Box>
  );
};

export default ViewAddNurse;
