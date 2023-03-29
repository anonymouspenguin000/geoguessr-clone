import {createStore} from "redux";
import {rootReducer} from './reducer';

const store = createStore(rootReducer);

export {store};
