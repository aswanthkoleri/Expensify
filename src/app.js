import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configStore'
import 'normalize.css/normalize.css';
import './assets/styles.scss';

const store = configureStore();
console.log(store.getState());
ReactDOM.render(<AppRouter />, document.getElementById('app'));
