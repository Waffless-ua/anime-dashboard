import { useAnimeStats } from '../../hooks/useAnimeStats';

import type { AnimeFilterValues } from '../../types/animeFilters.types';

import KpiCard from '../../../../shared/components/molecules/KpiCard/KpiCard';
import Button from '../../../../shared/components/atoms/Button/Button';

import getChangePrefix from '../../../../shared/utils/getChangePrefix';
import getChangeStatus from '../../../../shared/utils/getChangeStatus';

import './AnimeStats.css';

interface AnimeStatsProps {
    filter: AnimeFilterValues;
    isPending: boolean;
}

export default function AnimeStats({
    filter,
    isPending,
}: AnimeStatsProps) {
    const {
        status,
        total,
        topRated,
        mostPopular,
        changes,
        retry,
    } = useAnimeStats(filter, isPending);

    const hasError = status === 'error';

    const topRatedChangeSuffix =
        typeof changes.topRated === 'number' ? ' п.п.' : '';

    return (
        <section className="anime-stats-panel">
            <div className="anime-stats-heading">
                <h2>Статистика</h2>
                <p>Зміни відносно попередньої вибірки</p>
            </div>

            {hasError && (
                <Button variant="outline" onClick={retry}>
                    Спробувати ще раз
                </Button>
            )}

            <div className="kpi-section">
                <KpiCard
                    title="Знайдено аніме"
                    status={status}
                    value={total}
                    change={changes.totalAnime}
                    changePrefix={getChangePrefix(changes.totalAnime)}
                    changeSuffix=" аніме"
                    changeStatus={getChangeStatus(changes.totalAnime)}
                />

                <KpiCard
                    title="Найпопулярніше аніме"
                    status={status}
                    value={mostPopular?.attributes.canonicalTitle}
                    change={changes.mostPopular}
                />

                <KpiCard
                    title="Найвищий рейтинг"
                    status={status}
                    value={topRated?.attributes.canonicalTitle}
                    change={changes.topRated}
                    changePrefix={getChangePrefix(changes.topRated)}
                    changeSuffix={topRatedChangeSuffix}
                    changeStatus={getChangeStatus(changes.topRated)}
                />
            </div>
        </section>
    );
}