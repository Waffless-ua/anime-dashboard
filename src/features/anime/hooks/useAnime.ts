import { fetchAnime, fetchTopRatedAnime, fetchMostPopularAnime } from '../api/animeApi';
import { useAsyncResource } from '../../../shared/hooks/useAsyncResource';

export function useAnime() {
    const list = useAsyncResource(fetchAnime, {
        keepPreviousData: true,
    });

    const topRated = useAsyncResource(fetchTopRatedAnime);
    const mostPopular = useAsyncResource(fetchMostPopularAnime);

    const anime = list.data?.anime ?? [];

    const retry = () => {
        list.reload();
        topRated.reload();
        mostPopular.reload();
    };

    return {
        list,
        topRated,
        mostPopular,
        anime,
        retry,
    };
}
