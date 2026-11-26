import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import ChartTypeSelect from './ChartTypeSelect';
import type { ChartType } from '../../../types/chart.types';

const meta = {
    title: 'Molecules/ChartTypeSelect',
    component: ChartTypeSelect,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Контрольований перемикач типу діаграми. ' +
                    'Підтримує значення bar і pie та повідомляє про вибір через onChange.',
            },
        },
    },

    argTypes: {
        value: {
            control: 'radio',
            options: ['bar', 'pie'],
            description: 'Поточний тип діаграми.',
        },
        onChange: {
            control: false,
            description: 'Колбек, що отримує вибраний тип.',
        },
    },

    args: {
        value: 'bar',
        onChange: () => {},
    },

    render: function Render(args) {
        const [{ value }, updateArgs] = useArgs<{ value: ChartType }>();

        function handleChange(nextValue: ChartType) {
            updateArgs({ value: nextValue });
            args.onChange(nextValue);
        }

        return (
            <div style={{ maxWidth: 320 }}>
                <ChartTypeSelect
                    {...args}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        );
    },
} satisfies Meta<typeof ChartTypeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bar: Story = {};

export const Pie: Story = {
    args: { value: 'pie' },
};
