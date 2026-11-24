import Button from '../Button/Button';
import { usePagination } from '../../../hooks/usePagination';

import './PagePaginator.css';

interface PagePaginatorProps {
    page: number;
    onChange: (page: number) => void;
    totalItems: number;
    pageSize: number;
    page_step?: number;
    label?: string;
}

export default function PagePaginator({
    page,
    onChange,
    totalItems,
    pageSize,
    page_step = 1,
    label = 'Навігація сторінками',
}: PagePaginatorProps) {
    const { hasNextPage, changePage } = usePagination(
        page,
        onChange,
        totalItems,
        pageSize,
    );

    function previousPage() {
        changePage(Math.max(1, page - page_step));
    }

    function nextPage() {
        changePage(page + page_step);
    }

    return (
        <nav className="page-paginator" aria-label={label}>
            <Button
                variant="outline"
                className="page-paginator__button"
                onClick={previousPage}
                disabled={page <= 1}
            >
                <span aria-hidden="true">←</span>
                <span className="page-paginator__text">
                    Попередня
                </span>
            </Button>

            <span
                className="page-paginator__current"
                aria-live="polite"
                aria-atomic="true"
            >
                <span className="page-paginator__text">
                    Сторінка{' '}
                </span>
                {page}
            </span>

            <Button
                variant="outline"
                className="page-paginator__button"
                onClick={nextPage}
                disabled={!hasNextPage}
            >
                <span className="page-paginator__text">
                    Наступна
                </span>
                <span aria-hidden="true">→</span>
            </Button>
        </nav>
    );
}