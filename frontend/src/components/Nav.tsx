import { Box, Button, Image, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Input, Spacer, Text, useDisclosure, FormControl, RadioGroup, Stack, Radio } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { MdStarBorder } from 'react-icons/md';
import { useState } from 'react';

import { watchlist } from "../interfaces/WatchList.interface";
import useWatchedMovies from '../Hooks/useWatchedMovies';
import useWatchlistMovies from '../Hooks/useWatchlist';
import useRatedMoviesHook from '../Hooks/useRatedmovies';

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  const [value, setValue] = useState<any>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [movieId, setMovieId] = useState<number>();
  const [movieName, setMovieName] = useState<string>();
  const [movieImage, setMovieImage] = useState<string>();

  const { watchlistmovies } = useWatchlistMovies()





  const { watchedMovieMutation } = useWatchedMovies();
  const handelWatched = (a: number, b: string, c: string) => {
    setMovieId(a)
    setMovieName(b)
    setMovieImage(c)

    const movie = { movieId: a, movieName: b, movieImage: c }
    console.log(movie);
    watchedMovieMutation.mutate(movie);
  }

  const { ratedMovieMutation } = useRatedMoviesHook()
  const handelRated = async (a: number, b: string, c: string, value: number) => {
    setMovieId(a)
    setMovieName(b)
    setMovieImage(c)

    const movie = { movieId: a, movieName: b, movieImage: c, ratings: value }
    console.log(movie);
    ratedMovieMutation.mutate(movie);
    alert("ratings submitted");
  }


  // const { rateMovieMutation } = useRatings();
  // const handelRate = (id: number, ratings: number) => {
  //     const data = { id: id, ratings: Number(ratings) }
  //     console.log(data);
  //     rateMovieMutation.mutate(data)
  //     alert("ratings submitted");
  // }


  return (
    <>
      <Flex minWidth='max-content' height='4rem' alignItems='center' gap='2' bg='deepskyblue' boxShadow='2xl' p='6' rounded='2xl' >
        <Box p='2'>
          <Link to='/'> <Heading size='md' color="black">Movies Mania</Heading></Link>
        </Box>
        <Spacer />
        <ButtonGroup gap='2' marginRight='5'>
          {auth ? <>
            <Link to={'/ratedmovies'} ><Text fontSize='xl'>Rated movies</Text></Link>
            <Link to={'/watchedmovies'} ><Text fontSize='xl'>Watched movies</Text></Link>
            <Button onClick={logout} bg={'#FFFAFA'}>logout</Button>
            <Button colorScheme='teal' onClick={onOpen}>WatchList</Button>
          </>
            :
            <>
              <Link to='/signup'> <Button bg={'#FFFAFA'}>Sign Up</Button> </Link>
              <Link to='/login'> <Button bg={'#FFFAFA'}>Log in</Button></Link>
              <Box marginTop="2">
                <Link to='/login'>Watchlist</Link>
              </Box>
            </>
          }

        </ButtonGroup>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Watchlist</DrawerHeader>

          <DrawerBody>

            {
              watchlistmovies && watchlistmovies.map((elem: watchlist, index: string) => {


                return (
                  <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                    <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
                    <Box p='6'>
                      <Box display='flex' alignItems='baseline'>
                        <Text textAlign={"center"} fontSize="medium">{elem.movieName}</Text>
                      </Box>
                      <Box display="flex" justifyContent={"space-between"}>
                        <Button onClick={() => handelWatched(elem.movieId, elem.movieName, elem.movieImage)}
                          size='xs' bgColor="yellow.500" variant='outline'>Add watched</Button >
                  
                      </Box>
                      <FormControl marginTop={"5"}>
                        <RadioGroup onChange={setValue} value={value}>
                          <Stack direction='row'>
                            <Radio value='1'><MdStarBorder /></Radio>
                            <Radio value='2'><MdStarBorder /></Radio>
                            <Radio value='3'><MdStarBorder /></Radio>
                            <Radio value='4'><MdStarBorder /></Radio>
                            <Radio value='5'><MdStarBorder /></Radio>
                          </Stack>
                        </RadioGroup>
                        <Button onClick={() => handelRated(elem.movieId, elem.movieName, elem.movieImage, value)}
                          size='xs' bgColor="yellow.500" variant='outline'> Rate movie
                        </Button>
                      </FormControl>
                    </Box>
                  </Box>
                )
              })}


          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" variant='outline' mr={3} onClick={onClose}>
              Exit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Nav
