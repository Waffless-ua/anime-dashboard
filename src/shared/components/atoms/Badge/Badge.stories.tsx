import type { Meta, StoryObj } from '@storybook/react-vite';

import Badge from './Badge';

const meta = {
    title: 'Atoms/Badge',
    component: Badge,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Текстова позначка стану. Компонент отримує '
                    + 'семантичний варіант і текст, не залежить '
                    + 'від конкретних даних дашборду.',
            },
        },
    },

    argTypes: {
        variant: {
            control: 'select',
            options: ['neutral', 'success', 'danger', 'info', 'warning'],
            description: 'Семантичний варіант позначки.',
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
        },
        children: {
            control: 'text',
            description: 'Текст позначки.',
        },
    },

    args: {
        children: 'Нейтральний стан',
        variant: 'neutral',
        size: 'sm',
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Виконано',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Помилка',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'Інформація',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Потребує уваги',
    },
};

export const Medium: Story = {
    args: {
        size: 'md',
        children: 'Більша позначка',
    },
};