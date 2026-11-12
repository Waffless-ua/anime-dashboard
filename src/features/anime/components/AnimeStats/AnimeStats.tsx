import { useAnimeStats } from '../../hooks/useAnimeStats';
import { useAnimeFilters } from '../../hooks/useAnimeFilters';

import KpiCard from '../../../../shared/components/ui/KpiCard/KpiCard';
import Button from '../../../../shared/components/ui/Button/Button';

import getChangePrefix from '../../../../shared/utils/getChangePrefix';
import getChangeStatus from '../../../../shared/utils/getChangeStatus';

import './AnimeStats.css';

export default function AnimeStats() {
    const { debouncedQuery } = useAnimeFilters();

    const {
        status,
        total,
        topRated,
        mostPopular,
        changes,
        retry,
    } = useAnimeStats(debouncedQuery.filter);

    const hasError = status === 'error';

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
                    changeSuffix={
                        typeof changes.topRated === 'number'
                            ? ' п.п.'
                            : ''
                    }
                    changeStatus={getChangeStatus(changes.topRated)}
                />
            </div>
        </section>
    );
}