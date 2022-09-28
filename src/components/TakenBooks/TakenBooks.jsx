import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const TakenBooks = () => {
    let { location } = useHistory();
    const [takenBooksData, setTakenBooksData] = useState([])
    useEffect(() => {
        const userId = location.state.userId
        axios.get('http://localhost:3001/admin/taken_books', {
            params: {
                userId
            }
        }).then(data => {
                console.log(data.data.result);
                setTakenBooksData(data.data.result);
                // setTableData(data.data.result)
            })
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>SLNO</TableCell>
                        <TableCell>Book Name</TableCell>
                        <TableCell>Auther</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Language</TableCell>
                        <TableCell>Taken Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {takenBooksData&&takenBooksData.map((value,index)=>{
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td,&:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{value.book_name}</TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>{value.category}</TableCell>
                                <TableCell>{value.language}</TableCell>
                                <TableCell>{value.taken_date}</TableCell>
                            </TableRow>

                        )
                    })}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default TakenBooks