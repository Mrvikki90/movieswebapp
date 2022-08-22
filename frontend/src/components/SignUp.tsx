import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handelSignup = () => {
        let Url = "http://localhost:8080/users/create";
        axios.post(Url, {
            name: name,
            email: email,
            password: password
        })
            .then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
    }


    const alertModal2 = () => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            text: 'Registration Successfully',
            icon: 'success',
        }).then((result) => {
            if (result.isConfirmed == true) {
                handelSignup();
                navigate('/')
            }
        });
    }


    return (
        <>
            <Flex h="100vh" alignItems="center" justifyContent="center" bgColor='	#A9A9A9' >
                <Flex flexDirection="column" borderRadius={8} p={12} boxShadow="2xl" rounded={"3xl"} bgColor='whiteAlpha.900'>
                    <Heading mb={6}>Create An Acoount</Heading>
                    <FormControl display={'grid'} marginTop={'10'} alignItems={'center'} justifyContent={'center'}>
                        <FormLabel>Name</FormLabel>
                        <Input type='name'
                            onChange={e => setName(e.target.value)} />
                        <FormLabel>Email address</FormLabel>
                        <Input type='email'
                            onChange={(e) => setEmail(e.target.value)} />
                        <FormLabel>Password</FormLabel>
                        <Input type='password'
                            onChange={(e) => setPassword(e.target.value)} />
                        <Button onClick={alertModal2}
                            margin={4} colorScheme='teal' type='submit'>Sign Up
                        </Button>
                        <Link to={'/login'} > Already Have An Account ? Click Here </Link>
                    </FormControl>
                </Flex>
            </Flex>


        </>
    )
}

export default Signup