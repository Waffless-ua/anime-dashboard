import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router';

import Layout from './Layout/Layout';

import DashboardLayout from './pages/Dashboard/DashboardLayout';

import AnimeDetails from './pages/AnimeDetails/AnimeDetails';
import NotFound from './pages/NotFound';
import AnimeListPage from "./pages/Dashboard/AnimeListPage/AnimeListPage.tsx";
import AnimeStatisticsPage from "./pages/Dashboard/AnimeStatisticsPage/AnimeStatisticsPage.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route element={<DashboardLayout />}>
                <Route index element={<AnimeListPage />} />
                <Route path="statistics" element={<AnimeStatisticsPage />}/>
            </Route>

            <Route path="anime/:id" element={<AnimeDetails />}/>
            <Route path="*" element={<NotFound />} />

        </Route>
    )
);