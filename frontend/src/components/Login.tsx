import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Login = () => {

  type inputs = {
    email: string;
    password: string
  }

  const navigate = useNavigate();

  const { register, handleSubmit,  formState: { errors } } = useForm<inputs>({
    reValidateMode: 'onChange'
  });


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const alertModal2 = (data: any) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      title: 'Good job!',
      text: 'login Successfully',
      icon: 'success',
    }).then((result: { isConfirmed: boolean}) => {
      if (result.isConfirmed == true) {
      }
    });
  }

  return (
    <>
      <Flex h="100vh" alignItems="center" justifyContent="center"  >
          <Box  borderRadius={8} p={12} boxShadow="2xl" rounded="3xl" bgColor="linkedin.100" >
          <Heading mb={6}>Login Account </Heading>
          <FormControl display={'grid'} marginTop={'10'} alignItems={'center'} justifyContent={'center'} >
            <FormLabel>Email address</FormLabel>
            <Input type='email'
              {...register("email", { required: true })}
              onChange={(e: any) => setEmail(e.target.value)} />
            {errors.email && <Text color='red'>This field is required</Text>}
            <FormLabel>Password</FormLabel>
            <Input type='password'
              {...register("password", { required: true })}
              onChange={(e: any) => setPassword(e.target.value)} />
            {errors.password && <Text color='red'>This field is required</Text>}
            <Button
              onClick={handleSubmit(alertModal2)}
              margin={4} colorScheme='teal' type='submit'>Login
            </Button>
            <Link to={'/signup'} > Dont Have An Account ? Click Here </Link>
          </FormControl>
          </Box>
      </Flex>


    </>
  )
}

export default Login