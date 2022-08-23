import { QueryKey, useQuery } from "react-query";


const useMoviesData = () => {
    
    const { data : moviessList , isLoading, error} = useQuery(
        ['movies'] as QueryKey,
    );
    return {moviessList};

    }


export default useMoviesData