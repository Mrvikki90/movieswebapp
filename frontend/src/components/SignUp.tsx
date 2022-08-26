import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();

  const handelSignup = (data: any) => {
    console.log(data);
    let Url = "http://localhost:8080/users/create";
    axios
      .post(Url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  interface inputs {
    name: string;
    email: string;
    password: string;
  }

  const alertModal2 = (data: any) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      text: "Registration Successfully",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed == true) {
        handelSignup(data);
        navigate("/");
      }
    });
  };

  const signUpSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .typeError("please enter vlaid name"),

    email: Yup.string()
      .email()
      .required("Email is required")
      .typeError("please enter vlaid email")
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .typeError("please enter valid password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
  });

  return (
    <>
      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        bgColor="	#A9A9A9"
      >
        <Flex
          flexDirection="column"
          borderRadius={8}
          p={12}
          boxShadow="2xl"
          rounded={"3xl"}
          bgColor="whiteAlpha.900"
        >
          <Heading mb={6}>Create An Acoount</Heading>
          <form onSubmit={handleSubmit(alertModal2)}>
            <FormControl
              display={"grid"}
              marginTop={"10"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", {
                  required: true,
                  pattern: {
                    value: /^[aA-zZ\s]+$/,
                    message: "please enter name correctly",
                  },
                })}
              />
              <Text color="red">{errors.name?.message}</Text>

              <FormLabel>Email address</FormLabel>
              <Input
                {...register("email", {
                  required: true,
                })}
              />

              <Text color="red">{errors.email?.message}</Text>

              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", { required: true, maxLength: 5 })}
              />
              <Text color="red">{errors.password?.message}</Text>
              <Button margin={"10"} colorScheme="teal" type="submit">
                Sign Up
              </Button>
              <Link to={"/login"}> Already Have An Account ? Click Here </Link>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
