import { useContext, useEffect, useState } from 'react';
import {Autocomplete, TextField, Stack} from '@mui/material';
import Context from '../../context/Context';

export default function SelectMultiple({title, placeholder, selectedFilter}) {
    
    const {arrayUsers, setArrayFiltred} = useContext(Context)
    const [options, setOptions] = useState([])
    const [selectedParam, setSelectedParam] = useState([])


    useEffect(() => {
        findByParam(selectedParam)
    }, [selectedParam])
    
    const findByParam = (selectedParam) => {
        let arrayTemp = []
        selectedParam.forEach(param => {
            let result = getCoincidences(param)
            arrayTemp = [...arrayTemp, ...result]
        });
        const myUniqueArray = [...new Set(arrayTemp)];
        setArrayFiltred(myUniqueArray)
    }
   

    const getCoincidences = (param) => {
        if(selectedFilter === "address"){
            const result = arrayUsers.filter(element => element.address.city.toLowerCase().includes(param.toLowerCase()));
            return(result);
        }
        const result = arrayUsers.filter(element => element[selectedFilter].toLowerCase().includes(param.toLowerCase()));
        return(result);
    }

    
    useEffect(() => {
        setSelectedParam([])
        if(!selectedFilter){
            return(setOptions([]))
        }
        if(selectedFilter === "address"){
            let arrayCities = arrayUsers.map(name => name["address"].city)
            return(setOptions(arrayCities))
        }
        setOptions(arrayUsers.map(name => name[selectedFilter]))  
    }, [selectedFilter, arrayUsers])


return (
    <Stack sx={{ width: "100%" }}>
        <Autocomplete
            multiple
            freeSolo
            options={options}
            value={selectedParam}
            onChange={(event, newValue) => {
                setSelectedParam(newValue)
              }}
            // onInputChange={(e)=>console.log(e)}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
            <TextField
                {...params}
                label={title}
                placeholder={placeholder}
            />
            )}
        />
    </Stack>
);
}