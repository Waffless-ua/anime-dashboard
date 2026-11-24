import { Link, Outlet } from 'react-router';

import { useTheme } from '../../features/theme/hooks/useTheme.ts';
import ThemeToggle from '../../features/theme/components/ThemeToggle/ThemeToggle.tsx';

import './Layout.css';
import AnimeSearchFilter from "../../features/anime/components/AnimeFilters/AnimeSearchFilter.tsx";

export default function Layout() {
    const { isDark } = useTheme();

    return (
        <div
            className="app-theme layout"
            data-theme={isDark ? 'dark' : 'light'}
        >
            <header className="layout-header">
                <div className="layout-header-content">
                    <h1>
                        <Link to="/">Аніме Дашборд</Link>
                    </h1>

                    <AnimeSearchFilter/>
                    <ThemeToggle />
                </div>
            </header>

            <Outlet />
        </div>
    );
}