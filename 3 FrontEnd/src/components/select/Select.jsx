import {Box, TextField, Autocomplete} from '@mui/material';

export default function Select({title, data, getValueSelect}) {

    return (
        <Box marginY={1} flexDirection="row" maxWidth={250} width="100%">
            <Autocomplete
                className="select"
                options={data}
                autoHighlight
                onChange={(event, newValue) => {
                    getValueSelect(newValue);
                }}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                    <Box component="li"  {...props}>
                        {option}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title}
                        inputProps={{
                            ...params.inputProps,
                        }}
                    />
                )}
            />
        </Box>
    );
}

