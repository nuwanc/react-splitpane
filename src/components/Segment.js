import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Segment extends Component {

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        if (this.props.selectedSegment) {
            ReactDOM.findDOMNode(this).scrollIntoView({block: 'end', behavior: 'smooth'});
        }
    }

    render() {
        if (this.props.type === 0) {
            return <div><h1>HTML view</h1></div>
        } else if (this.props.type === 1) {
            const name = <span>{this.props.segment.name}</span>
            const elements = this.props.segment.element.map((v, i) => {
                return <span key={i}>*{v}</span>
            })
            if (this.props.selectedSegment) {
                return <div><span className="highlight">{name}{elements}</span></div>
            } else {
                return <div>{name}{elements}</div>
            }
            
        } else if (this.props.type === 2) {
            return <div><h1>Text view</h1></div>
        }
    }
}

export default Segment;