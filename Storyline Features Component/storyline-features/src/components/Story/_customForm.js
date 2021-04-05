import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { UseForm, Form } from '../Hooks/useForm';
import Controls from '../controls/controls'
import * as customServices from "../services/customServices";

const initialFieldValues = {
    storyTitle: "",
    collectionName: "",
    category: "male",
    noOfPages: 0,
    areaOfInterest: "",
    ideaBrief: "",
    diffrenceBrief: "",
    isPermanent: false,
    date: new Date()
} 

export default function CustomForm() {
    
    const {
        values,
        setValues,
        handleInputChange
    } = UseForm(initialFieldValues);

    

    return (
        <form>
            <Form>
                <Grid container>
                    <Grid item xs={6}>
                        <Controls.InputText 
                            name="storyTitle"
                            label="Story Title"
                            value={values.storyTitle}
                            onChange={handleInputChange}
                        />
                        <Controls.InputText 
                            name="collectionName"
                            label="Collection Name"
                            value={values.collectionName}
                            onChange={handleInputChange}
                        />
                        <Controls.RadioGroup
                            name="category"
                            label="Gender"
                            value={values.category}
                            onChange={handleInputChange}
                            items={customServices.getGenderItems()}
                        />
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Controls.InputTextArea 
                            name="ideaBrief"
                            label="What idea do you have in mind?"
                            value={values.ideaBrief}
                            onChange={handleInputChange}
                        />
                        <Controls.InputTextArea 
                            name="diffrenceBrief"
                            label="How this is different from provided templates?"
                            value={values.diffrenceBrief}
                            onChange={handleInputChange}
                        />
                        <Controls.Select
                            name="areaOfInterest"
                            label="Area Of Interest"
                            value={values.areaOfInterest}
                            onChange={handleInputChange}
                            options={customServices.getAreaOfInterestCollection()}
                        >
                        </Controls.Select>
                        <Controls.Checkbox
                            name="isPermanent"
                            label="Permantent"
                            value={values.isPermanent}
                            onChange={handleInputChange}
                        >
                        </Controls.Checkbox>
                        <Controls.DataPicker
                            name="date"
                            label="Date"
                            value={values.date}
                            onChange={handleInputChange}
                        >
                        </Controls.DataPicker>
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />
                            <Controls.Button
                                color="default"
                                text="Reset" />
                        </div>
                    </Grid>
                </Grid>
           </Form>
        </form>
    )
}
