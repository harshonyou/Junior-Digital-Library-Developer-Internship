import * as React from "react"

import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

const Parallax = () => (
    <>
        I'm Working
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            style={{paddingTop:"20px"}}
            spacing={4}>
            <Grid item style={{background: "Grey"}}>
                <Paper style={{height:75, }}>
                    hey pappi
                </Paper>
            </Grid>
            <Grid item>
                <Paper style={{height:75, }}></Paper>
            </Grid>
        </Grid>
        Yikes
    </>
)

export default Parallax
