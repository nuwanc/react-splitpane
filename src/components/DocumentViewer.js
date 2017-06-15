import React, { Component } from 'react';

class DocumentViewer extends Component {
    
    render() {
        return (
            <div>
                Document Viewer {this.props.docType} <br></br>
                Selected Node is:{this.props.selectedNode} <br></br>
                Selected Segment is:{this.props.selectedSegment} <br></br>
                <button onClick={this.props.openModal}>Click to Open Modal</button>
            </div>
        )
    }
}


export default DocumentViewer;