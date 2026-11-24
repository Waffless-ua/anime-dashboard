import { Link } from 'react-router';

import type { Anime } from '../../types/anime.types';

import { getAnimeStatusLabel } from '../../utils/getAnimeStatusLabel';

import './AnimeCard.css';
import type { ReactNode } from "react";

interface AnimeCardProps {
    anime: Anime;
    children?: ReactNode;
}

export default function AnimeCard({ anime, children }: AnimeCardProps) {
    const {
        canonicalTitle,
        averageRating,
        episodeCount,
        status,
        subtype,
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
                <Link to={`/anime/${anime.id}`}>{canonicalTitle}</Link>
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
                    📺 Тип: {subtype || 'Невідомо'}
                </p>
            </div>
            {children}
        </li>
    );
}
