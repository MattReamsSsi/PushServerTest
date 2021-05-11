import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

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
  sendPushMessage
} from '../reduxStuff/pushMessagesSlice';

const MessageDataView = () => {

  let match = useRouteMatch();

  const status = useSelector(selectStatus);
  const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
  const userDatas = useSelector(selectUserDatas) as UserData[];

  const dispatch = useDispatch();

  return (
    <div>
      <h2>Route Match: {match.path}</h2>

      <h2>{status}</h2>
      <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Fetch Data</Button>

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
                <Td>
                  <Button colorScheme="blue">
                    <Link to={`${match.url}/sendMessage/${v.apiClientId}/${v.id}`}>Send Message</Link>
                  </Button>
                </Td>
              </Tr>
            })
          }
        </Tbody>
      </Table>

      <Switch>
        <Route path={`${match.path}/sendMessage/:apiClientId/:userId`}>
          <SendMessageView/>
        </Route>
        <Route path={match.path}>
          {/* nothing */}
        </Route>
      </Switch>

    </div>
  );
}

const SendMessageView = () => {
  const dispatch = useDispatch();
  const { apiClientId, userId }: { apiClientId: string, userId: string } = useParams();
  const [title, setTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  return (
    <div>
      <h2>Send Message:</h2>
      <h2>API Client ID: {apiClientId}</h2>
      <h2>User ID: {userId}</h2>
      <Text>Title: {title}</Text>
      <Text>Body: {messageBody}</Text>
      <Input placeholder="title" value={title} onChange={v => setTitle((v.target as any).value)}/>
      <Input placeholder="message body" value={messageBody} onChange={v => setMessageBody((v.target as any).value)}/>
      <Button colorScheme="blue" onClick={() => dispatch((sendPushMessage as any)({apiClientId: apiClientId, userId: userId, title: title, messageBody: messageBody}))}>Send</Button>
    </div>)
}

export default MessageDataView;