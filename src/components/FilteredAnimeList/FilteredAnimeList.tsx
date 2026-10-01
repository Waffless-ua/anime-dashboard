import { useState } from 'react';
import './FilteredAnimeList.css';

export interface Anime {
    id: string;
    attributes: {
        canonicalTitle: string;
        averageRating: string;
        episodeCount: number;
        status: string;
        posterImage: {
            small: string;
        };
    };
}

interface FilteredAnimeListProps {
    items: Anime[];
}

const statusTranslations: Record<string, string> = {
    finished: 'Завершено',
    current: 'Онгоінг',
    upcoming: 'Анонсовано',
};

export default function FilteredAnimeList({ items }: FilteredAnimeListProps) {
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredAnime = items.filter((anime) => {
        if (statusFilter === 'all') return true;
        return anime.attributes.status === statusFilter;
    });

    return (
        <div className="anime-list-container">
            <div className="filter-wrapper">
                <h3 className="status-filter-title">Статус Аніме:</h3>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="status-dropdown"
                >
                    <option value="all">Всі</option>
                    <option value="finished">Завершені</option>
                    <option value="current">Онгоінг</option>
                    <option value="upcoming">Анонсовані</option>
                </select>
            </div>

            <ul className="anime-grid">
                {filteredAnime.map((anime) => (
                    <li key={anime.id} className="anime-card">
                        <img
                            src={anime.attributes.posterImage.small}
                            alt={anime.attributes.canonicalTitle}
                            className="anime-cover"
                        />
                        <h3 className="anime-title">{anime.attributes.canonicalTitle}</h3>

                        <div className="anime-stats">
                            <p>⭐ Рейтинг: {anime.attributes.averageRating}%</p>
                            <p>🎬 Епізоди: {anime.attributes.episodeCount}</p>
                            <p>📌 Статус: {statusTranslations[anime.attributes.status] || anime.attributes.status}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {filteredAnime.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                    Аніме з таким статусом не знайдено.
                </div>
            )}
        </div>
    );

}