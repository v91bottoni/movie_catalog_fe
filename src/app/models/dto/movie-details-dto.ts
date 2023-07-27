import { ActorDTO } from "./actor-dto";
import { CountryDTO } from "./country-dto";
import { DirectorDTO } from "./director-dto";
import { GenreDTO } from "./genre-dto";
import { LanguageDTO } from "./language-dto";
import { MovieDTO } from "./movie-dto";
import { ProductionDTO } from "./production-dto";
import { WriterDTO } from "./writer-dto";

export interface MovieDetailsDTO {
    movieDto: MovieDTO,
    actorDTOs: ActorDTO[],
    countryDTOs: CountryDTO[],
    directrorDTOs: DirectorDTO[],
    genreDTOs: GenreDTO[],
    languageDTOs: LanguageDTO[],
    productionDTOs: ProductionDTO[],
    writerDTOs: WriterDTO[]
}
