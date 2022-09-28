import React, { useEffect, useState } from 'react'
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Link } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';


const Users = () => {
    const [tableData, setTableData] = useState([]);
    const myHistory = useHistory();
    const { path } = useRouteMatch();
    useEffect(() => {
        axios.get('http://localhost:3001/admin/user_list')
            .then(data => {
                console.log(data.data.result);
                setTableData(data.data.result)
            })
    }, [])

    const handleTakenBooks = (userId) => {
        console.log(userId);
        myHistory.push(`${path}/taken_books`, { userId })
    }
    const handleReturnedBooks = (userId) => {
        console.log(userId);
        myHistory.push(`${path}/reurned_books`, { userId })
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>SLNO</TableCell>
                        <TableCell>FirstName</TableCell>
                        <TableCell>LastName</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
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