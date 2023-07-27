import { Type } from "../type";

export interface MovieDTO {
    imdbid: string,
    title: string,
    year: string,
    rated: string,
    released: Date,
    runtime: string,
    plot: string,
    awards: string,
    poster: string,
    votesNumber: number,
    dvd: Date,
    website: string,
    totalseasons: number,
    boxoffice: string,
    type: Type;
    rating: number;
}
