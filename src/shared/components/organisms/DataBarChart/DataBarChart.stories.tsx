import type { Meta, StoryObj } from '@storybook/react-vite';

import DataBarChart from './DataBarChart';
import type { ChartPoint } from '../../../types/chart.types';

const statusData: ChartPoint[] = [
    { name: 'Поточні', value: 420 },
    { name: 'Завершені', value: 1250 },
    { name: 'Заплановані', value: 280 },
    { name: 'Призупинені', value: 110 },
    { name: 'Покинуті', value: 75 },
];

const meta = {
    title: 'Organisms/DataBarChart',
    component: DataBarChart,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Універсальна стовпчикова діаграма на основі Recharts. ' +
                    'Дані мають вигляд масиву { name, value }; ' +
                    'кольори беруться з дизайн-токенів.',
            },
        },
    },

    argTypes: {
        data: { control: 'object', description: 'Набір точок діаграми.' },
        valueLabel: { control: 'text', description: 'Назва числового показника.' },
        height: { control: { type: 'number', min: 200, max: 700, step: 20 } },
        locale: { control: 'text' },
    },

    args: {
        data: statusData,
        valueLabel: 'Кількість аніме',
        height: 400,
        locale: 'uk-UA',
    },

    render: args => (
        <div style={{ width: '100%', maxWidth: 850 }}>
            <DataBarChart {...args} />
        </div>
    ),
} satisfies Meta<typeof DataBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleCategory: Story = {
    args: { data: [{ name: 'Завершені', value: 1250 }] },
};

export const SmallValues: Story = {
    args: {
        data: [
            { name: 'А', value: 1 },
            { name: 'Б', value: 3 },
            { name: 'В', value: 2 },
        ],
    },
};

export const Empty: Story = {
    args: { data: [] },
};
