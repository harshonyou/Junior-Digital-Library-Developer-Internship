import { Slider, Tooltip, Typography } from '@material-ui/core';
import React from 'react'

export default function slider(props) {
    
    const {name, label, value, onChange} = props

    function ValueLabelComponent(props) {
        const { children, open, value } = props;
        return (
            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    return (
        <>
        <Typography variant="body2" gutterBottom>{label}</Typography>
        <Slider
            ValueLabelComponent={ValueLabelComponent}
            name={name}
            value={value}
            aria-label={label}
            onChange={onChange}
        />
        </>
    )
}
