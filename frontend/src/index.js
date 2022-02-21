import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { devToolsEnhancer } from 'redux-devtools-extension';
import reducer from './redux/reducer';
import ActionTypes from './redux/ActionTypes';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), devToolsEnhancer({ trace: true })));
sagaMiddleware.run(rootSaga);

const action = (type, payload) => store.dispatch({ type, payload });
action(ActionTypes.GET_EMPLOYEES);

function render() {
  ReactDOM.render(
    <React.StrictMode>
        <App 
          state={store.getState()}
          onInit={(payload) => action(ActionTypes.GET_EMPLOYEES, payload)}
          onGetOne={(payload) => action(ActionTypes.GET_EMPLOYEE, payload)}
          onCreate={(payload) => action(ActionTypes.ADD_NEW_EMPLOYEE, payload)}
          onEdit={(payload) => action(ActionTypes.UPDATE_SALARY, payload)}
          onDelete={(payload) => action(ActionTypes.DELETE_EMPLOYEE, payload)} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

render();
store.subscribe(render);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
