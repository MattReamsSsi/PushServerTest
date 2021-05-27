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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack,
    IconButton,
    Tooltip
} from "@chakra-ui/react";
import { ApiClientData } from '../DataStructures';
import {
    selectApiClientDatas,
    addApiClientData,
    setApiIdForUsersFilter,
    editApiDescription
} from '../reduxStuff/pushMessagesSlice';
import { useHistory } from "react-router-dom";

import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ApiClientsView = () => {

    const dispatch = useDispatch();

    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const apiClientDatasToShow = includeDeleted ? apiClientDatas : apiClientDatas.filter(v => !v.isDeleted);
    const history = useHistory();

    const [selectedApi, setSelectedApi] = useState({} as ApiClientData);
    const setSelectedApiDescription = (description: string) => setSelectedApi({...selectedApi, description});

    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

    return (
        <div>

            <AddApiClientModal isOpen={isOpenAdd} onClose={onCloseAdd} />
            <EditApiDescriptionModal isOpen={isOpenEdit} onClose={onCloseEdit} selectedApi={selectedApi} setSelectedApiDescription={setSelectedApiDescription}/>

            <VStack spacing="24px" align='flex-start'>
                <Button colorScheme="blue" onClick={onOpenAdd}>Add API-Client</Button>
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
                                    <HStack spacing="12px">
                                        <Tooltip label="Show Users">
                                            <IconButton aria-label="Show Users" icon={<FontAwesomeIcon icon={faUser}/>} colorScheme="blue"  onClick={() => {
                                                    dispatch(setApiIdForUsersFilter(v.id));
                                                    history.push("/user-data");
                                                }}>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip label="Edit Description">
                                            <IconButton aria-label="Edit Description" icon={<FontAwesomeIcon icon={faEdit}/>} colorScheme="blue" onClick={() => {
                                                setSelectedApi(v);
                                                onOpenEdit();
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

const AddApiClientModal = ({ isOpen, onClose }: any) => {

    const dispatch = useDispatch();
    const [apiGuid, setApiGuid] = useState("");
    const [apiGuidIsValid, setApiGuidIsValid] = useState(false);
    const [apiDescription, setApiDescription] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add User</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div>
                        <h2>Add API-Client:</h2>
                        <Text>API Description: {apiDescription}</Text>
                        <Input placeholder="api description" value={apiDescription} onChange={v => {
                            const val = (v.target as any).value;
                            setApiDescription(val);
                        }} />
                        <Text>API Guid: {apiGuid}, Is Valid: {apiGuidIsValid.toString()}</Text>
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
                        isDisabled={!apiGuidIsValid}
                        onClick={() => {
                            dispatch((addApiClientData as any)({ id: apiGuid, description: apiDescription }));
                            onClose();
                        }}>
                        Commit User Data
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const EditApiDescriptionModal = ({ isOpen, onClose, selectedApi, setSelectedApiDescription }: any) => {

    const dispatch = useDispatch();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User Description</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <div>
                        <h2>API ID: {selectedApi.id}</h2>
                        <Text>API Description: {selectedApi.description}</Text>
                        <Input placeholder="user description" value={selectedApi.description} onChange={v => {
                            const val = (v.target as any).value;
                            setSelectedApiDescription(val);
                        }} />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={() => {
                        dispatch((editApiDescription as any)(selectedApi));
                        onClose();
                    }}>OK</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ApiClientsView;