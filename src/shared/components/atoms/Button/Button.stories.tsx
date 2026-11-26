import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
    title: 'Atoms/Button',
    component: Button,

    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Універсальна кнопка. Підтримує варіанти оформлення, '
                    + 'розміри та стандартні HTML-атрибути button. '
                    + 'Для iconOnly потрібно передати aria-label.',
            },
        },
    },

    argTypes: {
        variant: {
            control: 'select',
            options: [
                'primary',
                'secondary',
                'tertiary',
                'outline',
                'danger',
            ],
            description: 'Варіант оформлення кнопки.',
        },

        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Розмір кнопки.',
        },

        disabled: {
            control: 'boolean',
            description: 'Вимикає взаємодію з кнопкою.',
        },

        fullWidth: {
            control: 'boolean',
            description: 'Розтягує кнопку на ширину контейнера.',
        },

        iconOnly: {
            control: 'boolean',
            description: 'Компактна кнопка лише з іконкою.',
        },

        children: {
            control: 'text',
            description: 'Вміст кнопки.',
        },
    },

    args: {
        children: 'Зберегти',
        variant: 'primary',
        size: 'md',
        disabled: false,
        fullWidth: false,
        iconOnly: false,
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
    },
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: 'Видалити',
    },
};

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

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

export const IconOnly: Story = {
    args: {
        children: '＋',
        iconOnly: true,
        'aria-label': 'Додати',
    },
};