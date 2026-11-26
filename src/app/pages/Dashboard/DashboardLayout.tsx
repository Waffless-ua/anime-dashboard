import { NavLink, Outlet } from 'react-router';

import { useAppDispatch } from '../../hooks';
import { resetFilters } from '../../../features/anime/store/animeQuerySlice';

import AnimeStatusFilter from '../../../features/anime/components/AnimeFilters/AnimeStatusFilter';
import AnimeYearFilter from '../../../features/anime/components/AnimeFilters/AnimeYearFilter';
import AnimeSubtypeFilter from '../../../features/anime/components/AnimeFilters/AnimeSubtypeFilter';
import AnimeSeasonFilter from '../../../features/anime/components/AnimeFilters/AnimeSeasonFilter';
import AnimePageSizeFilter from '../../../features/anime/components/AnimeFilters/AnimePageSizeFilter';

import Button from '../../../shared/components/atoms/Button/Button';
import Card from '../../../shared/components/atoms/Card/Card';

import './DashboardLayout.css';

const DASHBOARD_TABS = [
    { path: '/', label: 'Список аніме' },
    { path: '/statistics', label: 'Статистика' },
] as const;

export default function DashboardLayout() {
    const dispatch = useAppDispatch();

    return (
        <div className="dashboard-layout">
            <div className="dashboard-content">
                <Card
                    as="aside"
                    padding="none"
                    className="dashboard-filters"
                >
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
                            onClick={() => dispatch(resetFilters())}
                        >
                            Скинути фільтри
                        </Button>
                    </form>
                </Card>

                <main className="dashboard-main">
                    <nav
                        className="dashboard-tabs"
                        aria-label="Розділи дашборду"
                    >
                        {DASHBOARD_TABS.map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                end
                                className={({ isActive }) =>
                                    `dashboard-tab${isActive
                                        ? ' dashboard-tab--active'
                                        : ''}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <Card
                        padding="none"
                        className="dashboard-tab-content"
                    >
                        <Outlet />
                    </Card>
                </main>
            </div>
        </div>
    );
}