import { Box, Button, Grid,Image,Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'


import { deleteratedMovies, deleteRatings, getratedMovies } from '../Api/ratedmovies.api'
import useRatings from '../Hooks/ratings.hook'
import { watchlist } from '../interfaces/watchlist.interface'


const Rratedmovies = () => {


    useEffect(()=>{
        getmovie();
    },[])
    
    const [ratedMovies , setratedMovies] = useState<any>();
    const[ratings, setRatings] = useState<any>();

    const { data } = useRatings();
    console.log(data);


    const getmovie = async () => {
        const data = await getratedMovies();
        setratedMovies(data);
      }
    
      const handelRemove = async (id:number) => {
        deleteratedMovies(id)
      }

  return (
<>

 <Grid templateColumns='repeat(3, 1fr)' gap={1}>
        {
          ratedMovies && ratedMovies.map((elem: watchlist, index: string) => {
            return (
              <Box maxW='15rem' bg="white" borderWidth='1px' margin="auto" borderRadius='lg' overflow='hidden' key={index}>
                <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
                <Box p='6'>
                  <Box display='flex' alignItems='baseline'>   
                    <Text textAlign={"center"} fontSize="medium">{elem.movieName}</Text>
                  </Box>
                  <Box display="flex" justifyContent={"space-between"}>
                    <Button onClick={()=>{handelRemove(elem.movieId)}}
                      size='xs' bgColor="yellow.500" variant='outline' >Mark as Unrated</Button >
                  </Box>
                </Box>
              </Box>
            )
          })}
      </Grid>



</>
  )
}

export default Rratedmovies;