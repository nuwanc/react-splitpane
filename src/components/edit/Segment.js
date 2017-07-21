import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Store from '../../utils/Store';
import * as EdiHelper from '../../utils/EdiHelper';
import * as Utilities from '../../utils/Utilities';

class Segment extends Component {

    constructor(props) {
        super(props);
        this.onSegmentClick = this.onSegmentClick.bind(this);
        this.onElementClick = this.onElementClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.selectedSegment !== nextProps.selectedSegment
    }

    componentDidUpdate() {
        if (this.props.selectedSegment) {
            ReactDOM.findDOMNode(this).scrollIntoView(true);
        }
    }

    componentDidMount() {
        if (this.props.selectedSegment) {
            ReactDOM.findDOMNode(this).scrollIntoView(true);
        }
    }

    onSegmentClick(segment) {
        this.props.openModal(true, { schema: true, title: 'Schema', segment: segment });
        this.props.onSegmentClick(segment.path,1);
    }

    onElementClick(segment,index,compositeIndex) {
        this.props.openModal(true, { segment : segment , index : index, cIndex : compositeIndex });
        this.props.onSegmentClick(segment.path,1);
    }

    render() {
        if (this.props.type === 1) {
            let name;
            let schema = this.props.segment.schema
            let error = Store.lookupErrorSegment(this.props.segment.path);
            if (error !== null) {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null, this.props.segment)}><span className="error" title={error.text}></span>{this.props.segment.name}</span>
            } else {
                name = <span title={schema && schema.description} className="pointer" onClick={this.onSegmentClick.bind(null, this.props.segment)}><span>&nbsp;&nbsp;</span>{this.props.segment.name}</span>
            }
            const elements = this.props.segment && this.props.segment.element.map((v, i) => {

                let title = '';
                let codeDesc = '';

                if (!Array.isArray(v)) {
                    if (Utilities.isNotEmptyArrayOrString(schema) && Utilities.isNotEmptyArrayOrString(schema.element) && Utilities.isNotEmptyArrayOrString(schema.element)) {
                        
                        let details = EdiHelper.getSchemaDetails(schema.element[i].name);
                        if (details.name.startsWith("code") || details.name.startsWith("mpcode")) {
                            if (Utilities.isNotEmptyArrayOrString(details.value)) {
                                //not working in ie
                                /*for (let el of details.value) {
                                    if (el.value === v) {
                                        codeDesc = v + "=" + el.description;
                                        break;
                                    }
                                }*/
                                for (let i = 0, length = details.value; i < length; i++) {
                                    let el = details.value[i];
                                    if (el.value === v) {
                                        codeDesc = v + "=" + el.description;
                                        break;
                                    }
                                }
                            } else if (Utilities.isNotEmptyArrayOrString(details.parts)) {
                                let len = details.parts.length;
                                for (let i = 0; i < len; i++) {
                                    let codes = details.parts[i];
                                    //not working in ie
                                    /*for (let el of codes) {
                                        if (el.value === v) {
                                            codeDesc = v + "=" + el.description;
                                            break;
                                        }
                                    }*/
                                    for (let i = 0, length = codes.length; i < length; i++) {
                                        let el = codes[i];
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
                    let delimiter = Store.delimiters[1];
                    return <span key={i}><span>{delimiter}</span><span title={title} className="pointer" onClick={this.onElementClick.bind(null,this.props.segment,i)}>{v}</span></span>
                } else {
                    //composite
                    let composite = [];
                    let details = null;
                    if (Utilities.isNotEmptyArrayOrString(schema) && Utilities.isNotEmptyArrayOrString(schema.element) && Utilities.isNotEmptyArrayOrString(schema.element)) {
                        details = EdiHelper.getSchemaDetails(schema.element[i].name);
                    }

                    v.forEach((c, ci) => {
                        let key = i + "_" + ci;
                        let element;

                        if (Utilities.isNotEmptyArrayOrString(details) && Utilities.isNotEmptyArrayOrString(details.element)) {
                            element = details.element[ci];
                            let  cDetails = EdiHelper.getSchemaDetails(element.name);

                            if (cDetails.name.startsWith("code") || cDetails.name.startsWith("mpcode")) {
                                if (Utilities.isNotEmptyArrayOrString(cDetails.value)) {
                                    //not working in ie
                                    /*for (let el of cDetails.value) {
                                        if (el.value === c) {
                                            codeDesc = c + "=" + el.description;
                                            break;
                                        }
                                    }*/
                                    for (let i = 0, length = cDetails.value.length; i < length; i++){
                                        let el = cDetails.value[i];
                                        if (el.value === c) {
                                            codeDesc = c + "=" + el.description;
                                            break;
                                        }
                                    }
                                } else if (Utilities.isNotEmptyArrayOrString(cDetails.parts)) {
                                    let len = cDetails.parts.length;
                                    for (let i = 0; i < len; i++) {
                                        let codes = cDetails.parts[i];
                                        //not working in ie
                                        /*for (let el of codes) {
                                            if (el.value === c) {
                                                codeDesc = c + "=" + el.description;
                                                break;
                                            }
                                        }*/
                                        for (let i = 0, length = codes.length; i < length; i++){
                                            let el = codes[i];
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
                            let delimiter = Store.delimiters[1];
                            composite.push(<span key={key}><span>{delimiter}</span><span title={title} className="pointer" onClick={this.onElementClick.bind(null,this.props.segment,i,ci)}>{c}</span></span>);
                        } else {
                            let delimiter = Store.delimiters[2];
                            composite.push(<span key={key}><span>{delimiter}</span><span title={title} className="pointer" onClick={this.onElementClick.bind(null,this.props.segment,i,ci)}>{c}</span></span>);
                        }
                    })

                    return composite;
                }


            })
            if (this.props.selectedSegment) {
                return <div className="edit-segment"><span className="highlight">{name}{elements}</span></div>
            } else {
                return <div className="edit-segment">{name}{elements}</div>
            }

        } else {
            return <div></div>;
        }
    }
}

export default Segment;