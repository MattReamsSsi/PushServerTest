import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    IconButton,
    Tooltip,
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
    useDisclosure,
    Select
} from "@chakra-ui/react";
import { ApiClientData, UserData, PushMessage } from '../DataStructures';
import {
    fetchAll,
    selectApiClientDatas,
    selectUserDatas,
    selectStatus,
    sendPushMessage,
    addUserData,
    selectApiIdForUsersFilter,
    setApiIdForUsersFilter
} from '../reduxStuff/pushMessagesSlice';

import { faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDataView = () => {

    const dispatch = useDispatch();

    const userDatas = useSelector(selectUserDatas) as UserData[];
    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const apiIdForUsersFilter = useSelector(selectApiIdForUsersFilter) as string;

    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedApiId, setSelectedApiId] = useState("");
    const { isOpen: isOpenAddUser, onOpen: onOpenAddUser, onClose: onCloseAddUser } = useDisclosure();
    const { isOpen: isOpenSendMessage, onOpen: onOpenSendMessage, onClose: onCloseSendMessage } = useDisclosure();
    const { isOpen: isOpenRemoveUserData, onOpen: onOpenRemoveUserData, onClose: onCloseRemoveUserData } = useDisclosure();

    const filteredUserDatas = apiIdForUsersFilter === "" ? userDatas : userDatas.filter(v => v.apiClientId === apiIdForUsersFilter);

    return (
        <div>

            <AddUserDataModal isOpen={isOpenAddUser} onClose={onCloseAddUser} />
            <SendMessageModal isOpen={isOpenSendMessage} onClose={onCloseSendMessage} apiClientId={selectedApiId} userId={selectedUserId} />

            <Button colorScheme="blue" onClick={onOpenAddUser}>Add User Data</Button>

            <Select placeholder="filter by API-Client" value={apiIdForUsersFilter} onChange={event => {
                dispatch(setApiIdForUsersFilter((event.target as any).value));
            }}>
                {apiClientDatas.map(v => {{return (<option value={v.id} key={v.id}>{v.id}</option>);}})}
            </Select>

            <Table variant="simple">
                <TableCaption placement='top'>Users</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Description</Th>
                        <Th>ID</Th>
                        <Th>API Client ID</Th>
                        <Th>Messages</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        filteredUserDatas.map(v => {
                            return <Tr key={v.id+v.apiClientId}>
                                <Td>{v.description}</Td>
                                <Td>{v.id}</Td>
                                <Td>{v.apiClientId}</Td>
                                <Td>{v.messagesCount}</Td>
                                <Td>
                                    <Tooltip label="Send Message">
                                        <IconButton aria-label="Send Message" icon={<FontAwesomeIcon icon={faEnvelope}/>} colorScheme="blue" onClick={() => {
                                                setSelectedUserId(v.id);
                                                setSelectedApiId(v.apiClientId);
                                                onOpenSendMessage();
                                            }}>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip label="Remove User Data">
                                        <IconButton aria-label="Remove User Data" icon={<FontAwesomeIcon icon={faTrash}/>} colorScheme="blue" onClick={() => {
                                                setSelectedUserId(v.id);
                                                setSelectedApiId(v.apiClientId);
                                                onOpenSendMessage();
                                            }}>
                                        </IconButton>
                                    </Tooltip>
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

const AddUserDataModal = ({ isOpen, onClose }: any) => {

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
                        }} />
                        <Text>UserGuid: {userGuid}, Is Valid: {userGuidIsValid.toString()}</Text>
                        <Input placeholder="userGuid" value={userGuid} onChange={v => {
                            const val = (v.target as any).value;
                            setUserGuid(val);
                            setUserGuidIsValid(guidPattern.test(val));
                        }} />
                        <Text>ApiGuid: {apiGuid}, Is Valid: {apiGuidIsValid.toString()}</Text>
                        <Input placeholder="apiGuid" value={apiGuid} onChange={v => {
                            const val = (v.target as any).value;
                            setApiGuid(val);
                            setApiGuidIsValid(guidPattern.test(val));
                        }} />

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
                            dispatch((addUserData as any)({ id: userGuid, apiClientId: apiGuid, messagesCount: 0, description: userDescription }));
                            onClose();
                        }}>
                        Commit User Data
              </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const SendMessageModal = ({ isOpen, onClose, apiClientId, userId }: any) => {

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
                        <Input placeholder="title" value={title} onChange={v => setTitle((v.target as any).value)} />
                        <Text>Body: {messageBody}</Text>
                        <Input placeholder="message body" value={messageBody} onChange={v => setMessageBody((v.target as any).value)} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
            </Button>
                    <Button colorScheme="blue" onClick={() => {
                        dispatch((sendPushMessage as any)({ apiClientId: apiClientId, userId: userId, title: title, messageBody: messageBody }));
                        onClose();
                    }}>Send</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const RemoveUserModal = ({ isOpen, onClose, userId, userDatas }: any) => {

    const dispatch = useDispatch();
    const user = userDatas.filter((v: any) => v.id === userId)[0];
    const description = user === undefined ? '' : user.description;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Remove User</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div>
                        <h2>User ID: {userId}</h2>
                        <h2>Description: {description}</h2>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
            </Button>
                    <Button colorScheme="blue" onClick={() => {
                        //dispatch((sendPushMessage as any)({ apiClientId: apiClientId, userId: userId, title: title, messageBody: messageBody }));
                        onClose();
                    }}>OK</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserDataView;