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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    HStack
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
    setApiIdForUsersFilter,
    removeUserData,
    editUserDescription
} from '../reduxStuff/pushMessagesSlice';

import { faEnvelope, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserDataView = () => {

    const dispatch = useDispatch();

    const userDatas = useSelector(selectUserDatas) as UserData[];
    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const apiIdForUsersFilter = useSelector(selectApiIdForUsersFilter) as string;

    const [selectedUser, setSelectedUser] = useState({} as UserData);
    const { isOpen: isOpenAddUser, onOpen: onOpenAddUser, onClose: onCloseAddUser } = useDisclosure();
    const { isOpen: isOpenSendMessage, onOpen: onOpenSendMessage, onClose: onCloseSendMessage } = useDisclosure();
    const { isOpen: isOpenRemoveUserData, onOpen: onOpenRemoveUserData, onClose: onCloseRemoveUserData } = useDisclosure();
    const { isOpen: isOpenEditUserDescription, onOpen: onOpenEditUserDescription, onClose: onCloseEditUserDescription } = useDisclosure();

    const filteredUserDatas = apiIdForUsersFilter === "" ? userDatas : userDatas.filter(v => v.apiClientId === apiIdForUsersFilter);

    const setSelectedUserDescription = (description: string) => setSelectedUser({...selectedUser, description});

    return (
        <div>

            <AddUserDataModal isOpen={isOpenAddUser} onClose={onCloseAddUser} />
            <SendMessageModal isOpen={isOpenSendMessage} onClose={onCloseSendMessage} selectedUser={selectedUser} />
            <RemoveUserModal isOpen={isOpenRemoveUserData} onClose={onCloseRemoveUserData} selectedUser={selectedUser}/>
            <EditUserDescriptionModal isOpen={isOpenEditUserDescription} onClose={onCloseEditUserDescription} selectedUser={selectedUser} setSelectedUserDescription={setSelectedUserDescription}/>

            <Button colorScheme="blue" onClick={onOpenAddUser}>Add User Data</Button>

            <Select placeholder="filter by API-Client" value={apiIdForUsersFilter} onChange={event => {
                dispatch(setApiIdForUsersFilter((event.target as any).value));
            }}>
                {apiClientDatas.map(v => { { return (<option value={v.id} key={v.id}>{v.id}: {v.description}</option>); } })}
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
                            return <Tr key={v.id + v.apiClientId}>
                                <Td>{v.description}</Td>
                                <Td>{v.id}</Td>
                                <Td>{v.apiClientId}</Td>
                                <Td>{v.messagesCount}</Td>
                                <Td>
                                    <HStack spacing="12px">
                                        <Tooltip label="Send Message">
                                            <IconButton aria-label="Send Message" icon={<FontAwesomeIcon icon={faEnvelope}/>} colorScheme="blue" onClick={() => {
                                                setSelectedUser(v);
                                                onOpenSendMessage();
                                            }}>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip label="Edit Description">
                                            <IconButton aria-label="Edit Description" icon={<FontAwesomeIcon icon={faEdit}/>} colorScheme="blue" onClick={() => {
                                                setSelectedUser(v);
                                                onOpenEditUserDescription();
                                            }}>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip label="Remove User Data">
                                            <IconButton aria-label="Remove User Data" icon={<FontAwesomeIcon icon={faTrash}/>} colorScheme="blue" onClick={() => {
                                                setSelectedUser(v);
                                                onOpenRemoveUserData();
                                            }}>
                                            </IconButton>
                                        </Tooltip>
                                    </HStack>
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

const SendMessageModal = ({ isOpen, onClose, selectedUser }: any) => {

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
                        <h2>API Client ID: {selectedUser.apiClientId}</h2>
                        <h2>User ID: {selectedUser.id}</h2>
                        <Text>Title: {title}</Text>
                        <Input placeholder="title" value={title} onChange={v => setTitle((v.target as any).value)} />
                        <Text>Body: {messageBody}</Text>
                        <Input placeholder="message body" value={messageBody} onChange={v => setMessageBody((v.target as any).value)} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() =>{
                        setTitle("");
                        setMessageBody("");
                        onClose();
                    }}>
                        Close
                    </Button>
                    <Button colorScheme="blue" onClick={() => {
                        dispatch((sendPushMessage as any)({ ...selectedUser, title: title, messageBody: messageBody }));
                        setTitle("");
                        setMessageBody("");
                        onClose();
                    }}>Send</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const RemoveUserModal = ({ isOpen, onClose, selectedUser }: any) => {

    const dispatch = useDispatch();
    const description = selectedUser.description;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Remove User</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div>
                        <h2>User ID: {selectedUser.id}</h2>
                        <h2>Description: {description}</h2>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={() => {
                        dispatch((removeUserData as any)(selectedUser));
                        onClose();
                    }}>OK</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const EditUserDescriptionModal = ({ isOpen, onClose, selectedUser, setSelectedUserDescription }: any) => {

    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User Description</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div>
                        <h2>User ID: {selectedUser.id}</h2>
                        <Text>User Description: {selectedUser.description}</Text>
                        <Input placeholder="user description" value={selectedUser.description} onChange={v => {
                            const val = (v.target as any).value;
                            setSelectedUserDescription(val);
                        }} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={() => {
                        dispatch((editUserDescription as any)(selectedUser));
                        onClose();
                    }}>OK</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserDataView;