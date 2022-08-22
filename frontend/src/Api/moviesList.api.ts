import axios from "axios"

export const getMovies = async () => {
    const result = await axios.get("http://localhost:8080/movies/allmovies");
    console.log(result.data);
    return result.data;
  }




