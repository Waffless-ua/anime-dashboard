import type { Key, ReactNode } from 'react';

import './DataTable.css';

export interface TableColumn<T> {
    id: string;
    header: ReactNode;
    render: (item: T) => ReactNode;
    nowrap?: boolean;
}

export interface DataTableProps<T> {
    data: readonly T[];
    columns: readonly TableColumn<T>[];
    getRowKey: (item: T) => Key;
    caption: string;
    density?: 'compact' | 'comfortable';
    striped?: boolean;
    emptyMessage?: string;
    className?: string;
}

export default function DataTable<T>({
    data,
    columns,
    getRowKey,
    caption,
    density = 'comfortable',
    striped = false,
    emptyMessage = 'Немає даних.',
    className = '',
}: DataTableProps<T>) {
    const tableClassName = [
        'data-table',
        `data-table--${density}`,
        striped ? 'data-table--striped' : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div
            className="data-table-container"
            role="region"
            aria-label={caption}
            tabIndex={0}
        >
            <table className={tableClassName}>
                <caption className="data-table__caption">
                    {caption}
                </caption>

                <thead>
                <tr>
                    {columns.map(column => (
                        <th
                            key={column.id}
                            scope="col"
                            className={
                                column.nowrap
                                    ? 'data-table__cell--nowrap'
                                    : undefined
                            }
                        >
                            {column.header}
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {data.map(item => (
                    <tr key={getRowKey(item)}>
                        {columns.map(column => (
                            <td
                                key={column.id}
                                className={
                                    column.nowrap
                                        ? 'data-table__cell--nowrap'
                                        : undefined
                                }
                            >
                                {column.render(item)}
                            </td>
                        ))}
                    </tr>
                ))}

                {data.length === 0 && (
                    <tr>
                        <td
                            colSpan={Math.max(1, columns.length)}
                            className="data-table__empty"
                        >
                            {emptyMessage}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}