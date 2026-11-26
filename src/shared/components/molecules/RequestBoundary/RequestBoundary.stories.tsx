import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import RequestBoundary from './RequestBoundary';

import type { RequestState } from '../../../types/async.types';

const successRequest: RequestState = {
    status: 'success',
    error: null,
    reload: () => {},
};

const loadingRequest: RequestState = {
    status: 'loading',
    error: null,
    reload: () => {},
};

const errorRequest: RequestState = {
    status: 'error',
    error: 'Сервер тимчасово недоступний.',
    reload: () => {},
};

const meta = {
    title: 'Molecules/RequestBoundary',
    component: RequestBoundary,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Відображає завантаження, помилку з повторною спробою, ' +
                    'порожній стан або children після успішного запиту.',
            },
        },
    },

    argTypes: {
        request: {
            control: false,
            description: 'Стан запиту та функція reload.',
        },
        children: {
            control: false,
            description: 'Вміст після завантаження.',
        },
        isEmpty: { control: 'boolean' },
        loadingMessage: { control: 'text' },
        errorTitle: { control: 'text' },
        emptyMessage: { control: 'text' },
        retryLabel: { control: 'text' },
    },

    args: {
        request: successRequest,
        isEmpty: false,
        loadingMessage: 'Завантаження даних...',
        errorTitle: 'Не вдалося отримати дані',
        emptyMessage: 'Результатів не знайдено.',
        retryLabel: 'Повторити',
        children: <p>Дані успішно завантажено.</p>,
    },
} satisfies Meta<typeof RequestBoundary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Loading: Story = {
    args: {
        request: loadingRequest,
    },
};

export const Empty: Story = {
    args: {
        isEmpty: true,
    },
};

export const Error: Story = {
    args: {
        request: errorRequest,
    },

    render: function Render(args) {
        const [isRecovered, setIsRecovered] = useState(false);

        const request: RequestState = isRecovered
            ? successRequest
            : {
                ...args.request,
                reload: () => setIsRecovered(true),
            };

        return (
            <RequestBoundary
                {...args}
                request={request}
            />
        );
    },
};