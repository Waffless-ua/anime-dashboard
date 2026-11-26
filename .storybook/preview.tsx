import type { Preview } from '@storybook/react-vite';

import '../src/index.css';
import './preview.css';

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Тема компонентів',
            toolbar: {
                title: 'Тема',
                icon: 'circlehollow',
                items: [
                    { value: 'light', title: 'Світла' },
                    { value: 'dark', title: 'Темна' },
                ],
                dynamicTitle: true,
            },
        },
    },

    initialGlobals: {
        theme: 'light',
    },

    parameters: {
        layout: 'fullscreen',
    },

    decorators: [
        (Story, context) => (
            <div
                data-theme={context.globals.theme}
                className="storybook-preview"
            >
                <Story />
            </div>
        ),
    ],
};

export default preview;