import { Mail, Map, Person, PhoneAndroid } from '@mui/icons-material';
import {Card, CardActions, CardContent, Typography, Avatar, IconButton} from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';


export default function CardsUsers() {
    
    const {arrayUsers, arrayFiltred} = useContext(Context)
    const [arrayTable, setArrayTable] = useState(arrayUsers)

    useEffect(() => {
        setArrayTable(arrayFiltred.length > 0?arrayFiltred:arrayUsers)
    }, [arrayUsers, arrayFiltred])
    
    return (
        <Box marginY={5} flexDirection="row" display="flex" flexWrap="wrap" justifyContent="space-evenly">
            {arrayTable.map((item) => (
                <CardUser key={item.id} item={item}/>       
            ))}
        </Box>
    );
}


export function CardUser ({item}) {
  return (
    <Card sx={{ width: "90%", maxWidth:350, margin:1}} elevation={3}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
            {item.name}
        </Typography>
        <Box display="flex" justifyContent="center" flexDirection="column" width="100%" alignItems="center">
            <Avatar sx={{ bgcolor: "secondary", padding:1}} >
                <Person fontSize="large"/>
            </Avatar>
            <Typography variant="body2" color="text.secondary">            
                {item.username}
            </Typography>
        </Box>
      </CardContent>
      <CardActions>
            <IconButton>
                <Mail/>
            </IconButton>
            <IconButton>
                <Map/>
            </IconButton>
            <IconButton>
                <PhoneAndroid/>
            </IconButton>
      </CardActions>
    </Card>
  );
}