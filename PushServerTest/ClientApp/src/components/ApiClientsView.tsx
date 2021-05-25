import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Checkbox,
    Button,
    VStack,
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
import { ApiClientData } from '../DataStructures';
import {
    selectApiClientDatas
} from '../reduxStuff/pushMessagesSlice';
import { useHistory } from "react-router-dom";

const ApiClientsView = () => {

    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const apiClientDatasToShow = includeDeleted ? apiClientDatas : apiClientDatas.filter(v => !v.isDeleted);
    const history = useHistory();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>

            <AddApiClientModal isOpen={isOpen} onClose={onClose} />

            <VStack spacing="24px" align='flex-start'>
                <Button colorScheme="blue" onClick={onOpen}>Add API-Client</Button>
                <Checkbox
                    isChecked={includeDeleted}
                    onChange={() => setIncludeDeleted(!includeDeleted)}>
                    Include Deleted
                </Checkbox>
            </VStack>

            <Table variant="simple">
                <TableCaption placement='top'>API Clients</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Description</Th>
                        {includeDeleted && <Th>Is Deleted</Th>}
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        apiClientDatasToShow.map(v => {
                            return <Tr>
                                <Td>{v.id}</Td>
                                <Td>{v.description}</Td>
                                {includeDeleted && <Td>{v.isDeleted ? 'true' : ''}</Td>}
                                <Td>
                                    <Button colorScheme="blue" onClick={() => {
                                        history.push("/user-data");
                                    }}>
                                        Show Users
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

const AddApiClientModal = ({ isOpen, onClose }: any) => {

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
                            //dispatch((adduserData as any)({ id: userGuid, apiClientId: apiGuid, messagesCount: 0, description: userDescription }));
                            onClose();
                        }}>
                        Commit User Data
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ApiClientsView;