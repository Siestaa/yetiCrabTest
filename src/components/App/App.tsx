import React from 'react';

import {Wrapper} from '../Wrapper';

interface AppProps {
    children: React.ReactNode;
}
export const App: React.FC<AppProps> = ({children}) => {
    return <Wrapper>{children}</Wrapper>;
};
