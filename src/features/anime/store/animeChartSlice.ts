import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../../app/store';
import type { ChartType } from '../../../shared/types/chart.types';

interface AnimeChartState {
    type: ChartType;
}

const initialState: AnimeChartState = {
    type: 'bar',
};

const animeChartSlice = createSlice({
    name: 'animeChart',
    initialState,
    reducers: {
        setChartType(state, action: PayloadAction<ChartType>) {
            state.type = action.payload;
        },
    },
});

export const { setChartType } = animeChartSlice.actions;

export const selectChartType = (state: RootState) =>
    state.animeChart.type;

export default animeChartSlice.reducer;