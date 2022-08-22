import axios from "axios"

export const moviesDetails = async (id:number) =>  {
    const getMovie  = await axios.get(`http://localhost:8080/movies/movies/${id}`);
    // console.log(getMovie.data);
    return getMovie.data;
}
