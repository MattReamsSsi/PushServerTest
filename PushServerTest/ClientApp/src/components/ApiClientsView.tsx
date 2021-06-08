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
    editApiDescription,
    deleteApiClient,
    restoreApiClient
} from '../reduxStuff/pushMessagesSlice';
import { useHistory } from "react-router-dom";

import { faUser, faEdit, faTrash, faTrashRestore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import YesNoDialog from './YesNoDialog';

const ApiClientsView = () => {

    const dispatch = useDispatch();

    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const [showDeleted, setShowDeleted] = useState(false);
    const apiClientDatasToShow = apiClientDatas.filter(v => v.isDeleted === showDeleted);
    const history = useHistory();

    const [selectedApi, setSelectedApi] = useState({} as ApiClientData);
    const setSelectedApiDescription = (description: string) => setSelectedApi({...selectedApi, description});

    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenRestore, onOpen: onOpenRestore, onClose: onCloseRestore } = useDisclosure();

    return (
        <div>

            <AddApiClientModal isOpen={isOpenAdd} onClose={onCloseAdd} />
            <EditApiDescriptionModal isOpen={isOpenEdit} onClose={onCloseEdit} selectedApi={selectedApi} setSelectedApiDescription={setSelectedApiDescription}/>
            <YesNoDialog
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
                title={'Remove API Client'}
                text={`API ID: ${selectedApi.nodeId}\nDescription: ${selectedApi.description}`}
                onOk={() => dispatch((deleteApiClient as any)(selectedApi))}/>
            <YesNoDialog
                isOpen={isOpenRestore}
                onClose={onCloseRestore}
                title={'Restore API Client'}
                text={`API ID: ${selectedApi.nodeId}\nDescription: ${selectedApi.description}`}
                onOk={() => dispatch((restoreApiClient as any)(selectedApi))}/>

            <VStack spacing="24px" align='flex-start'>
                <Button colorScheme="blue" onClick={onOpenAdd}>Add API-Client</Button>
                <Checkbox
                    isChecked={showDeleted}
                    onChange={() => setShowDeleted(!showDeleted)}>
                    Show Deleted
                </Checkbox>
            </VStack>

            <Table variant="simple">
                <TableCaption placement='top'>API Clients</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Description</Th>
                        <Th>ID</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        showDeleted
                        ? apiClientDatasToShow.map(v => {
                            return <Tr>
                                <Td>{v.description}</Td>
                                <Td>{v.nodeId}</Td>
                                <Td>
                                    <HStack spacing="12px">
                                        <Tooltip label="Remove API Client">
                                            <IconButton aria-label="Undo Delete" icon={<FontAwesomeIcon icon={faTrashRestore}/>} colorScheme="blue" onClick={() => {
                                                setSelectedApi(v);
                                                onOpenRestore();
                                            }}>
                                            </IconButton>
                                        </Tooltip>
                                    </HStack>
                                </Td>
                            </Tr>
                        })
                        : apiClientDatasToShow.map(v => {
                            return <Tr>
                                <Td>{v.description}</Td>
                                <Td>{v.nodeId}</Td>
                                <Td>
                                    <HStack spacing="12px">
                                        <Tooltip label="Show Users">
                                            <IconButton aria-label="Show Users" icon={<FontAwesomeIcon icon={faUser}/>} colorScheme="blue"  onClick={() => {
                                                    dispatch(setApiIdForUsersFilter(v.nodeId));
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
                                        <Tooltip label="Remove API Client">
                                            <IconButton aria-label="Remove User Data" icon={<FontAwesomeIcon icon={faTrash}/>} colorScheme="blue" onClick={() => {
                                                setSelectedApi(v);
                                                onOpenDelete();
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

const AddApiClientModal = ({ isOpen, onClose }: any) => {

    const dispatch = useDispatch();
    const [apiNodeId, setApiNodeId] = useState("");
    const [apiDescription, setApiDescription] = useState("");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add API Client</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div>
                        <h2>Add API-Client:</h2>
                        <Text>API Description: {apiDescription}</Text>
                        <Input placeholder="api description" value={apiDescription} onChange={v => {
                            const val = (v.target as any).value;
                            setApiDescription(val);
                        }} />
                        <Text>API Node ID: {apiNodeId}</Text>
                        <Input placeholder="api node id" value={apiNodeId} onChange={v => {
                            const val = (v.target as any).value;
                            setApiNodeId(val);
                        }} />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        colorScheme="blue"
                        isDisabled={!apiNodeId}
                        onClick={() => {
                            dispatch((addApiClientData as any)({ nodeId: apiNodeId, description: apiDescription }));
                            onClose();
                        }}>
                        Commit API Data
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