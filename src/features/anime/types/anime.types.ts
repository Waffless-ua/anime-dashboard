export interface Anime {
    id: string;
    type: 'anime';

    attributes: {
        canonicalTitle: string;
        averageRating: string | null;
        episodeCount: number | null;
        status: string;
        showType: string;
        popularityRank: number | null;
        ratingRank: number | null;
        posterImage: {
            small: string;
        } | null;
    };
}
