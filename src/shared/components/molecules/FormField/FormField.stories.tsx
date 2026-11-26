import type { Meta, StoryObj } from '@storybook/react-vite';

import FormField from './FormField';
import Input from '../../atoms/Input/Input';

const meta = {
    title: 'Molecules/FormField',
    component: FormField,
    tags: ['autodocs'],

    parameters: {
        docs: {
            description: {
                component:
                    'Об’єднує підпис, поле та повідомлення. '
                    + 'Передає id і ARIA-атрибути через children(controlProps). '
                    + 'Помилка має пріоритет над підказкою.',
            },
        },
    },

    argTypes: {
        label: {
            control: 'text',
            description: 'Підпис поля.',
        },
        hint: {
            control: 'text',
            description: 'Підказка, яка відображається за відсутності помилки.',
        },
        error: {
            control: 'text',
            description: 'Повідомлення про помилку.',
        },
        hideLabel: {
            control: 'boolean',
            description:
                'Візуально приховує підпис, зберігаючи доступну назву.',
        },
        children: {
            control: false,
            description:
                'Функція, що отримує id, aria-describedby та aria-invalid '
                + 'для передачі полю.',
        },
    },

    args: {
        label: 'Назва',
        hideLabel: false,
        children: controlProps => (
            <Input
                {...controlProps}
                placeholder="Введіть назву"
            />
        ),
    },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
    args: {
        hint: 'Вкажіть коротку зрозумілу назву.',
    },
};

export const WithError: Story = {
    args: {
        error: 'Назва не може бути порожньою.',
    },
};

export const ErrorOverridesHint: Story = {
    args: {
        hint: 'Ця підказка прихована, поки є помилка.',
        error: 'Спочатку виправте помилку.',
    },
};

export const HiddenLabel: Story = {
    args: {
        label: 'Пошук',
        hideLabel: true,
        children: controlProps => (
            <Input
                {...controlProps}
                type="search"
                placeholder="Пошук..."
            />
        ),
    },
};

export const WithDisabledInput: Story = {
    args: {
        hint: 'Редагування тимчасово недоступне.',
        children: controlProps => (
            <Input
                {...controlProps}
                defaultValue="Недоступне значення"
                disabled
            />
        ),
    },
};