import { Paper, makeStyles } from '@material-ui/core'
import React from 'react'
import SlideShowForm from '../../components/Story/slideShowForm'

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function SlideShowRequest() {

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}> 
            <SlideShowForm/>
        </Paper>
    )
}
