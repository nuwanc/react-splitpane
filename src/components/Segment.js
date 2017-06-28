import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Store from '../utils/Store'
import * as EdiHelper from '../utils/EdiHelper';

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
            let name;
            let schema = this.props.segment.schema
            if (Store.lookupErrorSegment(this.props.segment.path)) {
                name = <span title={schema && schema.description}><span style={{ color : 'red' }}>x</span>{this.props.segment.name}</span>
            } else {
                name = <span title={schema && schema.description}><span>&nbsp;&nbsp;</span>{this.props.segment.name}</span>
            }
            const elements = this.props.segment.element.map((v, i) => {
                let details = null;
                let codeVal = '';
                let title = '';
                if (schema && schema.element != null && schema.element.length > 0) {
                    details = EdiHelper.getSchemaDetails(schema.element[i].name);
                    if (details.name.startsWith("code") || details.name.startsWith("mpcode")) {
                        if (details.value) {
                            for (let el of details.value) {
                                if (el.value === v) {
                                    codeVal = v + "=" + el.description;
                                    break;
                                }
                            }
                        } else if (details.parts) {
                            let len = details.parts.length;
                            for (let i=0; i<len; i++) {
                                let codes = details.parts[i];
                                for (let el of codes) {
                                    if ( el.value === v) {
                                        codeVal = v + "=" + el.description;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    title = details && details.description;
                    title = title + '\n' + codeVal
                }
                return <span key={i} title={title}>*{v}</span>
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