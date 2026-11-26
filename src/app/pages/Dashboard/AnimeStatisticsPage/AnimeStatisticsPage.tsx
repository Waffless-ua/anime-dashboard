import { useAppDispatch, useAppSelector } from '../../../hooks';

import {
    selectChartType,
    setChartType,
} from '../../../../features/anime/store/animeChartSlice';

import { selectAnimeFilters } from '../../../../features/anime/store/animeQuerySlice';

import { useDebounce } from '../../../../shared/hooks/useDebounce';
import { useAnimeChart } from '../../../../features/anime/hooks/useAnimeChart';

import AnimeStats from '../../../../features/anime/components/AnimeStats/AnimeStats';

import ChartTypeSelect from '../../../../shared/components/molecules/ChartTypeSelect/ChartTypeSelect';
import RequestBoundary from '../../../../shared/components/molecules/RequestBoundary/RequestBoundary';

import DataBarChart from '../../../../shared/components/organisms/DataBarChart/DataBarChart';
import DataPieChart from '../../../../shared/components/organisms/DataPieChart/DataPieChart';

import { CHART_TOKENS } from '../../../../shared/styles/chart.tokens';

import './AnimeStatisticsPage.css';

export default function AnimeStatisticsPage() {
    const dispatch = useAppDispatch();

    const type = useAppSelector(selectChartType);

    const filter = useAppSelector(
        state => selectAnimeFilters(state).filter
    );

    const debouncedFilter = useDebounce(filter);

    const isPending = filter !== debouncedFilter;

    const { points, request } = useAnimeChart(
        debouncedFilter,
        isPending
    );

    const ChartComponent = type === 'pie'
        ? DataPieChart
        : DataBarChart;

    function handleChartTypeChange(value: typeof type) {
        dispatch(setChartType(value));
    }

    return (
        <section className="anime-statistics-page">
            <AnimeStats
                filter={debouncedFilter}
                isPending={isPending}
            />

            <section className="anime-chart-panel">
                <div className="anime-chart-header">
                    <h2>Розподіл аніме за статусами</h2>
                </div>

                <RequestBoundary
                    request={request}
                    isEmpty={!points.some(point => point.value > 0)}
                    loadingMessage="Завантаження статистики графіка..."
                    errorTitle="Не вдалося завантажити графік"
                    emptyMessage="Немає аніме з відомими статусами за цими фільтрами."
                >
                    <ChartComponent
                        data={points}
                        valueLabel="Кількість аніме"
                        height={CHART_TOKENS.height}
                    />
                </RequestBoundary>

                <ChartTypeSelect
                    value={type}
                    onChange={handleChartTypeChange}
                />
            </section>
        </section>
    );
}