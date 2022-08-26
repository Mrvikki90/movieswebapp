import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
  type inputs = {
    email: string;
    password: string;
  };

  const navigate = useNavigate();

  const loginSchema = Yup.object().shape({
    email: Yup.string().required("email is Required"),

    password: Yup.string().required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const handelLogin = async (data: any) => {
    let Url = "http://localhost:8080/auth/login";
    let result = await axios.post(Url, data);
    localStorage.setItem("auth", result.data);
    if (result.data) {
      navigate("/");
    } else {
      alert("wrong credentials");
    }
  };

  const alertModal2 = (data: any) => {
    console.log(data);
    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Good job!",
      text: "login Successfully",
      icon: "success",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed == true) {
        handelLogin(data);
      }
    });
  };

  return (
    <>
      <Flex
        h="100vh"
        alignItems="center"
        color="blackAlpha.700"
        justifyContent="center"
      >
        <Box
          borderRadius={8}
          p={12}
          boxShadow="2xl"
          rounded="3xl"
          bgColor="cyan.100"
        >
          <Heading mb={6}>Login Account </Heading>
          <FormControl
            display={"grid"}
            marginTop={"10"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <form onSubmit={handleSubmit(alertModal2)}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email", { required: true })} />
              <Text color="red">{errors.email?.message}</Text>
              <FormLabel>Password</FormLabel>
              <Input {...register("password", { required: true })} />
              <Text color="red">{errors.password?.message}</Text>
              <Button margin={4} colorScheme="teal" type="submit">
                Login
              </Button>
              <Link to={"/signup"}> Dont Have An Account ? Click Here </Link>
            </form>
          </FormControl>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
