import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { UseForm, Form } from '../Hooks/useForm';
import Controls from '../controls/controls'
import * as slideShowServices from "../services/slideShowServices";

const initialFieldValues = {
    // TODO: Remove Extra Bit of Field 
    basicOrAdvance: false,
    homePage: {layout: "", option: ""},
    creditPage: {layout: "", option: ""},
    otherPages: [{id: 0, content: {layout: "", option: ""}}]
} 

export default function CustomForm() {
    
    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = UseForm(initialFieldValues);

    const addSlideShowPage = () => {
        const modifyValues = values
        modifyValues.otherPages.push({id: 0, content: {layout: "", option: ""}})
        setValues({
            ...modifyValues
        })
    }
    
    const removeSlideShowPage = () => {
        const modifyValues = values
        if(modifyValues.otherPages[1]){
            modifyValues.otherPages.pop({id: 0, content: {layout: "", option: ""}})
            setValues({
                ...modifyValues
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        slideShowServices.insertSlideShowRequest(values)
        resetForm()
        window.alert("Nice")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Checkbox
                        name="basicOrAdvance"
                        label="Basic or Advance"
                        value={values.basicOrAdvance}
                        onChange={handleInputChange}
                    />
                    <Controls.RadioGroup
                        name="homePage"
                        label="Home Page"
                        value={values.homePage}
                        onChange={handleInputChange}
                        items={slideShowServices.getHomePageSlideShowTransitions()}
                    />
                    <Controls.RadioGroup
                        name="creditPage"
                        label="Credit Pages"
                        value={values.creditPage}
                        onChange={handleInputChange}
                        items={slideShowServices.getCreditPageSlideShowTransitions()}
                    />
                    { //(<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                        initialFieldValues.otherPages.map(
                            (item, key) => (
                                <Controls.RadioGroup
                                    // FIXME: key={item.id}
                                    name={"otherPage"+key}
                                    label={"Page Number "+(key+1)}
                                    value={values.otherPages}
                                    onChange={handleInputChange}
                                    items={slideShowServices.getOtherPageSlideShowTransitions()}
                                />
                            )
                        )
                    }
                    <div>
                        <Controls.Button
                            color="default"
                            text="Add Page" 
                            onClick={addSlideShowPage}
                        />
                        <Controls.Button
                            color="secondary"
                            text="Remove Page" 
                            onClick={removeSlideShowPage}
                        />
                    </div>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            color="default"
                            text="Reset" 
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
