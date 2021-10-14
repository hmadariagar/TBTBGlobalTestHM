import { useEffect, useState } from "react";
import Context from "./context/Context";
import { Container, Typography, Box, IconButton } from "@mui/material";
import ListUsers from "./components/listUsers/ListUsers";
import { getData } from "./services/services";
import Filters from "./components/filters/Filters";
import CardsUsers from "./components/cardsUsers/CardsUsers";
import { Apps, ViewList } from "@mui/icons-material";

function App() {

    const [arrayUsers, setArrayUsers] = useState([])
    const [arrayFiltred, setArrayFiltred] = useState([])
    const [modeList, setModeList] = useState(true)
    
    useEffect(() => {
        getData().then(azucar => (setArrayUsers(azucar)))
    }, [])
    
    return (
         <Context.Provider value={{arrayUsers, setArrayUsers, arrayFiltred, setArrayFiltred}}>
            <div className="App">
                <Container maxWidth="lg">
                    <Box marginY={2} display="flex" width="100%" justifyContent="space-between">
                        <Typography variant="h4" component="h1" color="primary">
                            Lista de Usuarios
                        </Typography>
                        
                        <IconButton
                            onClick={()=>setModeList(!modeList)}                        
                        >
                            {modeList?
                                <Apps color="primary" fontSize="large"/>
                            :
                                <ViewList color="primary" fontSize="large"/>
                            }
                        </IconButton>
                    </Box>
                        
                    <Filters/>
                    {modeList?
                        <ListUsers/>
                    :                    
                        <CardsUsers/>
                    }
                </Container>
            </div>
        </Context.Provider>
    );
}



export default App;
