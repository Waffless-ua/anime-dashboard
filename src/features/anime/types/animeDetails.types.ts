import type { Anime } from './anime.types';

export interface AnimeDetailsData extends Anime {
    details: {
        synopsis: string | null;
        endDate: string | null;
        episodeLength: number | null;
        ageRating: string | null;
        ageRatingGuide: string | null;
    };
}

export interface AnimeEpisode {
    id: string;
    number: number | null;
    title: string | null;
    length: number | null;
    airdate: string | null;
}

export interface AnimeEpisodesPage {
    episodes: AnimeEpisode[];
    hasNextPage: boolean;
}