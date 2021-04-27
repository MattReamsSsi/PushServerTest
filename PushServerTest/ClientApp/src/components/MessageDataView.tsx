import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup } from "@chakra-ui/react";

import {
    fetchAll,
    selectApiClientDatas,
    selectUserDatas,
    selectStatus
  } from '../reduxStuff/pushMessagesSlice';

const MessageDataView = () => {

    const status = useSelector(selectStatus);
    const apiClientDatas = useSelector(selectApiClientDatas);
    const userDatas = useSelector(selectUserDatas);

    const dispatch = useDispatch();

    return (
        <div>
          <h1>Hello from message view</h1>
          <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Button</Button>
          <h2>{status}</h2>
          <h3>{JSON.stringify(apiClientDatas)}</h3>
          <h4>{JSON.stringify(userDatas)}</h4>
        </div>
      );
}

export default MessageDataView;