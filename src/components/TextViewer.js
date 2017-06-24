import React, { Component } from 'react';

class TextViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            viewerHeight: null
        }
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState(() => {
            return {
                viewerHeight: document.getElementById("docPane").clientHeight - 44
            }
        });
    }

    render() {
         console.log('render() TextViewer');
         return <div>Text view</div>
     }
}

export default TextViewer;