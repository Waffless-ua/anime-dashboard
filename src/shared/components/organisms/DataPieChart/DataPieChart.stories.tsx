import type { Meta, StoryObj } from '@storybook/react-vite';

import DataPieChart from './DataPieChart';
import type { ChartPoint } from '../../../types/chart.types';

const statusData: ChartPoint[] = [
    { name: 'Поточні', value: 420 },
    { name: 'Завершені', value: 1250 },
    { name: 'Заплановані', value: 280 },
    { name: 'Призупинені', value: 110 },
    { name: 'Покинуті', value: 75 },
];

const meta = {
    title: 'Organisms/DataPieChart',
    component: DataPieChart,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Кругова діаграма з підсумком у центрі, легендою ' +
                    'та підказкою з відсотком. Нульові значення не утворюють секторів.',
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
        <div style={{ width: '100%', maxWidth: 750 }}>
            <DataPieChart {...args} />
        </div>
    ),
} satisfies Meta<typeof DataPieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithZeroValues: Story = {
    args: {
        data: [
            { name: 'Поточні', value: 0 },
            { name: 'Завершені', value: 1250 },
            { name: 'Заплановані', value: 280 },
        ],
    },
};

export const SingleCategory: Story = {
    args: { data: [{ name: 'Завершені', value: 100 }] },
};

export const Empty: Story = {
    args: { data: [] },
};
