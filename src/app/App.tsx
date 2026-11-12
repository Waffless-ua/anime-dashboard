import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import AnimeDetails from './pages/AnimeDetails/AnimeDetails.tsx';
import NotFound from './pages/NotFound';

import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="anime/:id" element={<AnimeDetails />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default function App() {
    return <RouterProvider router={router} />;
}
