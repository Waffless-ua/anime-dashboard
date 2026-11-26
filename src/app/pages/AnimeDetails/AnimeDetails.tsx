import Card from '../../../shared/components/atoms/Card/Card';
import { useNavigate, useParams } from 'react-router';

import AnimeEpisodes from '../../../features/anime/components/AnimeEpisodes/AnimeEpisodes';
import { ANIME_DETAIL_FACTS } from '../../../features/anime/constants/animeDetails.constants';
import { useAnimeDetails } from '../../../features/anime/hooks/useAnimeDetails';
import RequestBoundary from '../../../shared/components/molecules/RequestBoundary/RequestBoundary';

import './AnimeDetails.css';
import Button from "../../../shared/components/atoms/Button/Button.tsx";
import FavoriteButton from "../../../features/favorites/components/FavoriteButton/FavoriteButton.tsx";

export default function AnimeDetails() {
    const { id } = useParams();
    const { anime, request } = useAnimeDetails(id);
    const navigate = useNavigate();

    return (
        <main className="dashboard-layout anime-details-page">
            <Button
                variant="secondary"
                className="anime-details-back"
                onClick={() => navigate(-1)}
            >
                <span aria-hidden="true">←</span>
                Назад
            </Button>

            <RequestBoundary
                request={request}
                isEmpty={anime === null}
                loadingMessage="Завантаження аніме..."
                errorTitle="Не вдалося відкрити аніме"
                emptyMessage="Аніме не знайдено."
            >
                {anime && (
                    <>
                        <Card as="article" padding="lg" className="anime-details">
                            <div className="anime-details-media">
                                {anime.attributes.posterImage?.small && (
                                    <img
                                        className="anime-details-poster"
                                        src={anime.attributes.posterImage.small}
                                        alt={anime.attributes.canonicalTitle}
                                    />
                                )}

                                <FavoriteButton animeId={anime.id} />
                            </div>

                            <div className="anime-details-content">
                                <h1>{anime.attributes.canonicalTitle}</h1>

                                <dl className="anime-details-facts">
                                    {ANIME_DETAIL_FACTS.map(({ label, getValue }) => (
                                        <div key={label}>
                                            <dt>{label}</dt>
                                            <dd>{getValue(anime)}</dd>
                                        </div>
                                    ))}
                                </dl>

                                <section className="anime-details-description">
                                    <h2>Опис</h2>
                                    <p>{anime.details.synopsis ?? 'Опис відсутній.'}</p>
                                </section>
                            </div>
                        </Card>

                        <AnimeEpisodes animeId={anime.id} />
                    </>
                )}
            </RequestBoundary>
        </main>
    );
}
