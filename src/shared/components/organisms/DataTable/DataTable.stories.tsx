import type { Meta, StoryObj } from '@storybook/react-vite';

import DataTable from './DataTable';
import type { DataTableProps, TableColumn } from './DataTable';
import Badge from '../../atoms/Badge/Badge';

type ExampleRow = {
    id: number;
    title: string;
    episodes: number;
    status: 'completed' | 'current' | 'planned';
};

const STATUS_LABELS: Record<ExampleRow['status'], string> = {
    completed: 'Завершено',
    current: 'Виходить',
    planned: 'Заплановано',
};

const STATUS_VARIANTS = {
    completed: 'success',
    current: 'info',
    planned: 'neutral',
} as const;

const columns: readonly TableColumn<ExampleRow>[] = [
    { id: 'title', header: 'Назва', render: item => item.title },
    { id: 'episodes', header: 'Серії', render: item => item.episodes, nowrap: true },
    {
        id: 'status',
        header: 'Статус',
        render: item => (
            <Badge variant={STATUS_VARIANTS[item.status]}>
                {STATUS_LABELS[item.status]}
            </Badge>
        ),
        nowrap: true,
    },
];

const rows: ExampleRow[] = [
    { id: 1, title: 'Приклад аніме A', episodes: 12, status: 'completed' },
    { id: 2, title: 'Приклад аніме B', episodes: 24, status: 'current' },
    { id: 3, title: 'Приклад аніме C', episodes: 13, status: 'planned' },
];

function ExampleDataTable(props: DataTableProps<ExampleRow>) {
    return <DataTable {...props} />;
}

const meta = {
    title: 'Organisms/DataTable',
    component: ExampleDataTable,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Універсальна типізована таблиця. Колонки задають заголовки ' +
                    'та функції render, а getRowKey визначає стабільні ключі. ' +
                    'Приклад демонструє композицію з Badge.',
            },
        },
    },

    argTypes: {
        data: { control: 'object', description: 'Рядки таблиці.' },
        columns: { control: false, description: 'Опис колонок та їх рендерингу.' },
        getRowKey: { control: false, description: 'Функція для отримання ключа рядка.' },
        caption: { control: 'text', description: 'Назва таблиці.' },
        density: { control: 'radio', options: ['comfortable', 'compact'] },
        striped: { control: 'boolean' },
        emptyMessage: { control: 'text' },
    },

    args: {
        data: rows,
        columns,
        getRowKey: row => row.id,
        caption: 'Список аніме',
        density: 'comfortable',
        striped: false,
        emptyMessage: 'Немає записів.',
    },
} satisfies Meta<typeof ExampleDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Compact: Story = {
    args: { density: 'compact' },
};

export const Striped: Story = {
    args: { striped: true },
};

export const Empty: Story = {
    args: { data: [] },
};

export const LongContent: Story = {
    args: {
        data: [
            {
                id: 10,
                title: 'Приклад аніме з дуже довгою назвою для перевірки переповнення таблиці',
                episodes: 120,
                status: 'current',
            },
            ...rows,
        ],
    },
};
