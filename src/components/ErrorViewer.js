import React, { Component } from 'react';

class ErrorViewer extends Component {

    constructor(props) {
        super(props);
        this.onErrorViewerClick = this.onErrorViewerClick.bind(this);
    }

    onErrorViewerClick() {
        this.props.onViewerClick('segment 2',1);
    }

    render() {
        return (
            <div>
                Error Viewer<br></br>
                <button onClick={this.onErrorViewerClick}>Click Me to Update DocumentViewer</button>
                <button onClick={this.props.openModal}>Click to Open Modal</button>
            </div>
        );
    }
}

export default ErrorViewer;