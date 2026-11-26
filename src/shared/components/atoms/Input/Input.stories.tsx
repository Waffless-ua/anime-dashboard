import type { Meta, StoryObj } from '@storybook/react-vite';

import Input from './Input';

const meta = {
    title: 'Atoms/Input',
    component: Input,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Базове поле введення зі стандартними HTML-props. '
                    + 'onChange отримує подію. Для підпису, підказки '
                    + 'та повідомлення про помилку використовуйте FormField.',
            },
        },
    },

    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'search', 'number', 'email', 'password'],
            description: 'Тип поля введення.',
        },
        placeholder: {
            control: 'text',
            description: 'Підказка всередині порожнього поля.',
        },
        disabled: {
            control: 'boolean',
        },
        readOnly: {
            control: 'boolean',
        },
        value: {
            control: false,
            description:
                'Значення контрольованого поля. Потребує onChange '
                + 'або readOnly.',
        },
    },

    args: {
        type: 'text',
        placeholder: 'Введіть текст',
        'aria-label': 'Приклад поля введення',
        disabled: false,
        readOnly: false,
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
    args: {
        defaultValue: 'Приклад значення',
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: 'Недоступне поле',
        disabled: true,
    },
};

export const ReadOnly: Story = {
    args: {
        value: 'Значення лише для читання',
        readOnly: true,
    },
};

export const Search: Story = {
    args: {
        type: 'search',
        placeholder: 'Пошук...',
        'aria-label': 'Пошук',
    },
};

export const Number: Story = {
    args: {
        type: 'number',
        defaultValue: 5,
        min: 1,
        max: 10,
        'aria-label': 'Кількість від 1 до 10',
    },
};

export const Invalid: Story = {
    args: {
        defaultValue: 'Некоректне значення',
        'aria-invalid': true,
    },
};