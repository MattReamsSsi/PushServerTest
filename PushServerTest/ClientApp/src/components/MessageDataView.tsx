import React, { useState } from 'react';
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
 } from "@chakra-ui/react";

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

          <Table variant="simple">
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>

        </div>
      );
}

export default MessageDataView;