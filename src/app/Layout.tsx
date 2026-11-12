import { Link, Outlet } from 'react-router';

import { useTheme } from '../features/theme/hooks/useTheme';
import ThemeToggle from '../features/theme/components/ThemeToggle/ThemeToggle';

export default function Layout() {
    const { isDark } = useTheme();

    return (
        <div
            className="app-theme"
            data-theme={isDark ? 'dark' : 'light'}
        >
            <header className="dashboard-header">
                <div className="dashboard-header-content">
                    <h1>
                        <Link to="/">Аніме Дашборд</Link>
                    </h1>

                    <ThemeToggle />
                </div>
            </header>

            <Outlet />
        </div>
    );
}