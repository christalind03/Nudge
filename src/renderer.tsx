import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import { Layout } from '@/components/Layout';
import { Blocks } from '@/routes/Blocks';
import { Dashboard } from '@/routes/Dashboard';
import { Reminders } from '@/routes/Reminders';
import { Settings } from '@/routes/Settings';

const memoryRouter = createMemoryRouter([
  {
    children: [
      {
        element: <Dashboard />,
        path: '/',
      },
      {
        element: <Blocks />,
        path: '/blocks/:blockID',
      },
      {
        element: <Reminders />,
        path: '/reminders',
      },
      {
        element: <Settings />,
        path: '/settings',
      },
    ],
    element: <Layout />,
  },
]);

function App() {
  return (
    <StrictMode>
      <RouterProvider router={memoryRouter} />
    </StrictMode>
  );
}

const appContainer = document.getElementById('root');
const appRoot = createRoot(appContainer);

appRoot.render(<App />);
