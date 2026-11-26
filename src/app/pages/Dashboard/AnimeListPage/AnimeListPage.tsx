import { useAnime } from '../../../../features/anime/hooks/useAnime';
import { useAnimeFilters } from '../../../../features/anime/hooks/useAnimeFilters';

import AnimeList from '../../../../features/anime/components/AnimeList/AnimeList';
import AnimeCard from '../../../../features/anime/components/AnimeCard/AnimeCard';
import AnimeSortField from '../../../../features/anime/components/AnimeSorting/AnimeSortField';
import AnimeSortDirection from '../../../../features/anime/components/AnimeSorting/AnimeSortDirection';

import FavoriteButton from '../../../../features/favorites/components/FavoriteButton/FavoriteButton';

import RequestBoundary from '../../../../shared/components/molecules/RequestBoundary/RequestBoundary';
import PagePaginator from '../../../../shared/components/molecules/PagePaginator/PagePaginator';

import './AnimeListPage.css';

export default function AnimeListPage() {
    const {
        debouncedQuery,
        page,
        isPending,
        changePage,
    } = useAnimeFilters();

    const { request, anime, totalAnime } = useAnime(
        debouncedQuery,
        page,
        isPending
    );

    return (
        <section className="anime-list-page">
            <div
                className="anime-sorting-row"
                role="group"
                aria-label="Сортування аніме"
            >
                <AnimeSortField />
                <AnimeSortDirection />
            </div>

            <RequestBoundary
                request={request}
                isEmpty={anime.length === 0}
                loadingMessage="Завантаження аніме..."
                errorTitle="Не вдалося завантажити аніме"
                emptyMessage="Аніме не знайдено."
            >
                <AnimeList>
                    {anime.map(animeItem => (
                        <AnimeCard
                            key={animeItem.id}
                            anime={animeItem}
                        >
                            <FavoriteButton animeId={animeItem.id} />
                        </AnimeCard>
                    ))}
                </AnimeList>
            </RequestBoundary>

            <PagePaginator
                page={page}
                onChange={changePage}
                totalItems={totalAnime}
                pageSize={debouncedQuery.limit}
                disabled={isPending || request.status !== 'success'}
                label="Сторінки списку аніме"
            />
        </section>
    );
}