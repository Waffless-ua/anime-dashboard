import { useState } from 'react';
import { useAnimeEpisodes } from '../../hooks/useAnimeEpisodes';

import RequestBoundary from '../../../../shared/components/ui/RequestBoundary/RequestBoundary';
import PagePaginator from "../../../../shared/components/ui/PagePaginator/PagePaginator.tsx";

import './AnimeEpisodes.css';
import { EPISODES_PAGE_SIZE } from "../../constants/animeDetails.constants.ts";

interface AnimeEpisodesProps {
    animeId: string;
}

const FIRST_PAGE = 1

export default function AnimeEpisodes({ animeId }: AnimeEpisodesProps) {
    const [page, setPage] = useState(FIRST_PAGE);

    const {
        episodes,
        totalEpisodes,
        request,
    } = useAnimeEpisodes(animeId, page);

    return (
        <section className="anime-episodes" aria-label="Список серій">
            <h2>Серії</h2>

            <RequestBoundary
                request={request}
                isEmpty={episodes.length === 0}
                loadingMessage="Завантаження серій..."
                errorTitle="Не вдалося завантажити серії"
                emptyMessage="Інформація про серії відсутня."
            >
                <div className="anime-episodes-table-wrapper">
                    <table className="anime-episodes-table">
                        <caption className="anime-episodes-caption">
                            Серії — сторінка {page}
                        </caption>

                        <thead>
                        <tr>
                            <th scope="col">№</th>
                            <th scope="col">Назва</th>
                            <th scope="col">Тривалість</th>
                            <th scope="col">Дата виходу</th>
                        </tr>
                        </thead>

                        <tbody>
                        {episodes.map(episode => (
                            <tr key={episode.id}>
                                <td>{episode.number ?? '—'}</td>

                                <td>
                                    {episode.title ?? 'Назва відсутня'}
                                </td>

                                <td>
                                    {episode.length !== null
                                        ? `${episode.length} хв`
                                        : 'Немає даних'}
                                </td>

                                <td>
                                    {episode.airdate ?? 'Немає даних'}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </RequestBoundary>

            <PagePaginator
                page={page}
                onChange={setPage}
                totalItems={request.status === 'success' ? totalEpisodes : 0}
                pageSize={EPISODES_PAGE_SIZE}
                label="Сторінки списку серій"
            />
        </section>
    );
}
