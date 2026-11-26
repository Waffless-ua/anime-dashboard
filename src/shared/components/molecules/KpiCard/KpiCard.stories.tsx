import type { Meta, StoryObj } from '@storybook/react-vite';

import KpiCard from './KpiCard';

const meta = {
    title: 'Molecules/KpiCard',
    component: KpiCard,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Картка ключового показника зі значенням, зміною та ' +
                    'станами завантаження, помилки й відсутності даних. ' +
                    'Побудована з універсальних Card і Badge.',
            },
        },
    },

    argTypes: {
        title: { control: 'text', description: 'Назва показника.' },
        value: { control: 'text', description: 'Число або текст.' },
        change: { control: 'text', description: 'Величина зміни.' },
        changePrefix: { control: 'text' },
        changeSuffix: { control: 'text' },
        changeStatus: {
            control: 'select',
            options: ['positive', 'negative', 'neutral'],
        },
        status: {
            control: 'select',
            options: ['success', 'loading', 'error'],
        },
        locale: { control: 'text' },
    },

    args: {
        title: 'Загальна кількість',
        value: 12500,
        change: 325,
        changePrefix: '+',
        changeSuffix: ' за тиждень',
        changeStatus: 'positive',
        status: 'success',
        locale: 'uk-UA',
    },
} satisfies Meta<typeof KpiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Negative: Story = {
    args: {
        title: 'Активні користувачі',
        value: 980,
        change: -45,
        changePrefix: '',
        changeSuffix: ' за тиждень',
        changeStatus: 'negative',
    },
};

export const Neutral: Story = {
    args: {
        title: 'Рейтинг',
        value: '87,5',
        change: 'Без змін',
        changePrefix: '',
        changeSuffix: '',
        changeStatus: 'neutral',
    },
};

export const WithoutChange: Story = {
    args: {
        title: 'Кількість серій',
        value: 24,
        change: null,
    },
};

export const ZeroChange: Story = {
    args: { change: 0 },
};

export const NoData: Story = {
    args: { value: null, change: null },
};

export const Loading: Story = {
    args: { status: 'loading' },
};

export const Error: Story = {
    args: { status: 'error' },
};
