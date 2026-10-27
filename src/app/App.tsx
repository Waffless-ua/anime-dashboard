import './App.css';

import { useTheme } from '../features/theme/hooks/useTheme';
import { useAnime } from '../features/anime/hooks/useAnime';

import ThemeToggle from '../features/theme/ThemeToggle/ThemeToggle';
import AnimeDashboard from '../features/anime/components/AnimeDashboard/AnimeDashboard';
import AnimeList from '../features/anime/components/AnimeList/AnimeList';
import AnimeFiltersForm from '../features/anime/components/AnimeFiltersForm/AnimeFiltersForm';
import AnimeStats from '../features/anime/components/AnimeStats/AnimeStats';
import AnimeCard from "../features/anime/components/AnimeCard/AnimeCard.tsx";

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
        <div
            className="app-theme"
            data-theme={isDark ? 'dark' : 'light'}
        >
            <div className="dashboard-layout">
                <header className="dashboard-header">
                    <h1>Аніме Дашборд</h1>

                    <ThemeToggle
                        isDark={isDark}
                        onToggle={toggleTheme}
                    />
                </header>

                <div className="dashboard-content">
                    <main className="anime-list-container">
                        <AnimeFiltersForm
                            control={control}
                            onReset={resetFilters}
                        />

                        <AnimeDashboard
                            request={request}
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

                    <aside
                        className="dashboard-sidebar"
                        aria-label="Статистика вибірки"
                    >
                        <AnimeStats filter={debouncedQuery.filter} />
                    </aside>
                </div>
            </div>
        </div>
    );
}