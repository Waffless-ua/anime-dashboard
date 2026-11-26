import Button from '../../atoms/Button/Button';

import { createPagination } from '../../../utils/createPagination';

import {
    FIRST_PAGE,
    DEFAULT_PAGE_STEP,
} from '../../../constants/pagination.constants';

import './PagePaginator.css';

export interface PagePaginatorProps {
    page: number;
    onChange: (page: number) => void;
    totalItems: number;
    pageSize: number;
    pageStep?: number;
    label?: string;
    disabled?: boolean;
    className?: string;
}

export default function PagePaginator({
    page,
    onChange,
    totalItems,
    pageSize,
    pageStep = DEFAULT_PAGE_STEP,
    label = 'Навігація сторінками',
    disabled = false,
    className = '',
}: PagePaginatorProps) {
    const {
        hasPreviousPage,
        hasNextPage,
        changePage,
    } = createPagination(
        page,
        onChange,
        totalItems,
        pageSize
    );

    function getPageStep(): number {
        if (!Number.isSafeInteger(pageStep) || pageStep <= 0) {
            return DEFAULT_PAGE_STEP;
        }

        return pageStep;
    }

    const step = getPageStep();

    function previousPage() {
        changePage(Math.max(FIRST_PAGE, page - step));
    }

    function nextPage() {
        changePage(page + step);
    }

    return (
        <nav
            className={`page-paginator ${className}`}
            aria-label={label}
        >
            <Button
                variant="outline"
                className="page-paginator__button"
                onClick={previousPage}
                disabled={disabled || !hasPreviousPage}
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
                disabled={disabled || !hasNextPage}
            >
                <span className="page-paginator__text">
                    Наступна
                </span>
                <span aria-hidden="true">→</span>
            </Button>
        </nav>
    );
}