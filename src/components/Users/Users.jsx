import React, { useEffect, useState } from 'react'
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Link,
    TableSortLabel
} from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';

const TableHeader = (props) => {

    const { valueToOrderBy, orderDirection, handleRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow>

                <TableCell>SLNO</TableCell>
                <TableCell key="first_name">
                    <TableSortLabel
                        active={valueToOrderBy === "first_name"}
                        direction={valueToOrderBy === "first_name" ? orderDirection : 'asc'}
                        onClick={createSortHandler("first_name")}
                    >
                        FirstName
                    </TableSortLabel>
                </TableCell>
                <TableCell key="last_name">
                    <TableSortLabel
                        active={valueToOrderBy === "last_name"}
                        direction={valueToOrderBy === "last_name" ? orderDirection : 'asc'}
                        onClick={createSortHandler("last_name")}
                    >
                        LastName
                    </TableSortLabel>
                </TableCell>
                <TableCell key="email">
                    <TableSortLabel
                        active={valueToOrderBy === "email"}
                        direction={valueToOrderBy === "email" ? orderDirection : 'asc'}
                        onClick={createSortHandler("email")}
                    >
                        Email
                    </TableSortLabel>
                </TableCell>
                <TableCell key="phone">
                    <TableSortLabel
                        active={valueToOrderBy === "phone"}
                        direction={valueToOrderBy === "phone" ? orderDirection : 'asc'}
                        onClick={createSortHandler("phone")}
                    >
                        Phone
                    </TableSortLabel>
                </TableCell>

                <TableCell>Actions</TableCell>
            </TableRow>
        </TableHead>
    )
}





const Users = () => {

    const [tableData, setTableData] = useState([]);
    const [orderDirection, setOrderDirection] = useState('asc');
    const [valueToOrderBy, setValueToOrderBy] = useState('first_name')

    const myHistory = useHistory();
    const { path } = useRouteMatch();

    useEffect(() => {
        axios.get('http://localhost:3001/admin/user_list', {
            params: {
                orderDirection, valueToOrderBy
            }
        })
            .then(data => {
                console.table(data.data.result);
                setTableData(data.data.result);
            })
    }, [orderDirection, valueToOrderBy])

    // SORTING--------------------------------

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc');
        setValueToOrderBy(property);
        setOrderDirection(isAscending ? 'desc' : 'asc');


    }

    // ROUTINGS--------------------------------
    const handleTakenBooks = (userId) => {
        console.log(userId);
        myHistory.push(`${path}/taken_books`, { userId })
    }
    const handleReturnedBooks = (userId) => {
        console.log(userId);
        myHistory.push(`${path}/reurned_books`, { userId })
    }
    // ---------------------------------------

    return (
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHeader
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    handleRequestSort={handleRequestSort}
                />
                <TableBody>
                    {tableData && tableData.map((value, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td,&:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{value.first_name}</TableCell>
                                <TableCell>{value.last_name}</TableCell>
                                <TableCell>{value.email}</TableCell>
                                <TableCell>{value.phone}</TableCell>
                                <TableCell>
                                    <Link
                                        onClick={() => handleTakenBooks(value.user_id)}
                                        sx={{ marginRight: 2 }}
                                    ><LibraryBooksIcon color='success' /></Link>
                                    <Link
                                        onClick={() => handleReturnedBooks(value.user_id)}
                                    ><HistoryIcon /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })
                    }

                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default Users