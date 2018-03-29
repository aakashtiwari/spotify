/* Defines the product entity */
export interface IMusic {
    id: number;
    name: string;
    album: string;
    tags?: string[];
    release_date: string;
    artist: number;
    description: string;
    star_rating: number;
    imageUrl: string;
}