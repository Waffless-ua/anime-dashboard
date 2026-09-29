import { useState } from 'react';
import './FilteredAnimeList.css';
import Button from "../../shared/components/ui/Button/Button.tsx";
import FlexRow from "../../shared/components/ui/FlexRow/FlexRow.tsx";

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
            <div>
                <h3 className="status-filter-title">Статус Аніме</h3>
                <FlexRow gap="0.5rem" margin="0 0 1rem 0">

                    <Button
                        variant={statusFilter === 'all' ? 'primary' : 'tertiary'}
                        onClick={() => setStatusFilter('all')}
                    >
                        Всі
                    </Button>

                    <Button
                        variant={statusFilter === 'finished' ? 'primary' : 'tertiary'}
                        onClick={() => setStatusFilter('finished')}
                    >
                        Завершені
                    </Button>

                    <Button
                        variant={statusFilter === 'current' ? 'primary' : 'tertiary'}
                        onClick={() => setStatusFilter('current')}
                    >
                        Онгоінг
                    </Button>

                    <Button
                        variant={statusFilter === 'upcoming' ? 'primary' : 'tertiary'}
                        onClick={() => setStatusFilter('upcoming')}
                    >
                        Анонсовані
                    </Button>
                </FlexRow>
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