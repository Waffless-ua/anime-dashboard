import type { ReactNode } from 'react';

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