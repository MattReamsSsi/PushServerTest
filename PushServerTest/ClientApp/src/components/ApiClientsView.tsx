import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Input,
  Text
} from "@chakra-ui/react";
import { ApiClientData, UserData, PushMessage } from '../DataStructures';
import {
  fetchAll,
  selectApiClientDatas,
  selectUserDatas,
  selectStatus,
  sendPushMessage,
  adduserData
} from '../reduxStuff/pushMessagesSlice';

const ApiClientsView = () => {

  const status = useSelector(selectStatus);
  const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];

  const dispatch = useDispatch();

  return (
    <div>
      <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Refresh Data ({status})</Button>
      <Table variant="simple">
        <TableCaption placement='top'>API Clients</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Is Deleted</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            apiClientDatas.map(v => {
              return <Tr>
                <Td>{v.id}</Td>
                <Td>{v.description}</Td>
              </Tr>
            })
          }
        </Tbody>
      </Table>
    </div>
  );
}

export default ApiClientsView;