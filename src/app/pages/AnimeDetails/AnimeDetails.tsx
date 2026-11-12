import { Link, useParams } from 'react-router';

import AnimeEpisodes from '../../../features/anime/components/AnimeEpisodes/AnimeEpisodes';
import { ANIME_DETAIL_FACTS } from '../../../features/anime/constants/animeDetails.constants';
import { useAnimeDetails } from '../../../features/anime/hooks/useAnimeDetails';
import RequestBoundary from '../../../shared/components/ui/RequestBoundary/RequestBoundary';

import './AnimeDetails.css';

export default function AnimeDetails() {
    const { id } = useParams();

    return <AnimeDetailsContent key={id} id={id} />;
}

interface AnimeDetailsContentProps {
    id: string | undefined;
}

function AnimeDetailsContent({ id }: AnimeDetailsContentProps) {
    const { anime, request } = useAnimeDetails(id);

    return (
        <main className="dashboard-layout anime-details-page">
            <Link to="/">← Повернутися до дашборду</Link>

            <RequestBoundary
                request={request}
                isEmpty={anime === null}
                loadingMessage="Завантаження аніме..."
                errorTitle="Не вдалося відкрити аніме"
                emptyMessage="Аніме не знайдено."
            >
                {anime && (
                    <>
                        <article className="anime-details">
                            {anime.attributes.posterImage?.small && (
                                <img
                                    className="anime-details-poster"
                                    src={anime.attributes.posterImage.small}
                                    alt={anime.attributes.canonicalTitle}
                                />
                            )}

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
                        </article>

                        <AnimeEpisodes animeId={anime.id} />
                    </>
                )}
            </RequestBoundary>
        </main>
    );
}