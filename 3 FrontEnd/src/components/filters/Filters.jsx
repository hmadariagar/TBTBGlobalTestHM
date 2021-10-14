import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import Select from "../select/Select";
import Context from "../../context/Context";
import SelectMultiple from "../selectMulriple/SelectMultiple";


export default function Filters() {
    const {setArrayFiltred} = useContext(Context)
    const [selectedFilter, setSelectedFilter] = useState(null)
   
    const getValueSelect = (filter) => {
        setSelectedFilter(filter)
    }

    useEffect(() => {
        if(!selectedFilter){
            setArrayFiltred([])
        }     
    }, [selectedFilter,setArrayFiltred])

    return(
        <Box marginY={2} flexDirection="row" display="flex" flexWrap="wrap">
            <Select 
                title={"Filtrar datos por"} 
                data={["name","username","email","address"]}
                getValueSelect={getValueSelect}                
            />
            {selectedFilter  &&
                <SelectMultiple 
                    title={"Parametros"} 
                    placeholder={"Agregar un parametro"}
                    selectedFilter={selectedFilter}
                />
            }
            
        </Box>
    )
}