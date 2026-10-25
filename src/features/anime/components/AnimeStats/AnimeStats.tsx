import { useAnimeStats } from '../../hooks/useAnimeStats';
import type { AnimeQuery } from '../../types/animeApi.types';

import KpiCard from '../../../../shared/components/ui/KpiCard/KpiCard';
import Button from '../../../../shared/components/ui/Button/Button';

import './AnimeStats.css';

interface AnimeStatsProps {
    filter: AnimeQuery['filter'];
}

function getChangeStatus(
    change: string | number | null
): 'positive' | 'negative' | 'neutral' {
    if (typeof change !== 'number' || change === 0) {
        return 'neutral';
    }

    return change > 0 ? 'positive' : 'negative';
}

function getChangePrefix(change: string | number | null): string {
    return typeof change === 'number' && change > 0 ? '+' : '';
}

export default function AnimeStats({ filter }: AnimeStatsProps) {
    const {
        total,
        topRated,
        mostPopular,
        changes,
        retry,
    } = useAnimeStats(filter);

    const hasError = total.status === 'error';

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
                    status={total.status}
                    value={total.data}
                    change={changes.totalAnime}
                    changePrefix={getChangePrefix(changes.totalAnime)}
                    changeSuffix=" аніме"
                    changeStatus={getChangeStatus(changes.totalAnime)}
                />

                <KpiCard
                    title="Найпопулярніше аніме"
                    status={mostPopular.status}
                    value={mostPopular.data?.attributes.canonicalTitle}
                    change={changes.mostPopular}
                />

                <KpiCard
                    title="Найвищий рейтинг"
                    status={topRated.status}
                    value={topRated.data?.attributes.canonicalTitle}
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