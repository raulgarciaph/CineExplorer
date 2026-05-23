import { MovieDetail, SearchResponse } from "../types/movie"

const API_URL = 'http://www.omdbapi.com/?apikey=6583f6e7&'

export async function searchMovies(query: string, type?: string, year?: string) {
  let url = API_URL + 's=' + query

  if (type) url += '&type=' + type
  if( year) url += '&y=' + year

  try {
    const response = await fetch(url)
    const data = await response.json() as SearchResponse
    return data.Search
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getMovieDetail(imdbID: string) {
  const url = API_URL + 'i=' + imdbID
  try {
    const response = await fetch(url)
    const data = await response.json() as MovieDetail
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
