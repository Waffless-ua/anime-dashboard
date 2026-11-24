import "./Dashboard.css"

import { useAnime } from '../../../features/anime/hooks/useAnime.ts';

import AnimeList from '../../../features/anime/components/AnimeList/AnimeList.tsx';
import AnimeCard from '../../../features/anime/components/AnimeCard/AnimeCard.tsx';
import AnimeStats from '../../../features/anime/components/AnimeStats/AnimeStats.tsx';

import AnimeStatusFilter from '../../../features/anime/components/AnimeFilters/AnimeStatusFilter.tsx';
import AnimeYearFilter from '../../../features/anime/components/AnimeFilters/AnimeYearFilter.tsx';
import AnimeSubtypeFilter from '../../../features/anime/components/AnimeFilters/AnimeSubtypeFilter.tsx';
import AnimeSeasonFilter from '../../../features/anime/components/AnimeFilters/AnimeSeasonFilter.tsx';
import AnimePageSizeFilter from '../../../features/anime/components/AnimeFilters/AnimePageSizeFilter.tsx';

import AnimeSortField from '../../../features/anime/components/AnimeSorting/AnimeSortField.tsx';
import AnimeSortDirection from '../../../features/anime/components/AnimeSorting/AnimeSortDirection.tsx';

import Button from '../../../shared/components/ui/Button/Button.tsx';
import RequestBoundary from '../../../shared/components/ui/RequestBoundary/RequestBoundary.tsx';
import PagePaginator from '../../../shared/components/ui/PagePaginator/PagePaginator.tsx';
import { useAnimeFilters } from "../../../features/anime/hooks/useAnimeFilters.ts";

export default function Dashboard() {
    const {
        debouncedQuery,
        page,
        changePage,
        resetFilters,
    } = useAnimeFilters();

    const { request, anime, totalAnime } = useAnime(debouncedQuery, page);


    return (
        <div className="dashboard-layout">
                <div className="dashboard-content">
                    <aside className="dashboard-filters">
                        <h2 id="filters-heading">Фільтри</h2>

                        <form
                            className="anime-controls-form"
                            onSubmit={event => event.preventDefault()}
                        >
                            <AnimeStatusFilter/>
                            <AnimeYearFilter/>
                            <AnimeSubtypeFilter/>
                            <AnimeSeasonFilter/>
                            <AnimePageSizeFilter/>

                            <Button variant="outline" onClick={resetFilters}>
                                Скинути фільтри
                            </Button>
                        </form>
                    </aside>

                    <main className="anime-list-container">
                        <div className="anime-sorting-row" role="group">
                            <AnimeSortField/>
                            <AnimeSortDirection/>
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
                            onChange={changePage}
                            totalItems={totalAnime}
                            pageSize={debouncedQuery.limit}
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
