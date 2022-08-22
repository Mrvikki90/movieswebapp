import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRatings, postRatings } from "../Api/ratedmovies.api";



const useRatings = () => {
    
    const { data } = useQuery(
        ['movies'] as QueryKey,
        async () =>{
            return  getRatings();
        }
      );
        

    const rateMovieMutation = useMutation(
        (dataa:any) => {
           return postRatings(dataa.movieId,dataa.ratings)
        }  
    )  

    return {data,rateMovieMutation};



    }


export default useRatings