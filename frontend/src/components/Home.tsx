import { Box, Button, FormControl, Input, Stack, Image, Grid, Text, useDisclosure, Flex, UnorderedList, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { Link } from "react-router-dom";

import { moviesDetails } from "../Api/getmoviesdetails.api";
import { getMovies } from "../Api/moviesList.api";
import { moviesData } from "../interfaces/MoviesList.interface";
import useWatchlistMovies from "../Hooks/useWatchlist";



const Home = () => {

    const auth = localStorage.getItem("auth");

    useEffect(() => {
        getList();
    }, [])

    const [moviesData, setmoviesData] = useState<any>();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [movieId, setMovieId] = useState<number>();
    const [movieName, setMovieName] = useState<string>();
    const [movieImage, setMovieImage] = useState<string>();

    const [moviessList, setmoviessList] = useState<any>();

    const getList = async () => {
        const data = await getMovies()
        setmoviessList(data);
        return data;
    }


    const [inputText, setInputText] = useState("");
    let inputHandler = (e :any) => {
        var lowerCase = e.target.value
        setInputText(lowerCase);
    };


    const handelView = async (id: number) => {
        const result = await moviesDetails(id)
        setmoviesData(result);
        onOpen()
    };


    const { watchlistMutation } = useWatchlistMovies();
    const watchlistHandel = async (a: number, b: string, c: string) => {
        setMovieId(a)
        setMovieName(b)
        setMovieImage(c)

        const movie = { movieId: a, movieName: b, movieImage: c }
        console.log(movie);
        watchlistMutation.mutate(movie);


    }

    return (
        <>
                <FormControl display={'flex'} alignItems='center' justifyContent={'center'}>
                    <Input onChange={inputHandler}
                        id='search' border="2px" borderRadius="3xl" borderColor="black" type='search' placeholder='Search Movies' w={'80'} />
                </FormControl>
            <>
                <Grid bgColor="gray.500" templateColumns='repeat(3, 1fr)' gap={1}>

                    {
                        inputText === "" ?
                            moviessList && moviessList.map((elem: moviesData, index: string) => {
                                return (
                                    <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                                        <Image maxH="20rem" src={elem.ThumbnailImage} alt={"image"} />
                                        <Box p='6'>
                                            <Box display='flex' alignItems='baseline'>

                                                <Text textAlign={"center"} fontSize="medium">{elem.MoviesName}</Text>

                                            </Box>
                                            <Box>
                                                {elem.MovieDescription}
                                            </Box>

                                            <Box display="flex" alignItems={"center"} justifyContent={"space-between"}>
                                                {
                                                    auth ?
                                                        <Button onClick={() => watchlistHandel(elem.id, elem.MoviesName, elem.ThumbnailImage)}
                                                            size='xs' bgColor="yellow.500" variant='outline'>Add watch later</Button>
                                                        :
                                                        <>
                                                            <Button onClick={() => handelView(elem.id)}
                                                                size='xs' bgColor="yellow.500" variant='outline'>View</Button>
                                                            <Link to={'/login'} >Add to Watchlater</Link>
                                                        </>
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })
                            :
                            <>
                                {
                                    moviessList && moviessList.filter((elem: moviesData) => elem.MoviesName.includes(inputText)).map((elem: moviesData, index: string) => {
                                        return (
                                            <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                                                <Image maxH="20rem" src={elem.ThumbnailImage} alt={"image"} />
                                                <Box p='6'>
                                                    <Box display='flex' alignItems='baseline'>
                                                        <Text textAlign={"center"} fontSize="medium">{elem.MoviesName}</Text>
                                                    </Box>
                                                    <Box>
                                                        {elem.MovieDescription}
                                                    </Box>
                                                    <Box display="flex" justifyContent={"space-between"}>
                                                        {auth ?
                                                            <Button
                                                                size='xs' bgColor="yellow.500" variant='outline'>Rate movie</Button>
                                                            :
                                                            <>
                                                                <Button onClick={() => handelView(elem.id)}
                                                                    size='xs' bgColor="yellow.500" variant='outline'>View</Button>
                                                                <Button onClick={() => watchlistHandel(elem.id, elem.MoviesName, elem.ThumbnailImage)}
                                                                    size='xs' bgColor="yellow.500" variant='outline'>Add to watch later</Button>
                                                            </>
                                                        }
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    })}
                            </>
                    }
                </Grid>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                moviesData &&
                                <>
                                    <Flex>
                                        <Flex><Image maxH="20rem" src={moviesData.ThumbnailImage} alt={"image"} /></Flex>
                                        <Flex><UnorderedList listStyleType={"none"}>
                                            <ListItem>Name: {moviesData.MoviesName}</ListItem>
                                            <ListItem>Category: {moviesData.MovieDescription}</ListItem>
                                            <ListItem>Release Date: {moviesData.ReleaseDate}</ListItem>
                                            <ListItem>Rating: {moviesData.Rating}</ListItem>
                                        </UnorderedList>
                                        </Flex>
                                    </Flex>
                                </>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </></>

    )
}

export default Home