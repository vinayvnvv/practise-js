import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass'; // styles in sass
import './styles/styles.css'; //containes styles in css format
import App from './components/app';
import * as serviceWorker from './serviceWorker';
const root = document.querySelector('[practise-js]');
if(process.env.NODE_ENV !== 'development') {
  console.log = () => {};
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
