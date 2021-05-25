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
  Text,
  //Modal
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
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

const UserDataView = () => {

  const status = useSelector(selectStatus);
  const userDatas = useSelector(selectUserDatas) as UserData[];

  const dispatch = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedApiId, setSelectedApiId] = useState("");
  const { isOpen: isOpenAddUser, onOpen: onOpenAddUser, onClose: onCloseAddUser } = useDisclosure();
  const { isOpen: isOpenSendMessage, onOpen: onOpenSendMessage, onClose: onCloseSendMessage } = useDisclosure();

  return (
    <div>

      <AddUserDataModal isOpen={isOpenAddUser} onClose={onCloseAddUser}/>
      <SendMessageModal isOpen={isOpenSendMessage} onClose={onCloseSendMessage} apiClientId={selectedApiId} userId={selectedUserId}/>

      <Button colorScheme="blue" onClick={() => dispatch(fetchAll())}>Refresh Data ({status})</Button>

      <Button colorScheme="blue" onClick={onOpenAddUser}>Add User Data</Button>

      <Table variant="simple">
        <TableCaption placement='top'>Users</TableCaption>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>ID</Th>
            <Th>API Client ID</Th>
            <Th>Messages</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            userDatas.map(v => {
              return <Tr>
                <Td>{v.description}</Td>
                <Td>{v.id}</Td>
                <Td>{v.apiClientId}</Td>
                <Td>{v.messagesCount}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => {
                    setSelectedUserId(v.id);
                    setSelectedApiId(v.apiClientId);
                    onOpenSendMessage();
                  }}>
                    Send Message
                  </Button>
                </Td>
              </Tr>
            })
          }
        </Tbody>
      </Table>

    </div>
  );
}

const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const AddUserDataModal = ({isOpen, onClose}: any) => {

  const dispatch = useDispatch();
  const [userGuid, setUserGuid] = useState("");
  const [apiGuid, setApiGuid] = useState("");
  const [userGuidIsValid, setUserGuidIsValid] = useState(false);
  const [apiGuidIsValid, setApiGuidIsValid] = useState(false);
  const [userDescription, setUserDescription] = useState("");

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div>
              <h2>Add User:</h2>
              <Text>User Description: {userDescription}</Text>
              <Input placeholder="user description" value={userDescription} onChange={v => {
                const val = (v.target as any).value;
                setUserDescription(val);
              }}/>
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
              
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
                colorScheme="blue"
                isDisabled={!(userGuidIsValid && apiGuidIsValid)}
                onClick={() => {
                  dispatch((adduserData as any)({id: userGuid, apiClientId: apiGuid, messagesCount: 0, description: userDescription}));
                  onClose();
                }}>
                  Commit User Data
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

const SendMessageModal = ({isOpen, onClose, apiClientId, userId}: any) => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Message</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
          <div>
            <h2>API Client ID: {apiClientId}</h2>
            <h2>User ID: {userId}</h2>
            <Text>Title: {title}</Text>
            <Input placeholder="title" value={title} onChange={v => setTitle((v.target as any).value)}/>
            <Text>Body: {messageBody}</Text>
            <Input placeholder="message body" value={messageBody} onChange={v => setMessageBody((v.target as any).value)}/>
          </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={() => {
              dispatch((sendPushMessage as any)({apiClientId: apiClientId, userId: userId, title: title, messageBody: messageBody}));
              onClose();
              }}>Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default UserDataView;