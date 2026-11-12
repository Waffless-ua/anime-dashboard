import { Link } from 'react-router';

export default function NotFound() {
    return (
        <main className="dashboard-layout">
            <h1>Сторінку не знайдено</h1>
            <Link to="/">Повернутися до дашборду</Link>
        </main>
    );
}
