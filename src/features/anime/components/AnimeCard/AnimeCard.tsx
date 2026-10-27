import type { Anime } from '../../types/anime.types';

import { getAnimeStatusLabel } from '../../utils/getAnimeStatusLabel';

import './AnimeCard.css';

interface AnimeCardProps {
    anime: Anime;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
    const {
        canonicalTitle,
        averageRating,
        episodeCount,
        status,
        showType,
        posterImage,
    } = anime.attributes;

    return (
        <li className="anime-card">
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
                    ⭐ Рейтинг: {averageRating != null
                    ? `${averageRating}%`
                    : 'Немає даних'}
                </p>

                <p>
                    🎬 Епізоди: {episodeCount ?? 'Невідомо'}
                </p>

                <p>
                    📌 Статус: {getAnimeStatusLabel(status)}
                </p>

                <p>
                    📺 Тип: {showType || 'Невідомо'}
                </p>
            </div>
        </li>
    );
}