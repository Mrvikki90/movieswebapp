import { Box, Button, Grid, Image, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useMutation } from "react-query";

import useRatedMoviesHook from '../Hooks/useRatedmovies';
import { deleteratedMovies } from '../Api/ratedmovies.api';

const RatedMovies = () => {

  useEffect(() => {
  })

  const [deleteData, setdeleteData] = useState();

  const { ratedMoviesList, isFetched, refetchratedMovies } = useRatedMoviesHook();

  const { mutate: handelRemove } = useMutation(
    async (id: number) => {
      const data = await deleteratedMovies(id);
      return data
    },


  )

  const handRemove = async (id: number) => {
    const data = await deleteratedMovies(id);
    setdeleteData(data)
    refetchratedMovies()
    return data;
  }

  return (
    <>

      <Grid templateColumns='repeat(3, 1fr)' gap={1}>
        {
          ratedMoviesList && ratedMoviesList.map((elem: any, index: string) => {
            return (
              <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
                <Box p='6'>
                  <Box display='flex' alignItems='baseline'>
                    <Text textAlign={"center"} fontSize="medium">{elem.movieName}</Text>
                  </Box>
                  <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                    {elem.ratings}/5  reviews
                  </Box>
                  <Button onClick={() => { handRemove(elem.movieId) }}
                    size='xs' bgColor="yellow.500" variant='outline'>mark unrated
                  </Button>
                </Box>
              </Box>
            )
          })}
      </Grid>
    </>
  )
}

export default RatedMovies;



