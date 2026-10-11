import './App.css';
import FilteredAnimeList from '../features/anime/components/FilteredAnimeList/FilteredAnimeList';
import KpiCard from '../shared/components/ui/KpiCard/KpiCard';
import ThemeToggle from "../features/theme/ThemeToggle/ThemeToggle.tsx";
import { mockAnimeList, mockStats } from '../features/anime/mock/mockAnimeData.ts';
import Counter from "../shared/components/ui/Counter/Counter.tsx";
import {useTheme} from "../features/theme/hooks/useTheme.ts";

function App() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <div className="app-theme" data-theme={isDark ? 'dark' : 'light'}>
            <div className="dashboard-layout">
                <header className="dashboard-header">
                    <h1>Аніме Дашборд</h1>

                    <ThemeToggle
                        isDark={isDark}
                        onToggle={toggleTheme}
                    />
                </header>

                <div className="kpi-section">
                    <KpiCard
                        title="Всього аніме в базі"
                        value={mockStats.totalAnime}
                        change="+120"
                        isPositive={true}
                    />

                    <KpiCard
                        title="Топ в тренді"
                        value={mockStats.topTrending}
                    />

                    <KpiCard
                        title="Середній рейтинг"
                        value={mockStats.averageScore}
                        change="-1.2%"
                        isPositive={false}
                    />

                    <Counter
                        label="Переглянутих аніме"
                        step={1}
                        initial={0}
                    />
                </div>

                <FilteredAnimeList items={mockAnimeList} />
            </div>
        </div>
    );
}

export default App;