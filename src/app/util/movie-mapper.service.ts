import { Injectable } from '@angular/core';
import { MovieDTO } from '../models/dto/movie-dto';
import { Movie } from '../models/movie';
import { MovieDetailsDTO } from '../models/dto/movie-details-dto';

@Injectable({
  providedIn: 'root'
})
export class MovieMapperService {

  constructor() { }

  movieDetailsDTOtoMovie(MovieDetailsDTO: MovieDetailsDTO):Movie{

    let movie:Movie = {
      imdbid : MovieDetailsDTO.movieDto.imdbid,
      title : MovieDetailsDTO.movieDto.title,
      year : MovieDetailsDTO.movieDto.year,
      rated : MovieDetailsDTO.movieDto.rated,
      released : MovieDetailsDTO.movieDto.released,
      runtime : MovieDetailsDTO.movieDto.runtime,
      plot : MovieDetailsDTO.movieDto.plot,
      awards : MovieDetailsDTO.movieDto.awards,
      poster : MovieDetailsDTO.movieDto.poster,
      voteNumber : MovieDetailsDTO.movieDto.votesNumber,
      dvd : MovieDetailsDTO.movieDto.dvd,
      website : MovieDetailsDTO.movieDto.website,
      totalseasons : MovieDetailsDTO.movieDto.totalseasons,
      boxoffice : MovieDetailsDTO.movieDto.boxoffice,
      rating : MovieDetailsDTO.movieDto.rating,
      type : MovieDetailsDTO.movieDto.type,
      actors : MovieDetailsDTO.actorDTOs,
      director : MovieDetailsDTO.directrorDTOs,
      genre : MovieDetailsDTO.genreDTOs,
      language : MovieDetailsDTO.languageDTOs,
      production : MovieDetailsDTO.productionDTOs,
      writer : MovieDetailsDTO.writerDTOs,
      country : MovieDetailsDTO.countryDTOs,
    }

    return movie;
  }

  movieToMovieDetailsDTO(movie : Movie):MovieDetailsDTO{

    let movieDetailsDTO:MovieDetailsDTO = {
      movieDto : {
        imdbid : movie.imdbid,
        title : movie.title,
        year : movie.year,
        rated : movie.rated,
        released : movie.released,
        runtime : movie.runtime,
        plot : movie.plot,
        awards : movie.awards,
        poster : movie.poster,
        votesNumber : movie.voteNumber,
        dvd : movie.dvd,
        website : movie.website,
        totalseasons : movie.totalseasons,
        boxoffice : movie.boxoffice,
        rating : movie.rating,
        type : movie.type,
      },
      actorDTOs : movie.actors,
      directrorDTOs : movie.director,
      genreDTOs : movie.genre,
      languageDTOs : movie.language,
      productionDTOs : movie.production,
      writerDTOs : movie.writer,
      countryDTOs : movie.country,
    }

    return movieDetailsDTO;
  }

}
