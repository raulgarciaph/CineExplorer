export interface Movie {
  imdbID: string,
  Title: string,
  Year: string,
  Type: string,
  Poster: string
}

export interface MovieDetail extends Movie {
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Runtime: string
  Genre: string
  Ratings: { Source: string, Value: string }[]
}

export interface SearchResponse {
  Search: Movie[],
  totalResults: string,
  Response: string
}