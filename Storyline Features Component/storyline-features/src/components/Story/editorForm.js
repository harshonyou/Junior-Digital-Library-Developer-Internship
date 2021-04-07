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

export default function editor() {
    const editor = new EditorJS({
        autofocus: true,
        onReady: () => {
            new DragDrop(editor);
        },
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
        }
    });

    const handleSaveData = () => {
        editor.save().then(output => console.log(output)).catch(e => console.log(e))
        
    }

    return (
        <>
        <div id="editorjs"></div>
        <button onClick={handleSaveData}>Save</button>
        </>
    )
}
