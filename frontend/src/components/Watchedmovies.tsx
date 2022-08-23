import { Box, Grid, Image, Text } from "@chakra-ui/react"

import useWatchedMovies from "../Hooks/useWatchedMovies"
import { watchlist } from "../interfaces/WatchList.interface";


const WatchedMovies = () => {


  const { watchedMoviesList } = useWatchedMovies()


  return (
    <>

      <Grid templateColumns='repeat(3, 1fr)' gap={1}>
        {
          watchedMoviesList && watchedMoviesList.map((elem: watchlist, index: string) => {
            return (
              <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
                <Box p='6'>
                  <Box display='flex' alignItems='baseline'>

                    <Text textAlign={"center"} fontSize="medium">{elem.movieName}</Text>

                  </Box>
                </Box>
              </Box>
            )
          })}
      </Grid>



    </>
  )
}

export default WatchedMovies
