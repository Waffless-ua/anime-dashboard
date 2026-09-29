import './App.css';
import FilteredAnimeList from '../components/FilteredAnimeList/FilteredAnimeList';
import KpiCard from '../components/KpiCard/KpiCard';
import ThemeToggle from "../components/ThemeToggle/ThemeToggle.tsx";
import { mockAnimeList, mockStats } from '../api/mockAnimeData';
import Counter from "../components/Counter/Counter.tsx";

function App() {
    return (
        <div className="dashboard-layout">
            <header className="dashboard-header">
                <h1>Аніме Дашборд</h1>

                <ThemeToggle />
            </header>

            <div className="kpi-section">
                <KpiCard
                    title="Всього аніме в базі"
                    value={mockStats.totalAnime}
                    change="+120 за місяць"
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
            </div>

            <FilteredAnimeList items={mockAnimeList} />


            <Counter />
        </div>
    );
}

export default App;