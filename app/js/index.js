import React from 'react';
import { render } from 'react-dom';
import eth from './getWeb3';
import App from './lib/App';

render(
  <App web3={eth.web3} todo={eth.todo} />,
    document.getElementById('app')
);
