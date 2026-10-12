import './App.css';
import { useTheme } from '../features/theme/hooks/useTheme';
import ThemeToggle from '../features/theme/ThemeToggle/ThemeToggle';
import AnimeDashboard from '../features/anime/components/AnimeDashboard/AnimeDashboard';
import FilteredAnimeList from '../features/anime/components/FilteredAnimeList/FilteredAnimeList';
import SortedAnimeList from '../features/anime/components/SortedAnimeList/SortedAnimeList';
import AnimeList from '../features/anime/components/AnimeList/AnimeList';
import KpiCard from '../shared/components/ui/KpiCard/KpiCard';
import Counter from '../shared/components/ui/Counter/Counter';
import { useAnime } from "../features/anime/hooks/useAnime.ts";

export default function App() {
    const { isDark, toggleTheme } = useTheme();
    const {list, topRated, mostPopular, anime, retry } = useAnime();

    return (
        <div className="app-theme" data-theme={isDark ? 'dark' : 'light'}>
            <div className="dashboard-layout">
                <header className="dashboard-header">
                    <h1>Аніме Дашборд</h1>
                    <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                </header>

                <AnimeDashboard
                    status={list.status}
                    error={list.error}
                    isEmpty={anime.length === 0}
                    onRetry={retry}
                >
                    <div className="kpi-section">
                        <KpiCard
                            title="Аніме в базі"
                            value={list.data?.totalAnime}
                            change="12"
                            changePrefix="+"
                            changeSuffix=" аніме в базі"
                            changeStatus={"positive"}
                        />

                        <KpiCard
                            title="Найпопулярніше аніме"
                            status={mostPopular.status}
                            value={mostPopular.data?.attributes.canonicalTitle}
                            change="28 в улюблених"
                            changePrefix="+"
                            changeStatus={"positive"}
                        />

                        <KpiCard
                            title="Аніме з найвищим рейтингом"
                            status={topRated.status}
                            value={topRated.data?.attributes.canonicalTitle}
                            change={topRated.data?.attributes.averageRating}
                            changePrefix="Рейтинг: "
                            changeSuffix="% (-0.76%)"
                            changeStatus={"negative"}
                        />

                        <Counter
                            label="Переглянуто серій в середньому за тиждень"
                            step={1}
                            initial={0}
                        />
                    </div>

                    <FilteredAnimeList
                        items={anime}
                        getFilterValue={item => item.attributes.status}
                        label="Статус аніме:"
                    >
                        {filteredAnime => (
                            <SortedAnimeList items={filteredAnime}>
                                {sortedAnime => (
                                    <AnimeList
                                        animeList={sortedAnime}
                                        limit={20}
                                    />
                                )}
                            </SortedAnimeList>
                        )}
                    </FilteredAnimeList>
                </AnimeDashboard>
            </div>
        </div>
    );
}
