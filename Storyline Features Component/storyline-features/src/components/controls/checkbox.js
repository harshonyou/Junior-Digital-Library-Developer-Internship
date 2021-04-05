import { Checkbox, FormControl, FormControlLabel } from '@material-ui/core'
import React from 'react'

export default function checkbox(props) {
    const { name, label, onChange, value } = props 

    const convertToDefEventPara = (name, value) =>({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
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
