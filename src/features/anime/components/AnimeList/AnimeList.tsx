import type { Anime } from '../../types/anime.types';
import { getAnimeStatusLabel } from '../../utils/getAnimeStatusLabel';

import './AnimeList.css';

interface AnimeListProps {
    animeList: Anime[];
}

export default function AnimeList({
    animeList,
}: AnimeListProps) {

    return (
        <>
            <ul className="anime-grid">
                {animeList.map(anime => {
                    const {
                        canonicalTitle,
                        averageRating,
                        episodeCount,
                        status,
                        showType,
                        posterImage,
                    } = anime.attributes;

                    return (
                        <li key={anime.id} className="anime-card">
                            {posterImage?.small && (
                                <img
                                    src={posterImage.small}
                                    alt={canonicalTitle}
                                    className="anime-cover"
                                    loading="lazy"
                                />
                            )}

                            <h3 className="anime-title">
                                {canonicalTitle}
                            </h3>

                            <div className="anime-stats">
                                <p>
                                    ⭐ Рейтинг:{' '}
                                    {averageRating != null
                                        ? `${averageRating}%`
                                        : 'Немає даних'}
                                </p>

                                <p>
                                    🎬 Епізоди:{' '}
                                    {episodeCount ?? 'Невідомо'}
                                </p>

                                <p>
                                    📌 Статус:{' '}
                                    {getAnimeStatusLabel(status)}
                                </p>

                                <p>
                                    📺 Тип: {showType || 'Невідомо'}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {animeList.length === 0 && (
                <div className="empty-state">
                    Аніме не знайдено.
                </div>
            )}
        </>
    );
}