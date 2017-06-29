import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Store from '../utils/Store'
import * as EdiHelper from '../utils/EdiHelper';

class Segment extends Component {

    constructor(props) {
        super(props);
        this.onSegmentClick = this.onSegmentClick.bind(this);
    }

    componentDidUpdate() {
        if (this.props.selectedSegment) {
            ReactDOM.findDOMNode(this).scrollIntoView({block: 'end', behavior: 'smooth'});
        }
    }

    onSegmentClick(path) {
        this.props.onSegmentClick(path);
    }

    render() {
        if (this.props.type === 0) {
            return <div><h1>HTML view</h1></div>
        } else if (this.props.type === 1) {
            let name;
            let schema = this.props.segment.schema
            if (Store.lookupErrorSegment(this.props.segment.path)) {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null,this.props.segment.path)}><span style={{ color : 'red' }}>x</span>{this.props.segment.name}</span>
            } else {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null,this.props.segment.path)}><span>&nbsp;&nbsp;</span>{this.props.segment.name}</span>
            }
            const elements = this.props.segment.element.map((v, i) => {
                
                let title = '';
                if (schema && schema.element != null && schema.element.length > 0) {
                    let codeDesc = '';
                    let details = EdiHelper.getSchemaDetails(schema.element[i].name);
                    if (details.name.startsWith("code") || details.name.startsWith("mpcode")) {
                        if (details.value) {
                            for (let el of details.value) {
                                if (el.value === v) {
                                    codeDesc = v + "=" + el.description;
                                    break;
                                }
                            }
                        } else if (details.parts) {
                            let len = details.parts.length;
                            for (let i=0; i<len; i++) {
                                let codes = details.parts[i];
                                for (let el of codes) {
                                    if ( el.value === v) {
                                        codeDesc = v + "=" + el.description;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    title = details && details.description;
                    title = title + '\n' + codeDesc
                }
                return <span key={i} title={title} className="pointer">*{v}</span>
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