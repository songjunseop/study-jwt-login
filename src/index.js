import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css';
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from "./modules";
import { tempSetUser, check } from "./modules/user";
import reportWebVitals from './reportWebVitals';
import jwtMiddleware from './lib/jwtMiddleware';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)),);

function loadUser() {
    try {
        const auth = localStorage.getItem('auth');
        if (!auth) return;

        store.dispatch(tempSetUser(JSON.parse(auth)));
        store.dispatch(check());
    } catch (e) {
        console.log('localStorage is not working');
    }
}

sagaMiddleware.run(rootSaga)
loadUser();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);
reportWebVitals();