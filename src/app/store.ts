import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/SignUp/store/slice';
import carReducer from '../components/admin/cars/store/slice'
import adsReducer from '../components/admin/advertisements/store/slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    ads: adsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;