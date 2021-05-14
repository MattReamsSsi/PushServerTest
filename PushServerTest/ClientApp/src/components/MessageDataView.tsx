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

      <Button colorScheme="blue">
        <Link to={`${match.url}/addUser`}>Add UserData</Link>
      </Button>

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
        <Route path={`${match.path}/addUser`}>
          {<AddUserDataView/>}
        </Route>
        <Route path={match.path}>
          {/* nothing */}
        </Route>
      </Switch>

    </div>
  );
}

const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const AddUserDataView = () => {
  const [userGuid, setUserGuid] = useState("");
  const [apiGuid, setApiGuid] = useState("");
  const [userGuidIsValid, setUserGuidIsValid] = useState(false);
  const [apiGuidIsValid, setApiGuidIsValid] = useState(false);

  return (
    <div>
      <h2>Add User:</h2>
      <Text>UserGuid: {userGuid}, Is Valid: {userGuidIsValid.toString()}</Text>
      <Input placeholder="userGuid" value={userGuid} onChange={v => {
        const val = (v.target as any).value;
        setUserGuid(val);
        setUserGuidIsValid(guidPattern.test(val));
      }}/>
      <Text>ApiGuid: {apiGuid}, Is Valid: {apiGuidIsValid.toString()}</Text>
      <Input placeholder="apiGuid" value={apiGuid} onChange={v => {
        const val = (v.target as any).value;
        setApiGuid(val);
        setApiGuidIsValid(guidPattern.test(val));
      }}/>
      <Button colorScheme="blue" isDisabled={!(userGuidIsValid && apiGuidIsValid)}>Commit User Data</Button>
    </div>);
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
      <Input placeholder="title" value={title} onChange={v => setTitle((v.target as any).value)}/>
      <Text>Body: {messageBody}</Text>
      <Input placeholder="message body" value={messageBody} onChange={v => setMessageBody((v.target as any).value)}/>
      <Button colorScheme="blue" onClick={() => dispatch((sendPushMessage as any)({apiClientId: apiClientId, userId: userId, title: title, messageBody: messageBody}))}>Send</Button>
    </div>)
}

export default MessageDataView;