import { MovieDetailsDTO } from "./dto/movie-details-dto";

export interface response{
    movieList: MovieDetailsDTO[];
    maxPageNumber: number;
    totalElements: number;
    pageSize: number; 

}