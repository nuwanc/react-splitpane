import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css'
import 'react-tabs/style/react-tabs.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';


//global variable to show outer most pane
window.showOuter = true;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
