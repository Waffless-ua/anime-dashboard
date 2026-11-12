import { useAnime } from '../../features/anime/hooks/useAnime';
import { useAnimeFilters } from '../../features/anime/hooks/useAnimeFilters';

import AnimeList from '../../features/anime/components/AnimeList/AnimeList';
import AnimeCard from '../../features/anime/components/AnimeCard/AnimeCard';
import AnimeStats from '../../features/anime/components/AnimeStats/AnimeStats';

import AnimeSearchFilter from '../../features/anime/components/AnimeFilters/AnimeSearchFilter';
import AnimeStatusFilter from '../../features/anime/components/AnimeFilters/AnimeStatusFilter';
import AnimeYearFilter from '../../features/anime/components/AnimeFilters/AnimeYearFilter';
import AnimeSubtypeFilter from '../../features/anime/components/AnimeFilters/AnimeSubtypeFilter';
import AnimeSeasonFilter from '../../features/anime/components/AnimeFilters/AnimeSeasonFilter';
import AnimePageSizeFilter from '../../features/anime/components/AnimeFilters/AnimePageSizeFilter';

import AnimeSortField from '../../features/anime/components/AnimeSorting/AnimeSortField';
import AnimeSortDirection from '../../features/anime/components/AnimeSorting/AnimeSortDirection';

import Button from '../../shared/components/ui/Button/Button';
import RequestBoundary from '../../shared/components/ui/RequestBoundary/RequestBoundary';
import PagePaginator from '../../shared/components/ui/PagePaginator/PagePaginator';

export default function Dashboard() {
    const {
        request,
        anime,
        hasNextPage,
    } = useAnime();

    const {
        resetFilters,
        page,
        changePage,
    } = useAnimeFilters();

    return (
        <div className="dashboard-layout">
            <div className="dashboard-content">
                <aside className="dashboard-filters">
                    <h2 id="filters-heading">Фільтри</h2>

                    <form
                        className="anime-controls-form"
                        onSubmit={event => event.preventDefault()}
                    >
                        <AnimeStatusFilter />
                        <AnimeYearFilter />
                        <AnimeSubtypeFilter />
                        <AnimeSeasonFilter />
                        <AnimePageSizeFilter />

                        <Button
                            variant="outline"
                            onClick={resetFilters}
                        >
                            Скинути фільтри
                        </Button>
                    </form>
                </aside>

                <main className="anime-list-container">
                    <AnimeSearchFilter />

                    <div className="anime-sorting-row" role="group">
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
                                />
                            ))}
                        </AnimeList>
                    </RequestBoundary>

                    <PagePaginator
                        page={page}
                        hasNextPage={hasNextPage}
                        onChange={changePage}
                        label="Сторінки списку аніме"
                    />
                </main>

                <aside className="dashboard-sidebar">
                    <AnimeStats />
                </aside>
            </div>
        </div>
    );
}