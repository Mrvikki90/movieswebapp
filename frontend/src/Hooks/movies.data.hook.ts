import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMovies } from "../Api/moviesList.api";

const useMoviesData = () => {
    
    const { data : moviessList , isLoading, error} = useQuery(
        ['movies'] as QueryKey,
        getMovies 
    );
    // console.log(moviessList);
    return {moviessList};

    }


export default useMoviesData