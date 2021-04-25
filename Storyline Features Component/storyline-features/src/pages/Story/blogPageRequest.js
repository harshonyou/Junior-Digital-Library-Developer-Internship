import { Paper, makeStyles } from '@material-ui/core'
import React from 'react'
import EditorForm from '../../components/Story/editorForm'

const useStyles = makeStyles(theme => ({
    pageContent:{
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function BlogPageRequest() {

    const classes = useStyles();

    return (
        <Paper className={classes.pageContent}> 
            <EditorForm/>
        </Paper>
    )
}
