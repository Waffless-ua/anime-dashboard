import { useState } from 'react';

import { useAnimeEpisodes } from '../../hooks/useAnimeEpisodes';
import { EPISODES_PAGE_SIZE } from '../../constants/animeDetails.constants';
import { ANIME_EPISODE_COLUMNS } from '../../constants/animeEpisodeColumns.constants';

import Card from '../../../../shared/components/atoms/Card/Card';
import DataTable from '../../../../shared/components/organisms/DataTable/DataTable';
import RequestBoundary from '../../../../shared/components/molecules/RequestBoundary/RequestBoundary';
import PagePaginator from '../../../../shared/components/molecules/PagePaginator/PagePaginator';

import './AnimeEpisodes.css';
import { FIRST_PAGE } from "../../../../shared/constants/pagination.constants.ts";

interface AnimeEpisodesProps {
    animeId: string;
}


export default function AnimeEpisodes({ animeId }: AnimeEpisodesProps) {
    const [page, setPage] = useState(FIRST_PAGE);

    const {
        episodes,
        totalEpisodes,
        request,
    } = useAnimeEpisodes(animeId, page);

    return (
        <Card
            as="section"
            padding="lg"
            className="anime-episodes"
            aria-label="Список серій"
        >
            <h2>Серії</h2>

            <RequestBoundary
                request={request}
                isEmpty={episodes.length === 0}
                loadingMessage="Завантаження серій..."
                errorTitle="Не вдалося завантажити серії"
                emptyMessage="Інформація про серії відсутня."
            >
                <DataTable
                    data={episodes}
                    columns={ANIME_EPISODE_COLUMNS}
                    getRowKey={episode => episode.id}
                    caption={`Серії — сторінка ${page}`}
                    striped
                />
            </RequestBoundary>

            <PagePaginator
                page={page}
                onChange={setPage}
                totalItems={
                    request.status === 'success'
                        ? totalEpisodes
                        : 0
                }
                pageSize={EPISODES_PAGE_SIZE}
                disabled={request.status !== 'success'}
                label="Сторінки списку серій"
            />
        </Card>
    );
}