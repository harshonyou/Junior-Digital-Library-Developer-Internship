import { Paper, makeStyles } from '@material-ui/core'
import React from 'react'
import CustomForm from '../../components/Story/customForm'

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function CustomRequest() {

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}> 
            <CustomForm/>
        </Paper>
    )
}
