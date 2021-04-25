import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import React from 'react'

export default function checkbox(props) {
    const { name, label, heading, onChange, value } = props 

    const convertToDefEventPara = (name, value) =>({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormLabel>{heading}</FormLabel>
            <FormControlLabel
                control={<Checkbox
                            name={name}
                            color="primary"
                            checked={value}
                            onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}

                        />}
                label={label}
            />
        </FormControl>
    )
}
