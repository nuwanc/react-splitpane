import React, { Component } from 'react';

class HTMLViewer extends Component {
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
        return <div>HTML view</div>
    }
}

export default HTMLViewer;