import ReactDOM from "react-dom";
import "./stylesheets/index.css";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { devToolsEnhancer } from "redux-devtools-extension";
import { reducer, rootSaga } from "./store";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	reducer as any,
	compose(applyMiddleware(sagaMiddleware), devToolsEnhancer({ trace: true }))
);
sagaMiddleware.run(rootSaga);

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("root")
	);
}

render();
store.subscribe(render);
