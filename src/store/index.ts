import { createStore, Store, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { SystemState } from './system/types';
import { TimelineState } from './timeline/types';

export interface ApplicationState {
  system: SystemState;
  timeline: TimelineState;
}

const persistConfig = {
  key: 'persistedStore',
  storage,
  whitelist: ['system'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store: Store<ApplicationState> = createStore(
  persistedReducer,
  applyMiddleware(logger, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
