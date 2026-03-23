import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

function App() {
  return (
    <Fragment>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
    </Fragment>
  );
}

const appContainer = document.getElementById('root');
const appRoot = createRoot(appContainer);

appRoot.render(<App />);
