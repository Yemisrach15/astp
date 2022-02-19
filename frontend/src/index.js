import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './redux/reducer';
import ActionTypes from './redux/ActionTypes';
import * as saga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools));
sagaMiddleware.run(saga.getEmployeesSaga); 

// trial
store.dispatch({type: ActionTypes.GET_EMPLOYEES});
store.dispatch({type: ActionTypes.GET_EMPLOYEE, payload: {_id: "619fa16a5b324120ef3ec886"}});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
