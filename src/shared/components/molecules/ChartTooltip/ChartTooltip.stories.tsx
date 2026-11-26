import type { Meta, StoryObj } from '@storybook/react-vite';

import ChartTooltip from './ChartTooltip';

const meta = {
    title: 'Molecules/ChartTooltip',
    component: ChartTooltip,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Вміст підказки для діаграм. Відображає назву, підпис ' +
                    'значення та додатковий вміст через children.',
            },
        },
    },

    argTypes: {
        title: { control: 'text', description: 'Заголовок підказки.' },
        valueLabel: { control: 'text', description: 'Підпис значення.' },
        value: { control: 'text', description: 'Значення показника.' },
        children: { control: false, description: 'Додаткові деталі.' },
    },

    args: {
        title: 'Завершені',
        valueLabel: 'Кількість аніме',
        value: '1 250',
    },
} satisfies Meta<typeof ChartTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPercentage: Story = {
    args: {
        children: <span>Частка: 35,8%</span>,
    },
};

export const LongTitle: Story = {
    args: {
        title: 'Дуже довга назва категорії статистичних даних',
        value: '12 345',
    },
};
