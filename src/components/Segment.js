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
            ReactDOM.findDOMNode(this).scrollIntoView({ block: 'end', behavior: 'smooth' });
        }
    }

    onSegmentClick(segment) {
        this.props.openModal(true, { schema: true, title: 'Schema', segment: segment });
        this.props.onSegmentClick(segment.path);
    }

    render() {
        if (this.props.type === 1) {
            let name;
            let schema = this.props.segment.schema
            if (Store.lookupErrorSegment(this.props.segment.path)) {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null, this.props.segment)}><span style={{ color: 'red' }}>x</span>{this.props.segment.name}</span>
            } else {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null, this.props.segment)}><span>&nbsp;&nbsp;</span>{this.props.segment.name}</span>
            }
            const elements = this.props.segment.element.map((v, i) => {

                let title = '';
                let codeDesc = '';

                if (!Array.isArray(v)) {
                    if (schema && schema.element != null && schema.element.length > 0) {
                        
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
                                for (let i = 0; i < len; i++) {
                                    let codes = details.parts[i];
                                    for (let el of codes) {
                                        if (el.value === v) {
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
                    //TODO : get the segment seperator
                    return <span key={i}><span>*</span><span title={title} className="pointer">{v}</span></span>
                } else {
                    //composite
                    let composite = [];
                    let details = null;
                    if (schema && schema.element != null && schema.element.length > 0) {
                        details = EdiHelper.getSchemaDetails(schema.element[i].name);
                    }

                    v.forEach((c, ci) => {
                        let key = i + "_" + ci;
                        let element;

                        if (details && details.element) {
                            element = details.element[ci];
                            let  cDetails = EdiHelper.getSchemaDetails(element.name);

                            if (cDetails.name.startsWith("code") || cDetails.name.startsWith("mpcode")) {
                                if (cDetails.value) {
                                    for (let el of cDetails.value) {
                                        if (el.value === c) {
                                            codeDesc = c + "=" + el.description;
                                            break;
                                        }
                                    }
                                } else if (cDetails.parts) {
                                    let len = cDetails.parts.length;
                                    for (let i = 0; i < len; i++) {
                                        let codes = cDetails.parts[i];
                                        for (let el of codes) {
                                            if (el.value === c) {
                                                codeDesc = c + "=" + el.description;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            title = cDetails && cDetails.description;
                            title = title + '\n' + codeDesc
                        }

                        if (ci === 0) {
                            composite.push(<span key={key}><span>*</span><span title={title} className="pointer">{c}</span></span>);
                        } else {
                            composite.push(<span key={key}><span>*</span><span title={title} className="pointer">{c}</span></span>);
                        }
                    })

                    return composite;
                }


            })
            if (this.props.selectedSegment) {
                return <div><span className="highlight">{name}{elements}</span></div>
            } else {
                return <div>{name}{elements}</div>
            }

        } else {
            return null;
        }
    }
}

export default Segment;