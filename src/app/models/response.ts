import { Movie } from "./movie";

export interface response{
    movieList: Movie[];
    maxPageNumber: number;
}