import type {Metadata} from 'next';
import {App} from '../components/App';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import 'leaflet/dist/leaflet.css';
import '../styles/globals.scss';

export const metadata: Metadata = {
    title: 'YetiCrabTest',
    description: 'Created by Ivanenko Alexey',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body>
                <App>{children}</App>
            </body>
        </html>
    );
}
