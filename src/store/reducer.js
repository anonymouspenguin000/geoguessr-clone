import {combineReducers} from "redux";
import commonReducer from './modules/common/reducer';

const rootReducer = combineReducers({
    common: commonReducer
});

export {rootReducer};
