import { Routes, Route } from 'react-router-dom';


import FormPage from '../pages/FormPage';

import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';


const AppRoutes: React.FC = () => (

  <Routes>

    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/" element={<FormPage />} />
    <Route path="/reports" element={<Reports />} />

  </Routes>

);

export default AppRoutes;
