import React, { Component } from 'react';

class FindViewer extends Component {
    constructor(props) {
        super(props);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
    }

    onFindViewerClick(){
        this.props.onViewerClick('segment 3',0);
    }

    render() {
        return (
            <div>
                Find Viewer<br></br>
                <button onClick={this.onFindViewerClick}>Click Me to Update DocumentViewer</button>
                <button onClick={(e)=>{this.props.openModal(false,{'tabs': true, 'count': 3})}}>Click to Open Modal</button>
            </div>
        )
    }
}

export default FindViewer;