import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import Counter from './Counter';

const meta = {
    title: 'Molecules/Counter',
    component: Counter,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Контрольований числовий лічильник. '
                    + 'Змінює значення з указаним кроком у межах min і max. '
                    + 'На межах відповідна кнопка блокується.',
            },
        },
    },

    argTypes: {
        label: {
            control: 'text',
        },
        value: {
            control: 'number',
            description: 'Поточне значення.',
        },
        min: {
            control: 'number',
            description: 'Мінімальне значення.',
        },
        max: {
            control: 'number',
            description: 'Максимальне значення.',
        },
        step: {
            control: 'number',
            description: 'Додатний крок зміни значення.',
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
        label: 'Кількість',
        value: 5,
        min: 1,
        max: 10,
        step: 1,
        disabled: false,
        onChange: () => {},
    },

    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs<{ value: number }>();

        function handleChange(nextValue: number) {
            updateArgs({ value: nextValue });
            args.onChange(nextValue);
        }

        return (
            <Counter
                {...args}
                value={value}
                onChange={handleChange}
            />
        );
    },
} satisfies Meta<typeof Counter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AtMinimum: Story = {
    args: {
        value: 1,
    },
};

export const AtMaximum: Story = {
    args: {
        value: 10,
    },
};

export const StepFive: Story = {
    args: {
        value: 10,
        min: 5,
        max: 30,
        step: 5,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const FixedRange: Story = {
    args: {
        value: 5,
        min: 5,
        max: 5,
    },
};

export const InvalidStep: Story = {
    args: {
        step: 0,
    },
};