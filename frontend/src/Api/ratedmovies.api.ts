import axios from "axios"

import { watchlist } from "../interfaces/WatchList.interface";

export const ratedMovies = async ( movie : watchlist) => {
    const token = localStorage.getItem('auth');
    const result =  await axios.post("http://localhost:8080/rated/add",movie,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}


export const getratedMovies =  async () => {
    const token = localStorage.getItem('auth');
    const movies = await axios.get("http://localhost:8080/rated/movies",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return movies.data;
} 


export const deleteratedMovies = async (id:number) => {
    const token = localStorage.getItem('auth');
    const movies = await axios.delete(`http://localhost:8080/rated/delete/${id}`,
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return movies.data;
}


export const postRatings = async(movieId : number , ratings : number ) =>{
    const token = localStorage.getItem('auth');
    const result =  await axios.post("http://localhost:8080/ratings/add",{movieId,ratings},
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}

export const getRatings = async () => {
    const token = localStorage.getItem('auth');
    const result =  await axios.get("http://localhost:8080/ratings/movies",
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}

export const deleteRatings = async (movieId : number , ratings : number) => {
    const token = localStorage.getItem('auth');
    const result =  await axios.post("http://localhost:8080/ratings/movies",{movieId,ratings},
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}

export const updateRatings = async (movieId : number , ratings : number) => {
    const token = localStorage.getItem('auth');
    const result =  await axios.patch("http://localhost:8080/ratings/update",{movieId,ratings},
    {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); 
    return result.data;
}





