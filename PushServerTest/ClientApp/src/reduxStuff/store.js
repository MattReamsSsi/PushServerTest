import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import pushMessagesSlice from './pushMessagesSlice'

export default configureStore({
  reducer: {
    counter: counterSlice,
    pushMessages: pushMessagesSlice
  },
});
