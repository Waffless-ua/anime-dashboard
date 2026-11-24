import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectChartType, setChartType } from '../../../../features/anime/store/animeChartSlice';

import { useAnimeChart } from '../../../../features/anime/hooks/useAnimeChart';

import ChartTypeSelect from '../../../../shared/components/ui/ChartTypeSelect/ChartTypeSelect';
import RequestBoundary from '../../../../shared/components/ui/RequestBoundary/RequestBoundary';

import DataBarChart from '../../../../shared/components/ui/DataChart/DataBarChart/DataBarChart';
import DataPieChart from '../../../../shared/components/ui/DataChart/DataPieChart/DataPieChart';

import './AnimeStatisticsPage.css';
import AnimeStats from "../../../../features/anime/components/AnimeStats/AnimeStats.tsx";

const CHART_HEIGHT = 500;

export default function AnimeStatisticsPage() {
    const dispatch = useAppDispatch();
    const type = useAppSelector(selectChartType);

    const { points, request } = useAnimeChart();

    const ChartComponent = type === 'pie'
        ? DataPieChart
        : DataBarChart;

    return (
        <section className="anime-statistics-page">
            <AnimeStats />

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
                        height={CHART_HEIGHT}
                    />
                </RequestBoundary>

                <ChartTypeSelect
                    value={type}
                    onChange={value => dispatch(setChartType(value))}
                />
            </section>
        </section>
    );
}
