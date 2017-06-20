import React, { Component } from 'react';
import Store from '../utils/Store';
import JSPath from 'jspath';

class DocumentViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading : true
        }
    }
    
    render() {
        let json = '';
        if (this.props.selectedNode) {
            json = JSON.stringify(JSPath.apply('.'+this.props.selectedNode.replace(new RegExp('/', 'g'),'.'),Store.message),null,2);
        }

        let divStyle = {
           maxHeight : this.props.viewerHeight
        }

        return (
            <div className="doc" style={divStyle}>
                Document Viewer {this.props.docType} <br></br>
                Selected Node is:{this.props.selectedNode} <br></br>
                Selected Segment is:{this.props.selectedSegment} <br></br>
                <button onClick={(e)=>{this.props.openModal(true,{'tabs': true, 'count': 3})}}>Click to Open Modal</button>
                <pre>{json}</pre>
            </div>
        )
    }
}


export default DocumentViewer;