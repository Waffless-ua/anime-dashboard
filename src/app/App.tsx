import { useTheme } from '../features/theme/hooks/useTheme';
import { useAnime } from '../features/anime/hooks/useAnime';

import ThemeToggle from '../features/theme/ThemeToggle/ThemeToggle';

import AnimeDashboard from '../features/anime/components/AnimeDashboard/AnimeDashboard';
import AnimeList from '../features/anime/components/AnimeList/AnimeList';
import AnimeCard from '../features/anime/components/AnimeCard/AnimeCard';
import AnimeStats from '../features/anime/components/AnimeStats/AnimeStats';

import AnimeSearchFilter from '../features/anime/components/AnimeFilters/AnimeSearchFilter';
import AnimeStatusFilter from '../features/anime/components/AnimeFilters/AnimeStatusFilter';
import AnimeYearFilter from '../features/anime/components/AnimeFilters/AnimeYearFilter';
import AnimeSubtypeFilter from '../features/anime/components/AnimeFilters/AnimeSubtypeFilter';
import AnimeSeasonFilter from '../features/anime/components/AnimeFilters/AnimeSeasonFilter';
import AnimePageSizeFilter from '../features/anime/components/AnimeFilters/AnimePageSizeFilter';

import AnimeSortField from '../features/anime/components/AnimeSorting/AnimeSortField';
import AnimeSortDirection from '../features/anime/components/AnimeSorting/AnimeSortDirection';

import Button from '../shared/components/ui/Button/Button';

import './App.css';

export default function App() {
    const { isDark, toggleTheme } = useTheme();

    const {
        request,
        anime,
        control,
        resetFilters,
        debouncedQuery,
    } = useAnime();

    return (
        <div className="app-theme"
            data-theme={isDark ? 'dark' : 'light'}
        >
            <header className="dashboard-header">
                <div className="dashboard-header-content">
                    <h1>Аніме Дашборд</h1>

                    <div className="dashboard-search">
                        <AnimeSearchFilter control={control} />
                    </div>

                    <ThemeToggle isDark={isDark} onToggle={toggleTheme}/>
                </div>
            </header>

            <div className="dashboard-layout">
                <div className="dashboard-content">
                    <aside className="dashboard-filters">
                        <h2 id="filters-heading">Фільтри</h2>

                        <form className="anime-controls-form"
                            onSubmit={event => event.preventDefault()}
                        >
                            <AnimeStatusFilter control={control} />
                            <AnimeYearFilter control={control} />
                            <AnimeSubtypeFilter control={control} />
                            <AnimeSeasonFilter control={control} />
                            <AnimePageSizeFilter control={control} />

                            <Button variant="outline" onClick={resetFilters}>
                                Скинути фільтри
                            </Button>
                        </form>
                    </aside>

                    <main className="anime-list-container">
                        <div className="anime-sorting-row" role="group">
                            <AnimeSortField control={control} />
                            <AnimeSortDirection control={control} />
                        </div>

                        <AnimeDashboard request={request}
                            isEmpty={anime.length === 0}
                        >
                            <AnimeList>
                                {anime.map(animeItem => (
                                    <AnimeCard
                                        key={animeItem.id}
                                        anime={animeItem}
                                    />
                                ))}
                            </AnimeList>
                        </AnimeDashboard>
                    </main>

                    <aside className="dashboard-sidebar">
                        <AnimeStats filter={debouncedQuery.filter} />
                    </aside>
                </div>
            </div>
        </div>
    );
}