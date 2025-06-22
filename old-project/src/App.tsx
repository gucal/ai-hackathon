import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TkLayout from "./layouts/TkLayout";
import { LayoutProvider } from "./layouts/context/LayoutContext";
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => (
    <BrowserRouter>
        <LayoutProvider>
            <TkLayout>
                <AppRoutes />
            </TkLayout>
        </LayoutProvider>
    </BrowserRouter>
);

export default App;