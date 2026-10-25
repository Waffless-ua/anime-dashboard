import './App.css';

import { useTheme } from '../features/theme/hooks/useTheme';
import { useAnime } from '../features/anime/hooks/useAnime';

import ThemeToggle from '../features/theme/ThemeToggle/ThemeToggle';
import AnimeDashboard from '../features/anime/components/AnimeDashboard/AnimeDashboard';
import AnimeList from '../features/anime/components/AnimeList/AnimeList';
import AnimeFiltersForm from '../features/anime/components/AnimeFiltersForm/AnimeFiltersForm';
import AnimeStats from '../features/anime/components/AnimeStats/AnimeStats';

export default function App() {
    const { isDark, toggleTheme } = useTheme();

    const {
        list,
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
                            status={list.status}
                            error={list.error}
                            isEmpty={anime.length === 0}
                            onRetry={list.reload}
                        >
                            <AnimeList animeList={anime} />
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