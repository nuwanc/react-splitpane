import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css/normalize.css';
import 'react-tabs/style/react-tabs.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


//global variable to show outer most pane
window.showOuter = false;

ReactDOM.render(<App showOuter={window.showOuter} messageId={window.key}/>, document.getElementById('root'));
registerServiceWorker();
