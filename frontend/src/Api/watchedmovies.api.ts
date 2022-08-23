import axios from "axios"

import { watchlist } from "../interfaces/WatchList.interface";

export const watchedMovies = async ( movie : watchlist) => {
    const token = localStorage.getItem('auth');
    const result =  await axios.post("http://localhost:8080/watchedlist/add",movie,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}


export const getWatchedMovies =  async () => {
    const token = localStorage.getItem('auth');
    const movies = await axios.get("http://localhost:8080/watchedlist/moviesallmovies",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return movies.data;
} 


export const deleteWatchedMovies = async (id:number) => {
    const token = localStorage.getItem('auth');
    const movies = await axios.delete(`http://localhost:8080/watchedlist/delete/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return movies.data;
}   
