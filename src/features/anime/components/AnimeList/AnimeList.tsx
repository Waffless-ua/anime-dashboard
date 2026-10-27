import type { ReactNode } from 'react';

import './AnimeList.css';

interface AnimeListProps {
    children: ReactNode;
}

export default function AnimeList({ children }: AnimeListProps) {
    return (
        <ul className="anime-grid">
            {children}
        </ul>
    );
}