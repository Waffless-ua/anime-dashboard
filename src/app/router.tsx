import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Layout from "./Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails.tsx";
import NotFound from "./pages/NotFound.tsx";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="anime/:id" element={<AnimeDetails />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);