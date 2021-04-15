class TextOverImage{

    static get toolbox() {
        return {
            title: 'Text Over Image',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" x="0"/></g><g><path d="M22.47,5.2C22,4.96,21.51,4.76,21,4.59v12.03C19.86,16.21,18.69,16,17.5,16c-1.9,0-3.78,0.54-5.5,1.58V5.48 C10.38,4.55,8.51,4,6.5,4C4.71,4,3.02,4.44,1.53,5.2C1.2,5.36,1,5.71,1,6.08v12.08c0,0.58,0.47,0.99,1,0.99 c0.16,0,0.32-0.04,0.48-0.12C3.69,18.4,5.05,18,6.5,18c2.07,0,3.98,0.82,5.5,2c1.52-1.18,3.43-2,5.5-2c1.45,0,2.81,0.4,4.02,1.04 c0.16,0.08,0.32,0.12,0.48,0.12c0.52,0,1-0.41,1-0.99V6.08C23,5.71,22.8,5.36,22.47,5.2z M10,16.62C8.86,16.21,7.69,16,6.5,16 c-1.19,0-2.36,0.21-3.5,0.62V6.71C4.11,6.24,5.28,6,6.5,6C7.7,6,8.89,6.25,10,6.72V16.62z M19,0.5l-5,5V15l5-4.5V0.5z"/></g></svg>'
        };
    }

    constructor({data}){
        this.data = {
            url: data.url || '',
            caption: data.caption || '',
            alt: data.alt || '',
            left: data.left !== undefined ? data.left : false,
            right: data.right !== undefined ? data.right : false,
        };
        this.wrapper = undefined;
        this.settings = [
            {
                name: 'left',
                icon: `
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6 6-6z"/></svg>`
            },
            {
                name: 'right',
                icon: `
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"/></svg>`
            }
            ];
    }

    render(){
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('text-over-image');

        if (this.data && this.data.url){
            this._createImage(this.data.url, this.data.caption);
            return this.wrapper;
        }

        const input = document.createElement('input');

        input.placeholder = 'Paste an image URL...';
        input.addEventListener('paste', (event) => {
        this._createImage(event.clipboardData.getData('text'));
        });

        const alt = document.createElement('input');
        alt.placeholder = 'Alt';

        this.wrapper.appendChild(input);
        this.wrapper.appendChild(alt);

        return this.wrapper;
    }

    _createImage(url, captionText){
        const container = document.createElement('div')
        const image = document.createElement('img');
        
        const text = document.createElement('div')

        const caption = document.createElement('input');

        image.src = url;
        caption.placeholder = 'Caption...';
        caption.value = captionText || '';

        container.classList.add('container');

        text.classList.add('input');
        text.contentEditable = true;
        text.innerHTML = captionText || '';
        text.placeholder = "Description"

        container.appendChild(image)
        container.appendChild(text)

        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(container);
        this.wrapper.appendChild(caption);
    }

    save(blockContent){
        const image = blockContent.querySelector('img');
        const caption = blockContent.querySelector('input');

        return Object.assign(this.data, {
        url: image.src,
        caption: caption.value
        })
    }

    validate(savedData){
        if (!savedData.url.trim()){
            return false;
        }
    
        return true;
    }

    renderSettings(){
        
        const wrapper = document.createElement('div');

        this.settings.forEach( tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            button.innerHTML = tune.icon;
            wrapper.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
                button.classList.toggle('cdx-settings-button--active');
            });
        });

        return wrapper;
    }

    _toggleTune(tune) {
        this.data[tune] = !this.data[tune];
        this._acceptTuneView();
    }

    _acceptTuneView() {
        this.settings.forEach( tune => {
        this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]);
        });
    }

}

// class TextOverImage2 {

//     static get toolbox() {
//         return {
//         title: 'Text Over Image',
//         icon: '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24" x="0"/></g><g><path d="M22.47,5.2C22,4.96,21.51,4.76,21,4.59v12.03C19.86,16.21,18.69,16,17.5,16c-1.9,0-3.78,0.54-5.5,1.58V5.48 C10.38,4.55,8.51,4,6.5,4C4.71,4,3.02,4.44,1.53,5.2C1.2,5.36,1,5.71,1,6.08v12.08c0,0.58,0.47,0.99,1,0.99 c0.16,0,0.32-0.04,0.48-0.12C3.69,18.4,5.05,18,6.5,18c2.07,0,3.98,0.82,5.5,2c1.52-1.18,3.43-2,5.5-2c1.45,0,2.81,0.4,4.02,1.04 c0.16,0.08,0.32,0.12,0.48,0.12c0.52,0,1-0.41,1-0.99V6.08C23,5.71,22.8,5.36,22.47,5.2z M10,16.62C8.86,16.21,7.69,16,6.5,16 c-1.19,0-2.36,0.21-3.5,0.62V6.71C4.11,6.24,5.28,6,6.5,6C7.7,6,8.89,6.25,10,6.72V16.62z M19,0.5l-5,5V15l5-4.5V0.5z"/></g></svg>'
//         };
//     }

//     // static get pasteConfig() {
//     //     return {
//     //         tags: ['IMG'],
//     //         files: {
//     //             mimeTypes: ['image/*'],
//     //             extensions: ['gif', 'jpg', 'png'] 
//     //         },
//     //         patterns: {
//     //             image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i
//     //         }
//     //     }
//     // }

//     /**
//    * Automatic sanitize config
//    */
//     // static get sanitize(){
//     //     return {
//     //         url: false, // disallow HTML
//     //         caption: {} // only tags from Inline Toolbar 
//     //     }
//     // }


