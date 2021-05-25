import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Checkbox
} from "@chakra-ui/react";
import { ApiClientData } from '../DataStructures';
import {
    selectApiClientDatas
} from '../reduxStuff/pushMessagesSlice';

const ApiClientsView = () => {

    const apiClientDatas = useSelector(selectApiClientDatas) as ApiClientData[];
    const [includeDeleted, setIncludeDeleted] = useState(false);
    const apiClientDatasToShow = includeDeleted ? apiClientDatas : apiClientDatas.filter(v => !v.isDeleted);

    return (
        <div>
            <Checkbox
                isChecked={includeDeleted}
                onChange={() => setIncludeDeleted(!includeDeleted)}>
                Include Deleted
            </Checkbox>
            <Table variant="simple">
                <TableCaption placement='top'>API Clients</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Description</Th>
                        {includeDeleted && <Th>Is Deleted</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        apiClientDatasToShow.map(v => {
                            return <Tr>
                                <Td>{v.id}</Td>
                                <Td>{v.description}</Td>
                            </Tr>
                        })
                    }
                </Tbody>
            </Table>
        </div>
    );
}

export default ApiClientsView;