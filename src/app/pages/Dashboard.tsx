import { useAnime } from '../../features/anime/hooks/useAnime';

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
import { useSearchParams } from "react-router";
import { useAnimeFilters } from "../../features/anime/hooks/useAnimeFilters.ts";

export default function Dashboard() {
    const [searchParams, setSearchParams] = useSearchParams();

    const {
        filters,
        debouncedQuery,
        page,
        changePage,
        changeFilter,
        resetFilters,
    } = useAnimeFilters(searchParams, setSearchParams);

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
                            <AnimeStatusFilter
                                value={filters.filter.status}
                                onChange={value => changeFilter('status', value)}
                            />
                            <AnimeYearFilter
                                value={filters.filter.seasonYear}
                                onChange={value => changeFilter('seasonYear', value)}
                            />
                            <AnimeSubtypeFilter
                                value={filters.filter.subtype}
                                onChange={value => changeFilter('subtype', value)}
                            />
                            <AnimeSeasonFilter
                                value={filters.filter.season}
                                onChange={value => changeFilter('season', value)}
                            />
                            <AnimePageSizeFilter
                                value={filters.limit}
                                onChange={value => changeFilter('limit', value)}
                            />

                            <Button variant="outline" onClick={resetFilters}>
                                Скинути фільтри
                            </Button>
                        </form>
                    </aside>

                    <main className="anime-list-container">
                        <AnimeSearchFilter
                            value={filters.filter.text}
                            onChange={value => changeFilter('text', value)}
                        />

                        <div className="anime-sorting-row" role="group">
                            <AnimeSortField
                                value={filters.sort}
                                onChange={value => changeFilter('sort', value)}
                            />
                            <AnimeSortDirection
                                value={filters.direction}
                                onChange={value => changeFilter('direction', value)}
                            />
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
                        <AnimeStats filter={debouncedQuery.filter} />
                    </aside>
                </div>
            </div>
    );
}
