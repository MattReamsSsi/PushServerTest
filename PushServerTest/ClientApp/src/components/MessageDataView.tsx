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
import { ApiClientData, UserData } from '../DataStructures';
import {
    fetchAll,
    selectApiClientDatas,
    selectUserDatas,
    selectStatus
  } from '../reduxStuff/pushMessagesSlice';

const MessageDataView = () => {

    const status = useSelector(selectStatus);
    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const userDatas = useSelector(selectUserDatas) as UserData[];

    const dispatch = useDispatch();

    return (
        <div>
          <h1>Hello from message view</h1>
          <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Button</Button>
          <h2>{status}</h2>

          <Table variant="simple">
            <TableCaption>API Clients</TableCaption>
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

          <Table variant="simple">
            <TableCaption>Users</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>API Client ID</Th>
                <Th>Messages</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                userDatas.map(v => {
                  return <Tr>
                    <Td>{v.id}</Td>
                    <Td>{v.apiClientId}</Td>
                    <Td>{v.messagesCount}</Td>
                  </Tr>
                })
              }
            </Tbody>
          </Table>

        </div>
      );
}

export default MessageDataView;