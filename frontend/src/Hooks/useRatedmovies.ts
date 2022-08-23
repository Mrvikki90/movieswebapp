import { QueryKey, useQuery, useMutation } from "react-query";

import { getratedMovies, ratedMovies } from "../Api/ratedmovies.api";


const useRatedMoviesHook = () => {



    const { data: ratedMoviesList, refetch: refetchratedMovies, isFetched } = useQuery(
        ['ratedmovielist'] as QueryKey,
        async () => {
            return getratedMovies();
        }, {
        cacheTime: 3000
    }
    );

    const ratedMovieMutation = useMutation(
        (dataa: any) => {
            return ratedMovies(dataa)
        },
        {
            onSuccess: () => {
                return refetchratedMovies();
            }
        }
    )

    return { ratedMoviesList, ratedMovieMutation, isFetched, refetchratedMovies };

}


export default useRatedMoviesHook



