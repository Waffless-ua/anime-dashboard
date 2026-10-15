export interface AnimeKpiSnapshot {
    totalAnime: number;
    mostPopularId: string | null;
    topRatedId: string | null;
    topRatedRating: number | null;
    savedAt: string;
}

export interface AnimeKpiChanges {
    totalAnime: number | null;
    mostPopular: string | null;
    topRated: number | string | null;
}