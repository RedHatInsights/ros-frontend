import React from 'react';
import { createRoot } from 'react-dom/client';
import RosApp from './AppEntry';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);
root.render(<RosApp />);

