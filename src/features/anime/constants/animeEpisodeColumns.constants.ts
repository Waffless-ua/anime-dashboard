import type { TableColumn } from '../../../shared/components/organisms/DataTable/DataTable';
import type { AnimeEpisode } from '../types/animeDetails.types';

export const ANIME_EPISODE_COLUMNS: readonly TableColumn<AnimeEpisode>[] = [
    {
        id: 'number',
        header: '№',
        render: episode => episode.number ?? '—',
        nowrap: true,
    },
    {
        id: 'title',
        header: 'Назва',
        render: episode => episode.title ?? 'Назва відсутня',
    },
    {
        id: 'length',
        header: 'Тривалість',
        render: episode => (
            episode.length !== null
                ? `${episode.length} хв`
                : 'Немає даних'
        ),
        nowrap: true,
    },
    {
        id: 'airdate',
        header: 'Дата виходу',
        render: episode => episode.airdate ?? 'Немає даних',
        nowrap: true,
    },
];