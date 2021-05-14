import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PushApiClient from './PushApiClient';

const initialState = {
  apiClientDatas: [],
  userDatas: [],
  status: 'not tried yet'
};

export const fetchApiClientDatas = createAsyncThunk('pushMessages/fetchApiClientDatas', async () => {
  return await PushApiClient.getApiClientDatas();
});

export const fetchUserDatas = createAsyncThunk('pushMessages/fetchUserDatas', async () => {
  return await PushApiClient.getUserDatas();
});

export const sendPushMessage = createAsyncThunk('pushMessages/sendPushMessage', async (pushMessage) => {
  return await PushApiClient.sendPushMessage(pushMessage);
});

export const adduserData = createAsyncThunk('pushMessages/adduserData', async (userData) => {
  return await PushApiClient.adduserData(userData);
});

export const fetchAll = () => dispatch => {
    dispatch(fetchApiClientDatas());
    dispatch(fetchUserDatas());
  };

export const pushMessagesSlice = createSlice({
  name: 'pushMessages',
  initialState : initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: builder => {
    builder
      .addCase(fetchApiClientDatas.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchApiClientDatas.fulfilled, (state, action) => {
        state.apiClientDatas = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchApiClientDatas.rejected, (state, action) => {
        state.status = 'rejected: ' + JSON.stringify(action.error) 
      })
      .addCase(fetchUserDatas.fulfilled, (state, action) => {
        state.userDatas = action.payload;
        console.log(action.payload);
        state.status = 'idle';
      })
  }
});

export const selectApiClientDatas = state => state.pushMessages.apiClientDatas;
export const selectUserDatas = state => state.pushMessages.userDatas;
export const selectStatus = state => state.pushMessages.status;

export default pushMessagesSlice.reducer;