import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'

const initialFieldValues = {
    templateRequest: 0,
    customRequest: 0,
    templateOption: 0,
    customOption: 0

}

export default function RequestForm() {
    
    const [values, setValues] = useState();

    return (
        <form>
           <Grid container>
               <Grid item xs={6}>
                   Hey
               </Grid>
               <Grid item xs={6}>
                   Hi!
               </Grid>
           </Grid>
        </form>
    )
}
