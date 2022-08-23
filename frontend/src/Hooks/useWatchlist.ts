import { QueryKey, useMutation, useQuery } from "react-query";
import { getWatchedMovies, watchedMovies } from "../Api/watchedmovies.api";
import { getWatchlist, watchList } from "../Api/watchlist.api";


const useWatchlistMovies = () => {

    const { data: watchlistmovies, refetch: refetchwatchList, isFetched } = useQuery(
        ['watclistmovies'] as QueryKey,
        async () => {
            return getWatchlist()
        }, {
        cacheTime: 3000
    }

    );

    const watchlistMutation = useMutation(
        (dataa: any) => {
            return watchList(dataa)
        },
        {
            onSuccess: () => {
                return refetchwatchList();
            }
        }
    )

    return { watchlistmovies, watchlistMutation, isFetched };



}


export default useWatchlistMovies
