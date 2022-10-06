import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { Link } from '@mui/material';
import { useHistory, useRouteMatch } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

const headCells = [
    {
        id: 'bookName',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'auther',
        numeric: true,
        disablePadding: false,
        label: 'Auther',
    },
    {
        id: 'categoty',
        numeric: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'language',
        numeric: true,
        disablePadding: false,
        label: 'language',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];

function EnhancedTableHead(props) {

    const { order, orderBy } =
        props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >

                        <Typography variant='h6'> {headCell.label}</Typography>

                        {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                        ) : null}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function BookList() {
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowData, setRowData] = React.useState([]);
    const [needUpdate, setNeedUpdate] = React.useState(true)
    const { path } = useRouteMatch();
    const myHistory = useHistory();

    React.useEffect(() => {
        axios.get('http://localhost:3001/admin/book_list')
            .then(res => {
                console.log(res.data.result);
                setRowData(res.data.result)
            })
    }, [needUpdate])


    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rowData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rowData.length}
                        />
                        <TableBody>

                            {rowData && rowData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.book_id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                {/* <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        /> */}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.book_name}
                                            </TableCell>
                                            <TableCell align="right">{row.auther}</TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                            <TableCell align="right">{row.language}</TableCell>
                                            <TableCell align="right">
                                                <Link
                                                    onClick={() => { myHistory.push(`${path}/edit_book`, { bookId: row.book_id }) }}
                                                    sx={{ marginRight: 2 }}
                                                >
                                                    <EditIcon sx={{ color: '#43a047' }}></EditIcon>
                                                </Link>
                                                <Link
                                                    onClick={() => {
                                                        axios.delete(`http://localhost:3001/admin/delete_book`, {
                                                            params: {
                                                                bookId: row.book_id
                                                            }
                                                        })
                                                            .then(res => {
                                                                if (res.status === 200) {
                                                                    needUpdate ? setNeedUpdate(false) : setNeedUpdate(true)
                                                                }
                                                            })
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ color: '#dd2c00' }}></DeleteIcon>

                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box >
    );
}
