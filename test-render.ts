import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/App';
console.log('SSR Render test:', ReactDOMServer.renderToString(React.createElement(App)).length);
