export interface Anime {
    id: string;
    attributes: {
        canonicalTitle: string;
        averageRating: string;
        episodeCount: number;
        status: string;
        posterImage: {
            small: string;
        };
    };
}