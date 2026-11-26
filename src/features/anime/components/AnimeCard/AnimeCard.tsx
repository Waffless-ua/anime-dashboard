import Card from '../../../../shared/components/atoms/Card/Card';
import Badge from '../../../../shared/components/atoms/Badge/Badge';
import { Link } from 'react-router';

import type { Anime } from '../../types/anime.types';

import { getAnimeStatusLabel } from '../../utils/getAnimeStatusLabel';

import './AnimeCard.css';
import type { ReactNode } from "react";
import { getAnimeStatusVariant } from "../../utils/getAnimeStatusVariant.ts";

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
        <Card as="li" variant="muted" hoverable className="anime-card">
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
                    📌 Статус:
                    <Badge variant={getAnimeStatusVariant(status)}>
                        {getAnimeStatusLabel(status)}
                    </Badge>
                </p>

                <p>
                    📺 Тип: {subtype || 'Невідомо'}
                </p>
            </div>
            {children}
        </Card>
    );
}
