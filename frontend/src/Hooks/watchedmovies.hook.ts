import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { getWatchedMovies, watchedMovies } from "../Api/watchedmovies.api";


const useWatchedMovies = () => {
    
    const { data : watchedMoviesList, refetch: refetchWatchedMovies } = useQuery(
        ['movies'] as QueryKey,
        async () =>{
            return getWatchedMovies()
        }
      ); 
        
    const watchedMovieMutation = useMutation(
        (dataa:any) => {
           return watchedMovies(dataa.movie)
        },
        {
        onSuccess: () => {
        return refetchWatchedMovies();
        } 
    }  
    )  

    return {watchedMoviesList,watchedMovieMutation};



    }


export default useWatchedMovies