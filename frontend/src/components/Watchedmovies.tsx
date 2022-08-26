import {
  Box,
  Grid,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import _ from "lodash";

import useWatchedMovies from "../Hooks/useWatchedMovies";
import { watchlist } from "../interfaces/WatchList.interface";

const WatchedMovies = () => {
  const { watchedMoviesList } = useWatchedMovies();

  return (
    <>
      <SimpleGrid margin={10} columns={[1, 2, 3, 4]} gap={1}>
        {_.map(watchedMoviesList, (elem) => (
          <Box
            maxW="15rem"
            bg="white"
            borderWidth="1px"
            margin="auto"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image maxH="20rem" src={elem.movieImage} alt={"image"} />
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Text textAlign={"center"} fontSize="medium">
                  {elem.movieName}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default WatchedMovies;
