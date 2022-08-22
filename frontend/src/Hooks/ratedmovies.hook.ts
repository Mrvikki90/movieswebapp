import { QueryKey, useQuery } from "@tanstack/react-query";
import { getMovies } from "../Api/moviesList.api";
import { getratedMovies } from "../Api/ratedmovies.api";


const useRatedMoviesHook = () => {
    
    const { data } = useQuery(
        ['movies'] as QueryKey,
        async () => {
        await getratedMovies();
        }
    );
    
    return {data};

    }


export default useRatedMoviesHook