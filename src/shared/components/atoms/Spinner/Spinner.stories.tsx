import type { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from './Spinner';

const meta = {
    title: 'Atoms/Spinner',
    component: Spinner,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Індикатор завантаження. За замовчуванням має '
                    + 'доступну назву та role="status". '
                    + 'decorative приховує індикатор від скринрідера, '
                    + 'якщо стан уже описаний навколишнім елементом.',
            },
        },
    },

    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        label: {
            control: 'text',
            description: 'Доступна назва індикатора.',
        },
        decorative: {
            control: 'boolean',
            description: 'Приховує індикатор від скринрідера.',
        },
    },

    args: {
        size: 'md',
        label: 'Завантаження даних',
        decorative: false,
    },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
    args: {
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
    },
};

export const Decorative: Story = {
    args: {
        decorative: true,
    },
    render: args => (
        <div role="status">
            <Spinner {...args} /> Завантаження даних…
        </div>
    ),
};