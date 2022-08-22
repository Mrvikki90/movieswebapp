import { Box, Button, Image, ButtonGroup, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Input, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { getWatchlist } from '../Api/watchlist.api';
import React, { useEffect, useState } from 'react';
import { watchlist } from '../interfaces/watchlist.interface';
import { moviesData } from '../interfaces/movieslist.interface';
import { watchedMovies } from '../Api/watchedmovies.api';
import { ratedMovies } from '../Api/ratedmovies.api';
import useWatchedMovies from '../Hooks/watchedmovies.hook';
const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    getmoviesData();
   },[])
  
   const { isOpen, onOpen, onClose } = useDisclosure();
  const [wishlist, setwishlist] = useState<any>()

  const [movieId, setMovieId] = useState<number>();
  const [movieName, setMovieName] = useState<string>();
  const [movieImage, setMovieImage] = useState<string>();




  const getmoviesData = async () => {
    const result = await getWatchlist()
    setwishlist(result);
    return result;
  }

  
  const {watchedMovieMutation} = useWatchedMovies();
  
  const handelWatched = async (a:number , b : string , c : string ) => {
    setMovieId(a)
    setMovieName(b)
    setMovieImage(c)

    const movie = { movieId: a, movieName: b, movieImage: c }
    console.log(movie);
    watchedMovieMutation.mutate(movie);

    // const result = await watchedMovies(movie);
    // console.log(result.data)
    // return result
  }


  const handelRated = async (a:number , b : string , c : string) => {
    setMovieId(a)
    setMovieName(b)
    setMovieImage(c)
    
    const movie = { movieId: a, movieName: b, movieImage: c }
    console.log(movie);
    const result = await ratedMovies(movie);
    console.log(result.data)
    return result
  }


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
              wishlist && wishlist.allMovies.map((elem: watchlist, index: string) => {
                return (
                  <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                    <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
                    <Box p='6'>
                      <Box display='flex' alignItems='baseline'>
                        <Text textAlign={"center"} fontSize="medium">{elem.movieName}</Text>
                      </Box>
                      <Box display="flex" justifyContent={"space-between"}>
                        <Button onClick={()=>handelWatched(elem.movieId, elem.movieName ,elem.movieImage)}
                        size='xs' bgColor="yellow.500" variant='outline'>Add watched</Button >
                        <Button  onClick={()=>handelRated(elem.movieId, elem.movieName ,elem.movieImage)} paddingLeft="5" 
                         size='xs' bgColor="yellow.500" variant='outline'>Add to Rated</Button>
                      </Box>
                      <Button 
                       size='xs' bgColor="yellow.500" variant='outline'>Rate movie</Button>
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