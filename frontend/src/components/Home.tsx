import { Badge, Box, Button, FormControl, Input, Stack, Image, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { moviesList } from "../Api/moviesList.api"
import { moviesData } from "../interfaces/movieslist.interface";

const Home = () => {
    const [item, setItem] = useState<moviesData[]>([]);

    useEffect(() => {
        (async () => {
            const data = await moviesList();
            setItem(data);
        })()

    }, [])

    return (
        <>
            <Stack marginTop={"1rem"} spacing={3}>
                <FormControl display={'flex'} alignItems='center' justifyContent={'center'}>
                    <Input id='search' border="2px" borderRadius="3xl" borderColor="black" type='search' placeholder='Search Movies' w={'80'} />
                </FormControl>
            </Stack>
            <>
                <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {
                    item.map((elem)=>{
                        return (                  
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                            <Image src={elem.ThumbnailImage} alt={"image"} />
                            <Box p='6'>
                                <Box display='flex' alignItems='baseline'>
                                    <Badge borderRadius='full' px='2' colorScheme='teal'>
                                        New
                                    </Badge>
                                    <Box
                                        color='gray.500'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {elem.ReleaseDate} 
                                    </Box>
                                </Box>

                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={1}
                                >
                                    {elem.MoviesName}
                                </Box>

                                <Box>
                                    {elem.MovieDescription}
                                </Box>
                            </Box>
                        </Box>      
                        )})}

                </Grid>
            </></>

    )
}

export default Home