export interface Anime {
    id: string;
    type: 'anime';

    attributes: {
        canonicalTitle: string;
        averageRating: string | null;
        episodeCount: number | null;
        status: string | null;
        showType: string | null;
        popularityRank: number | null;
        ratingRank: number | null;
        startDate: string | null;
        createdAt: string;

        posterImage: {
            small?: string;
        } | null;
    };
}