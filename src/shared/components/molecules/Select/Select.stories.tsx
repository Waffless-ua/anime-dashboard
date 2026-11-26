import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import Select from './Select';

const meta = {
    title: 'Molecules/Select',
    component: Select,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Контрольований список вибору з підписом, підказкою '
                    + 'та помилкою. onChange повертає значення вибраної опції.',
            },
        },
    },

    argTypes: {
        label: {
            control: 'text',
            description: 'Підпис поля.',
        },
        value: {
            control: 'select',
            options: ['', 'first', 'second', 'third'],
            description: 'Поточне значення з options.',
        },
        options: {
            control: 'object',
            description: 'Опції: value, label та необов’язковий disabled.',
        },
        hint: {
            control: 'text',
            description: 'Підказка під полем.',
        },
        error: {
            control: 'text',
            description: 'Помилка, яка має пріоритет над підказкою.',
        },
        disabled: {
            control: 'boolean',
        },
        onChange: {
            control: false,
            description: 'Викликається з новим значенням.',
        },
    },

    args: {
        label: 'Оберіть варіант',
        value: '',
        options: [
            { value: '', label: 'Не обрано' },
            { value: 'first', label: 'Перший варіант' },
            { value: 'second', label: 'Другий варіант' },
            { value: 'third', label: 'Третій варіант' },
        ],
        disabled: false,
        onChange: () => {},
    },

    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs<{ value: string }>();

        function handleChange(nextValue: string) {
            updateArgs({ value: nextValue });
            args.onChange(nextValue);
        }

        return (
            <Select
                {...args}
                value={value}
                onChange={handleChange}
            />
        );
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
    args: {
        value: 'second',
    },
};

export const WithHint: Story = {
    args: {
        hint: 'Оберіть один із доступних варіантів.',
    },
};

export const WithError: Story = {
    args: {
        error: 'Потрібно обрати значення.',
    },
};

export const Disabled: Story = {
    args: {
        value: 'first',
        disabled: true,
    },
};

export const DisabledOption: Story = {
    args: {
        options: [
            { value: '', label: 'Не обрано' },
            { value: 'first', label: 'Перший варіант' },
            {
                value: 'second',
                label: 'Другий варіант недоступний',
                disabled: true,
            },
            { value: 'third', label: 'Третій варіант' },
        ],
    },
};