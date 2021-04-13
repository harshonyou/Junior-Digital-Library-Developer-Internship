import React from 'react'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import Image from '@editorjs/image'
import SimpleImage from '@editorjs/simple-image'
import Paragraph from '@editorjs/paragraph'
import ParagraphWithAlignment from 'editorjs-paragraph-with-alignment'
import DragDrop from 'editorjs-drag-drop'

import ImageAndText from '../../../node_modules/editorjs-imageandtext'



const outputData = {"time":1618239103595,"blocks":[{"type":"header","data":{"text":"This is Heading","level":2}}],"version":"2.20.0"}


export default function editor() {
    const editor = new EditorJS({
        autofocus: true,
        onReady: () => {
            new DragDrop(editor);
        },
        // onChange: () => {console.log('Now I know that Editor\'s content changed!')},
        tools: {
            header: {
                class: Header,
                inlineToolbar: ['link']
            },
            list: {
                class: List,
                inlineToolbar: ['link', 'bold']
            },
            embed: {
                class: Embed, 
                inlineToolbar: false,
                config: {
                    services: {
                        youtube: true,
                        coub: true
                    }
                }
            },
            image: {
                class: Image,
                config: {
                    endpoints: {
                        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                    }
                }
            },
            image: SimpleImage,
            paragraph: {
                class: ParagraphWithAlignment,
                inlineToolbar: true,
            },
            imageAndText: {
                class: ImageAndText,
                config: {
                    endpoints: {
                        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                    }
                }
            }
        },
        defaultBlock: "paragraph",
        // logLevel: 'ERROR',
        logLevel: 'VERBOSE',
        // readOnly: true, // Can be used as render thing
        data: outputData
    });

    editor.isReady
        .then(() => {
            console.log('Editor.js is ready to work!')
            /** Do anything you need after editor initialization */
        })
        .catch((reason) => {
            console.log(`Editor.js initialization failed because of ${reason}`)
        });

    const handleSaveData = () => {
        // editor.save().then(output => console.log(output.blocks)).catch(e => console.log(e))
        editor.save().then(output => localStorage.setItem('_temp', JSON.stringify(output))).catch(e => console.log(e))
        
    }
    const handleToggle = () => {
        editor.readOnly.toggle();
    }

    const handleClear = () => {
        editor.clear();
    }

    return (
        <>
        <div id="editorjs"></div>
        <button onClick={handleSaveData}>Save</button>
        <button onClick={handleToggle}>Toggle</button>
        <button onClick={handleClear} id="clearButton">Clear</button>
        </>
    )
}
