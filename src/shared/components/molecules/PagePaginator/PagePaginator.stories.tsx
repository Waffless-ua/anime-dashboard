import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';

import PagePaginator from './PagePaginator';

const meta = {
    title: 'Molecules/PagePaginator',
    component: PagePaginator,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Контрольована навігація сторінками. Кнопки враховують ' +
                    'загальну кількість елементів, розмір сторінки та крок. ' +
                    'Стан сторінки передається через page й onChange.',
            },
        },
    },

    argTypes: {
        page: { control: 'number', description: 'Поточна сторінка (від 1).' },
        totalItems: { control: 'number', description: 'Усього елементів.' },
        pageSize: { control: 'number', description: 'Елементів на сторінці.' },
        pageStep: { control: 'number', description: 'Крок переходу.' },
        disabled: { control: 'boolean' },
        label: { control: 'text', description: 'Доступна назва навігації.' },
        onChange: { control: false },
    },

    args: {
        page: 3,
        totalItems: 95,
        pageSize: 10,
        pageStep: 1,
        disabled: false,
        label: 'Сторінки списку',
        onChange: () => {},
    },

    render: function Render(args) {
        const [{ page }, updateArgs] = useArgs<{ page: number }>();

        function handlePageChange(nextPage: number) {
            updateArgs({ page: nextPage });
            args.onChange(nextPage);
        }

        return (
            <div style={{ width: '100%', maxWidth: 650 }}>
                <PagePaginator
                    {...args}
                    page={page}
                    onChange={handlePageChange}
                />
            </div>
        );
    },
} satisfies Meta<typeof PagePaginator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstPage: Story = {
    args: { page: 1 },
};

export const LastPage: Story = {
    args: { page: 10 },
};

export const StepTwo: Story = {
    args: { pageStep: 2 },
};

export const SinglePage: Story = {
    args: { page: 1, totalItems: 5 },
};

export const Disabled: Story = {
    args: { disabled: true },
};
