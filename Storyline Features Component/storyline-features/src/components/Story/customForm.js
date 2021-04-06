import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { UseForm, Form } from '../Hooks/useForm';
import Controls from '../controls/controls'
import * as customServices from "../services/customServices";

const initialFieldValues = {
    storyTitle: "",
    collectionName: "",
    category: "male",
    noOfPages: "",
    areaOfInterest: "",
    ideaBrief: "",
    diffrenceBrief: "",
    isPermanent: false,
    date: new Date()
} 

export default function CustomForm() {

    const validate = (feildValues = values) => {
        let temp = {...errors}
        if("storyTitle" in feildValues)
            temp.storyTitle = feildValues.storyTitle ? "" : "Story Title Is Required!"
        if("collectionName" in feildValues)
            temp.collectionName = feildValues.collectionName ? "" : "Collection Name Is Required!"
        if("noOfPages" in feildValues)
            temp.noOfPages = feildValues.noOfPages.length !=0 ? "" : "Number Of Pages Is Required!"
        if("ideaBrief" in feildValues)
            temp.ideaBrief = feildValues.ideaBrief.length !=0 ? "" : "Brief Of An Idea Is Required!"
        if("areaOfInterest" in feildValues)
            temp.areaOfInterest = feildValues.areaOfInterest.length !=0 ? "" : "Area Of Interest Is Required!"
        setErrors({
            ...temp
        })

        if(feildValues==values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = UseForm(initialFieldValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate()){
            customServices.insertCustomRequest(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.InputText 
                        name="storyTitle"
                        label="Story Title"
                        value={values.storyTitle}
                        onChange={handleInputChange}
                        error={errors.storyTitle}
                    />
                    <Controls.InputText 
                        name="collectionName"
                        label="Collection Name"
                        value={values.collectionName}
                        onChange={handleInputChange}
                        error={errors.collectionName}
                    />
                    <Controls.AutoComplete
                        name="category"
                        label="Category"
                        onChange={handleInputChange}
                        options={customServices.getCategoryItems()}
                    />
                    <Controls.InputText 
                        name="noOfPages"
                        label="Number of Pages"
                        value={values.noOfPages}
                        onChange={handleInputChange}
                        error={errors.noOfPages}
                    />
                    <Controls.Select
                        name="areaOfInterest"
                        label="Area Of Interest"
                        value={values.areaOfInterest}
                        onChange={handleInputChange}
                        options={customServices.getAreaOfInterestCollection()}
                        error={errors.areaOfInterest}
                    />
                    
                </Grid>
                <Grid item xs={6}>
                    <Controls.InputTextArea 
                        name="ideaBrief"
                        label="What idea do you have in mind?"
                        value={values.ideaBrief}
                        onChange={handleInputChange}
                        error={errors.ideaBrief}
                    />
                    <Controls.InputTextArea 
                        name="diffrenceBrief"
                        label="How this is different from provided templates?"
                        value={values.diffrenceBrief}
                        onChange={handleInputChange}
                    />
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
