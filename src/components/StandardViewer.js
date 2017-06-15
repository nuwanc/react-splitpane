import React, { Component } from 'react';

class StandardViewer extends Component {

    constructor(props) {
        super(props)
        this.onStandardClick = this.onStandardClick.bind(this);
    }

    onStandardClick() {
        this.props.onViewerClick('segment 1',1);
    }
    
    render() {
        return (
            <div>
                Standard Viewer <br></br>
                <button onClick={this.onStandardClick}>Click Me to Update DocumentViewer</button>
                <button onClick={(e)=>{this.props.openModal(true,{ content:'test content', display: 'true'})}}>Click to Open Modal</button>
            </div>
        );
    }
}

export default StandardViewer;