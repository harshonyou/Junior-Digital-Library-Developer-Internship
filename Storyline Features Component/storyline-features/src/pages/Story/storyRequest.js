import { makeStyles } from '@material-ui/core'
import React from 'react'
import RequestForm from '../../components/Story/requestForm'

const useStyles = makeStyles(theme => ({
    root:{
        width: '80%',
        margin: theme.spacing(1),
        backgroundColor: 'grey'
    }
}))

export default function StoryRequest() {
    const classes = useStyles();
    return (
        <RequestForm className={classes.root}/>
    )
}
 