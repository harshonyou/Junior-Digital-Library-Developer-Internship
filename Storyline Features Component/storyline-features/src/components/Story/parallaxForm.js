import { Grid, Typography } from '@material-ui/core';
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

export default function ParallaxForm() {
    
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

    const handleSlider = e =>{
        const {name, value} = e.target
        // TODO: Create Slider onChange Handler
        // console.log(e.target)
    }

    const handleSlideShowPageChange = e =>{
        const {name, value} = e.target
        const modifyValues = values
        modifyValues.otherPages[name].content.layout = value
        setValues({
            ...modifyValues
        })
    }

    const handleSlideShowPageOptionChange = (e) =>{
        const {name, value} = e.target
        const modifyValues = values
        modifyValues.otherPages[name].content.option = value
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
                                onChange={handleSlider}
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
                    {
                        initialFieldValues.otherPages.map(
                            (item, key) => (
                                <>
                                <Controls.RadioGroup
                                    key={item.id}
                                    name={item.id.toString()}
                                    label={"Page Number "+(key+1)}
                                    value={values.otherPages[key].content.layout}
                                    onChange={handleSlideShowPageChange}
                                    items={slideShowServices.getOtherPageSlideShowTransitions()} 
                                />
                                {
                                    item.content.layout == "" ? "" : (
                                        <Grid container justify="center">
                                            <Controls.RadioGroup
                                                name={item.id.toString()}
                                                label="Options"
                                                value={values.otherPages[key].content.option}
                                                onChange={handleSlideShowPageOptionChange}
                                                items={slideShowServices.getOtherPageOptionsSlideShowTransitions()[item.content.layout-1].options}
                                            />

                                            <Controls.InputText 
                                                name={item.id.toString()}
                                                label="Image"
                                                // value={values.noOfPages}
                                                // onChange={handleInputChange}
                                                // error={errors.noOfPages}
                                            />
                                            <Controls.InputTextArea 
                                                name={item.id.toString()}
                                                label="Text"
                                                // value={values.ideaBrief}
                                                // onChange={handleInputChange}
                                                // error={errors.ideaBrief}
                                            />
                                        </Grid>
                                    )
                                }
                                </>
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
                            // FIXME: reset form does not reset otherPages component
                            onClick={()=> {
                                console.log(initialFieldValues)
                                setValues({
                                    ...initialFieldValues
                                })
                            }} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
