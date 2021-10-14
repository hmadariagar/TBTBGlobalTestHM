import { useContext, useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableFooter} from '@mui/material';
import Context from '../../context/Context';
import { Box } from '@mui/system';


export default function ListUsers() {
    
    const {arrayUsers, arrayFiltred} = useContext(Context)
    const arrayHeader = ["name", "username", "email", "address"]
    const [arrayTable, setArrayTable] = useState(arrayUsers)

    useEffect(() => {
        setArrayTable(arrayFiltred.length > 0?arrayFiltred:arrayUsers)
    }, [arrayUsers, arrayFiltred])

    return (
        <Box marginY={5} flexDirection="row" display="flex" flexWrap="wrap">
            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {arrayHeader.map((item) => (
                                <ItemHead  key={item} item={item}/>       
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrayTable.map((item) => (
                            <ItemRow key={item.id} item={item}/>                   
                        ))}
                    </TableBody>
                    <TableFooter>   
                        <TableRow>   
                            <TableCell align="left">
                                <Typography 
                                    variant="body2" 
                                    component="span"
                                >
                                    {arrayFiltred.length > 0? 
                                    arrayFiltred.length + " Coincidencias Encontradas"
                                    :
                                    arrayUsers.length + " Usuarios"
                                    }
                                </Typography>
                            </TableCell> 
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box>
    );
}


export const ItemHead = ({item}) => {
    return(
        <TableCell key={item} variant='head'>
            <div className="headerList">
                <Typography 
                    variant="h6" 
                    component="h2"
                    color="primary"
                >
                        {item.toUpperCase()}
                </Typography>
            </div>
        </TableCell> 
    )
} 

export const ItemRow = ({item}) => {
    const {name, username, email, address} = item
    return(
        <TableRow
            key={item.username}
            className="itemRow"
        >
            <TableCell align="left">{name}</TableCell> 
            <TableCell align="left">{username}</TableCell> 
            <TableCell align="left">{email}</TableCell> 
            <TableCell align="left">{address.city}</TableCell> 
        </TableRow>
    )

} 

