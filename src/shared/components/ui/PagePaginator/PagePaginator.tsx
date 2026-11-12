import Button from '../Button/Button';

import './PagePaginator.css';

interface PagePaginatorProps {
    page: number;
    hasNextPage: boolean;
    onChange: (page: number) => void;
    page_step?: number;
    label?: string;
}

const FIRST_PAGE = 1;
const DEFAULT_PAGE_STEP = 1;

export default function PagePaginator({
    page,
    hasNextPage,
    onChange,
    page_step = DEFAULT_PAGE_STEP,
    label = 'Навігація сторінками',
}: PagePaginatorProps) {
    function previousPage() {
        onChange(Math.max(FIRST_PAGE, page - page_step));
    }

    function nextPage() {
        onChange(page + page_step);
    }

    return (
        <nav className="page-paginator" aria-label={label}>
            <Button
                variant="outline"
                className="page-paginator__button"
                onClick={previousPage}
                disabled={page <= FIRST_PAGE}
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