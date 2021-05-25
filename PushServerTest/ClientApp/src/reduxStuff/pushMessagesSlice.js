import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PushApiClient from './PushApiClient';

const initialState = {
  apiClientDatas: [],
  userDatas: [],
  status: 'not tried yet',
  //below are for ui changes
  apiIdForUsersFilter: ''
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

export const addUserData = createAsyncThunk('pushMessages/addUserData', async (userData, thunkAPI) => {
  const ret = await PushApiClient.addUserData(userData);
  thunkAPI.dispatch(fetchAll());
  return ret;
});

export const addApiClientData = createAsyncThunk('pushMessages/addApiClientData', async (apiClientData, thunkAPI) => {
  const ret =  await PushApiClient.addApiClientData(apiClientData);
  thunkAPI.dispatch(fetchAll());
  return ret;
});

export const fetchAll = () => dispatch => {
    dispatch(fetchApiClientDatas());
    dispatch(fetchUserDatas());
  };

export const pushMessagesSlice = createSlice({
  name: 'pushMessages',
  initialState : initialState,
  reducers: {
    setApiIdForUsersFilter: (state, action) => {
      state.apiIdForUsersFilter = action.payload;
    },
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
export const selectApiIdForUsersFilter = state => state.pushMessages.apiIdForUsersFilter;

export const { setApiIdForUsersFilter } = pushMessagesSlice.actions;

export default pushMessagesSlice.reducer;