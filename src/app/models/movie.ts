import { ActorDTO } from "./dto/actor-dto";
import { CountryDTO } from "./dto/country-dto";
import { DirectorDTO } from "./dto/director-dto";
import { GenreDTO } from "./dto/genre-dto";
import { LanguageDTO } from "./dto/language-dto";
import { ProductionDTO } from "./dto/production-dto";
import { TypeDTO } from "./dto/type-dto";
import { WriterDTO } from "./dto/writer-dto";
import { Type } from "./type";

export interface Movie {
    imdbid: string,
    title: string,
    year: string,
    rated: string,
    released: Date,
    runtime: string,
    genre: GenreDTO[],
    director: DirectorDTO[],
    writer:WriterDTO[],
    actors: ActorDTO[],
    plot: string,
    boxoffice: string,
    language: LanguageDTO[],
    country: CountryDTO[],
    awards: string,
    poster: string,
    voteNumber: number,
    rating: number,
    type: TypeDTO,
    dvd: Date,
    production: ProductionDTO[],
    website: string,
    totalseasons: number
}
export class Movie {}
