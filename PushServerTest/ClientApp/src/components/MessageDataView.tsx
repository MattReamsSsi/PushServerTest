import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    fetchAll,
    selectApiClientDatas,
    selectUserDatas,
    selectStatus
  } from '../reduxStuff/pushMessagesSlice';

const MessageDataView = () => {

    const status = useSelector(selectStatus);

    return (
        <div>
          <h1>Hello from message view</h1>
          <h2>{status}</h2>
        </div>
      );
}

export default MessageDataView;