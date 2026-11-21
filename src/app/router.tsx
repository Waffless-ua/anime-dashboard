import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router";
import Layout from "./Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import AnimeFiltersProvider from "../features/anime/context/AnimeFiltersProvider.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route element={
                <AnimeFiltersProvider>
                    <Outlet />
                </AnimeFiltersProvider>
            }>
                <Route index element={<Dashboard />} />
                <Route path="anime/:id" element={<AnimeDetails />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);
