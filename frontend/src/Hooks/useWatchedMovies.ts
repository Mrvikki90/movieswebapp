import { QueryKey, useMutation, useQuery } from "react-query";

import { getWatchedMovies, watchedMovies } from "../Api/watchedmovies.api";


const useWatchedMovies = () => {

    const { data: watchedMoviesList, refetch: refetchWatchedMovies, isFetched } = useQuery(
        ['movies'] as QueryKey,
        async () => {
            return getWatchedMovies()
        }, {
        cacheTime: 3000
    }

    );

    const watchedMovieMutation = useMutation(
        (dataa: any) => {
            return watchedMovies(dataa)
        },
        {
            onSuccess: () => {
                return refetchWatchedMovies();
            }
        }
    )

    return { watchedMoviesList, watchedMovieMutation, isFetched };



}


export default useWatchedMovies
