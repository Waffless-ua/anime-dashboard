import type { Meta, StoryObj } from '@storybook/react-vite';

import Card from './Card';

const meta = {
    title: 'Atoms/Card',
    component: Card,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Універсальний контейнер зі спільними фоном, '
                    + 'межами, радіусами та тінню. '
                    + 'Вміст передається через children.',
            },
        },
    },

    argTypes: {
        variant: {
            control: 'select',
            options: ['surface', 'muted'],
            description: 'Варіант фону картки.',
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Внутрішні відступи.',
        },
        hoverable: {
            control: 'boolean',
            description:
                'Візуальна реакція на наведення. '
                + 'Сама по собі не робить картку кнопкою.',
        },
        as: {
            control: 'select',
            options: ['div', 'article', 'section', 'aside'],
            description:
                'HTML-елемент контейнера. '
                + 'Варіант li використовується всередині списку.',
        },
        children: {
            control: 'text',
        },

    },

    args: {
        children: 'Вміст універсальної картки.',
        as: 'div',
        variant: 'surface',
        padding: 'md',
        hoverable: false,
    },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Surface: Story = {};

export const Muted: Story = {
    args: {
        variant: 'muted',
    },
};

export const SmallPadding: Story = {
    args: {
        padding: 'sm',
    },
};

export const LargePadding: Story = {
    args: {
        padding: 'lg',
    },
};

export const WithoutPadding: Story = {
    args: {
        padding: 'none',
    },
};

export const Hoverable: Story = {
    args: {
        variant: 'muted',
        hoverable: true,
        children: 'Наведіть курсор на картку.',
    },
};

export const AsArticle: Story = {
    args: {
        as: 'article',
        children: 'Картка із семантикою окремої статті.',
    },
};

export const AsListItem: Story = {
    args: {
        as: 'li',
        children: 'Картка всередині списку.',
    },
    render: args => (
        <ul>
            <Card {...args} />
        </ul>
    ),
};

export const AsAside: Story = {
    args: {
        as: 'aside',
        children: 'Додатковий вміст сторінки.',
    },
};