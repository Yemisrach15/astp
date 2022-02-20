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
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware), reduxDevTools));
sagaMiddleware.run(rootSaga);

// trial
// store.dispatch({ type: ActionTypes.GET_EMPLOYEES });
// store.dispatch({ type: ActionTypes.GET_EMPLOYEE, payload: { _id: "619fa16a5b324120ef3ec886" } });

const action = type => store.dispatch({ type });
store.dispatch({ type: ActionTypes.ADD_NEW_EMPLOYEE, payload: {
  name: "Yemsirach",
  birthDate: "2000-05-23",
  gender: "f",
  salary: 2000
}});

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App state={store.getState()}
          onInit={() => action(ActionTypes.GET_EMPLOYEES)}
          onCreate={() => action(ActionTypes.ADD_NEW_EMPLOYEE)}
          onEdit={() => action(ActionTypes.UPDATE_SALARY)}
          onDelete={() => action(ActionTypes.DELETE_EMPLOYEE)} />
      </Provider>
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
