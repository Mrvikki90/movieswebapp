import axios from "axios"

import { watchlist } from "../interfaces/WatchList.interface";


export const watchList = async (movies: watchlist) => {
    const token = localStorage.getItem('auth');

    const movie = await axios.post("http://localhost:8080/watchlist/add", movies,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 

    return movie.data;
}


export const getWatchlist =  async () => {
    const token = localStorage.getItem('auth');

    const movies = await axios.get("http://localhost:8080/watchlist/movies",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return movies.data;
} 
