import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { UseForm, Form } from '../Hooks/useForm';
import Controls from '../controls/controls'
import * as slideShowServices from "../services/slideShowServices";

const initialFieldValues = { 
    advanceFeatures: false,
    advanceAnimationType: "None",
    advanceAnimationSpeed: "0",
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
        modifyValues.otherPages.push({id: modifyValues.otherPages.length, content: {layout: "", option: ""}})
        setValues({
            ...modifyValues
        })
    }
    
    const removeSlideShowPage = () => {
        const modifyValues = values
        if(modifyValues.otherPages[1]){
            modifyValues.otherPages.pop()
            setValues({
                ...modifyValues
            })
        }
    }

    const handleSlideShowPageChange = e =>{
        const {name, value} = e.target
        const modifyValues = values
        modifyValues.otherPages[name].content.layout = value
        setValues({
            ...modifyValues
        })
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
                        name="advanceFeatures"
                        label="Toggle On"
                        heading="Advance Features"
                        value={values.advanceFeatures}
                        onChange={handleInputChange}
                    />
                    {
                        values.advanceFeatures 
                        ? 
                        (<>
                            <Controls.Select
                                name="advanceAnimationType"
                                label="Animation Type"
                                value={values.advanceAnimationType}
                                onChange={handleInputChange}
                                options={slideShowServices.getAdvanceAnimationType()}
                                // error={errors.areaOfInterest}
                            />
                            {/* FIXME: onChange method is broken for sliders */}
                            <Controls.Slider
                                name="advanceAnimationSpeed"
                                label="Animation Speed"
                                value={values.advanceAnimationSpeed}
                                onChange={handleInputChange}
                            />
                        </>) 
                        : 
                        (<></>)
                    }
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
                    {/* <Controls.RadioGroup
                        name="creditPage"
                        value={values.creditPage}
                        onChange={handleInputChange}
                        items={slideShowServices.getCreditPageSlideShowTransitions()}
                    /> */}
                    {
                        console.log(initialFieldValues.otherPages)
                    }
                    {
                        initialFieldValues.otherPages.map(
                            (item, key) => (
                                <Controls.RadioGroup
                                    key={item.id}
                                    name={item.id.toString()}
                                    label={"Page Number "+(key+1)}
                                    value={values.otherPages[key].content.layout}
                                    onChange={handleSlideShowPageChange}
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