//     constructor({data, api, config}){
//         this.api = api;
//         this.config = config || {};
//         this.data = {
//             url: data.url || '',
//             caption: data.caption || '',
//             alignHorizontalLeft: data.alignHorizontalLeft !== undefined ? data.alignHorizontalLeft : false,
//             alignHorizontalCenter: data.alignHorizontalCenter !== undefined ? data.alignHorizontalCenter : false,
//             alignHorizontalRight: data.alignHorizontalRight !== undefined ? data.alignHorizontalRight : false,
//             alignVerticalTop: data.alignVerticalTop !== undefined ? data.alignVerticalTop : false,
//             alignVerticalCenter: data.alignVerticalCenter !== undefined ? data.alignVerticalCenter : false,
//             alignVerticalBottom: data.alignVerticalBottom !== undefined ? data.alignVerticalBottom : false,
//         };
//         this.wrapper = undefined;
//         this.settings = [
//             {
//                 name: 'alignHorizontalLeft',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4,22H2V2h2V22z M22,7H6v3h16V7z M16,14H6v3h10V14z"/></svg>`
//             },
//             {
//                 name: 'alignHorizontalCenter',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="11,2 13,2 13,7 21,7 21,10 13,10 13,14 18,14 18,17 13,17 13,22 11,22 11,17 6,17 6,14 11,14 11,10 3,10 3,7 11,7"/></svg>`
//             },
//             {
//                 name: 'alignHorizontalRight',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M20,2h2v20h-2V2z M2,10h16V7H2V10z M8,17h10v-3H8V17z"/></svg>`
//             },
//             {
//                 name: 'alignVerticalTop',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M22,2v2H2V2H22z M7,22h3V6H7V22z M14,16h3V6h-3V16z"/></svg>`
//             },
//             {
//                 name: 'alignVerticalCenter',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><polygon points="22,11 17,11 17,6 14,6 14,11 10,11 10,3 7,3 7,11 1.84,11 1.84,13 7,13 7,21 10,21 10,13 14,13 14,18 17,18 17,13 22,13"/></svg>`
//             },
//             {
//                 name: 'alignVerticalBottom',
//                 icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M22,22H2v-2h20V22z M10,2H7v16h3V2z M17,8h-3v10h3V8z"/></svg>`
//             }
//         ];
//     }

//     render(){
//         this.wrapper = document.createElement('div');
//         this.wrapper.classList.add('text-over-image');

//         if (this.data && this.data.url){
//             this._createImage(this.data.url, this.data.caption);
//             return this.wrapper;
//         }

//         const input = document.createElement('input');

//         input.placeholder = this.api.i18n.t(this.config.placeholder || 'Paste an image URL...');
//         input.addEventListener('paste', (event) => {
//             this._createImage(event.clipboardData.getData('text'));
//         });
        
//         this.wrapper.appendChild(input);

//         return this.wrapper;
//     }

//     _createImage(url, captionText){
//         const image = document.createElement('img');
//         const caption = document.createElement('div');

//         image.src = url;
//         // caption.placeholder = 'Caption...';
//         caption.contentEditable = true;
//         caption.innerHTML = captionText || '';

//         this.wrapper.innerHTML = '';
//         this.wrapper.appendChild(image);
//         this.wrapper.appendChild(caption);

//         this._acceptTuneView();
//     }

//     save(blockContent){
//         const image = blockContent.querySelector('img');
//         const caption = blockContent.querySelector('[contenteditable]');
//         const sanitizerConfig = {
//             b: true, 
//             a: {
//                 href: true
//             },
//             i: true
//         };

//         return Object.assign(this.data, {
//             url: image.src,
//             // caption: this.api.sanitizer.clean(caption.innerHTML || '', sanitizerConfig),
//             caption: caption.innerHTML || ''
//         });
//     }

//     // validate(savedData){
//     //     if (!savedData.url.trim()){
//     //         return false;
//     //     }
    
//     //     return true;
//     // }

//     renderSettings(){
//         const wrapper = document.createElement('div');
    
//         this.settings.forEach( tune => {
//             let button = document.createElement('div');

//             button.classList.add(this.api.styles.settingsButton);
//             button.classList.toggle(this.api.styles.settingsButtonActive, this.data[tune.name]);
//             button.innerHTML = tune.icon;
//             wrapper.appendChild(button);

//             button.addEventListener('click', () => {
//                 this._toggleTune(tune.name);
//                 button.classList.toggle(this.api.styles.settingsButtonActive);
//             });
//         });
    
//         return wrapper;
//     }

// //     /**
// //    * @private
// //    * Click on the Settings Button
// //    * @param {string} tune — tune name from this.settings
// //    */
// //     _toggleTune(tune) {
// //         this.data[tune] = !this.data[tune];
// //         this._acceptTuneView();
// //     }

// //     /**
// //    * Add specified class corresponds with activated tunes
// //    * @private
// //    */
// //     _acceptTuneView() {
// //         this.settings.forEach( tune => {
// //             this.wrapper.classList.toggle(tune.name, !!this.data[tune.name]);

// //             if (tune.name === 'stretched') {
// //                 this.api.blocks.stretchBlock(this.api.blocks.getCurrentBlockIndex(), !!this.data.stretched);
// //             }
// //         });
// //     }

//     // onPaste(event){
//     //     switch (event.type){
//     //         case 'tag':
//     //             const imgTag = event.detail.data;

//     //             this._createImage(imgTag.src);
//     //             break;
//     //         case 'tag':
//     //             const file = event.detail.file;
//     //             const reader = new FileReader();

//     //             reader.onload = (loadEvent) => {
//     //             this._createImage(loadEvent.target.result);
//     //             };

//     //             reader.readAsDataURL(file);
//     //             break;
//     //         case 'pattern':
//     //             const src = event.detail.data;
        
//     //             this._createImage(src);
//     //             break;
//     //     }
//     // }

// }
