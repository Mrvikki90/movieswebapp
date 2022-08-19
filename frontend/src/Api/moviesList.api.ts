import axios from "axios"

import { moviesData } from "../interfaces/movieslist.interface";

export const  moviesList = async() =>  {
    const result: { data: moviesData[] } = await axios.get("http://localhost:8080/movies/allmovies");
    return result.data;

}


