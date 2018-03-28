/* Defines the product entity */
export interface IMusic {
    id: number;
    songName: string;
    album: string;
    tags?: string[];
    releaseDate: string;
    artist: number;
    description: string;
    starRating: number;
    imageUrl: string;
}