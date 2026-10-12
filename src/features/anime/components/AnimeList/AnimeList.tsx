import type { Anime } from '../../types/anime.types';
import './AnimeList.css';

interface AnimeListProps {
    animeList: Anime[];
    limit?: number;
}

export default function AnimeList({ animeList, limit }: AnimeListProps) {
    const visibleAnime = limit === undefined ? animeList : animeList.slice(0, Math.max(0, limit));

    return (
        <>
            <ul className="anime-grid">
                {visibleAnime.map((anime) => (
                    <li key={anime.id} className="anime-card">
                        {anime.attributes.posterImage?.small && (
                            <img
                                src={anime.attributes.posterImage.small}
                                alt={anime.attributes.canonicalTitle}
                                className="anime-cover"
                                loading="lazy"
                            />
                        )}

                        <h3 className="anime-title">
                            {anime.attributes.canonicalTitle}
                        </h3>

                        <div className="anime-stats">
                            <p>
                                ⭐ Рейтинг:{' '}
                                {anime.attributes.averageRating != null
                                    ? `${anime.attributes.averageRating}%`
                                    : 'Немає даних'}
                            </p>

                            <p>
                                🎬 Епізоди:{' '}
                                {anime.attributes.episodeCount ?? 'Невідомо'}
                            </p>

                            <p>
                                📌 Статус: {anime.attributes.status || 'Невідомо'}
                            </p>

                            <p>
                                📺 Тип: {anime.attributes.showType || 'Невідомо'}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {animeList.length === 0 && (
                <div className="empty-state">
                    Аніме не знайдено.
                </div>
            )}
        </>
    );
}