import { makeStyles, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react'

const useStyles = makeStyles(theme => ({
    root:{
        width: '100% !important'
    }
}))

export default function AutoComplete(props) {
    const {name, label, onChange, options} = props;

    const classes = useStyles();
    
    return (
        <Autocomplete
            className={classes.root}
            options={options}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
            renderInput={(params) => <
                TextField {...params} 
                label={label}
                variant="outlined" 
                name={name}
                onChange={onChange}
                />}
        /> 
    )
}
