import React, { Component } from 'react';
import * as EdiHelper from '../../utils/EdiHelper';
import * as Utilities from '../../utils/Utilities';

class Segment extends Component {

    constructor(props) {
        super(props);
        this.onSegmentClick = this.onSegmentClick.bind(this);
    }

    onSegmentClick(segment) {
        this.props.openModal(true, { schema: true, title: 'Schema', segment: segment });
        this.props.onSegmentClick(segment.path, 0);
    }

    render() {
        let segment = EdiHelper.processSegment(this.props.node, false);

        if (segment.name === "ST") {
            let element = segment.element[0];
            let details = EdiHelper.getSchemaDetails(segment.schema.element[0].name);
            if (details.name.startsWith("code")) {
                if (Utilities.isNotEmptyArrayOrString(details.value)) {
                    let code = {};
                    for (let i = 0, length = details.value.length; i < length; i++) {
                        let el = details.value[i];
                        if (el.value === element) {
                            code = el;
                            break;
                        }
                    }

                    return (
                        <h4 style={{ marginLeft: '30px' }}>{code.description}</h4>
                    )
                }
            }
        }

        if (segment.name === "DTM") {
            let content;
            let description = segment.schema.description;
            let value = segment.element[1];
            let codeValue = segment.element[0];
            let details = EdiHelper.getSchemaDetails(segment.schema.element[0].name);
            if (details.name.startsWith("code")) {
                let code = {};
                for (let i = 0, length = details.value.length; i < length; i++) {
                    let el = details.value[i];
                    if (el.value === codeValue) {
                        code = el;
                        break;
                    }
                }
                content = <div onClick={this.onSegmentClick.bind(null, segment)}><span>{code.description}</span>:<span>{value}</span></div>
            } else {
                content = <div onClick={this.onSegmentClick.bind(null, segment)}><span>{codeValue}</span>:<span>{value}</span></div>
            }

            return (
                <div style={{ marginLeft: '30px' }}>
                    <section className="segment segment-marker">
                        <header className="title" style={{ width: '90%' }}>{description}</header>
                        {content}
                    </section>
                </div>
            )
        }

        if (segment.name === "AMT") {
            let content;
            //let description = segment.schema.description;
            let value = segment.element[1];
            let codeValue = segment.element[0];
            let details = EdiHelper.getSchemaDetails(segment.schema.element[0].name);
            if (details.name.startsWith("code")) {
                let code = {};
                for (let i = 0, length = details.value.length; i < length; i++) {
                    let el = details.value[i];
                    if (el.value === codeValue) {
                        code = el;
                        break;
                    }
                }
                content = <div onClick={this.onSegmentClick.bind(null, segment)}><span style={{ fontWeight: 'bold' }}>{code.description}</span>:<span>{value}</span></div>
            } else {
                content = <div onClick={this.onSegmentClick.bind(null, segment)}><span style={{ fontWeight: 'bold' }}>{codeValue}</span>:<span>{value}</span></div>
            }

            return (
                <div style={{ marginLeft: '20px' }}>
                    <section className="segment segment-marker">
                        {content}
                    </section>
                </div>
            )
        }

        if (segment.name === "N1") {
            let value1 = segment.element[0];
            let value2 = segment.element[1];
            let value3 = segment.element[2];
            let value4 = segment.element[3];
            let content = [];

            let details = EdiHelper.getSchemaDetails(segment.schema.element[0].name);
            if (details.name.startsWith("code")) {
                let code = {};
                for (let i = 0, length = details.value.length; i < length; i++) {
                    let el = details.value[i];
                    if (el.value === value1) {
                        code = el;
                        break;
                    }
                }
                content.push(<div key={0} onClick={this.onSegmentClick.bind(null, segment)}><span style={{ fontWeight: 'bold' }}>{code.description}:</span></div>);
            }
            details = EdiHelper.getSchemaDetails(segment.schema.element[2].name);
            if (details.name.startsWith("code")) {
                let code = {};
                for (let i = 0, length = details.value.length; i < length; i++) {
                    let el = details.value[i];
                    if (el.value === value3) {
                        code = el;
                        break;
                    }
                }
                content.push(<div key={2} onClick={this.onSegmentClick.bind(null, segment)}><span>({code.description}:{value4})</span></div>);
            }

            return (
                <div style={{ marginLeft: '20px' }}>
                    <section className="segment segment-marker">
                        {content}
                    </section>
                </div>
            )
        }

        let elements = segment.element.map((v, i) => {
            if (Utilities.isNotEmptyArrayOrString(segment.schema) && Utilities.isNotEmptyArrayOrString(segment.schema.element) && Utilities.isNotEmptyArrayOrString(v)) {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                if (details.name.startsWith("code")) {
                    if (Utilities.isNotEmptyArrayOrString(details.value)) {
                        let code = {};
                        for (let i = 0, length = details.value.length; i < length; i++) {
                            let el = details.value[i];
                            if (el.value === v) {
                                code = el;
                                break;
                            }
                        }
                        return <div key={i}><span>{details.description}</span><span>:</span><span title={code.value}>{code.description}</span></div>
                    } else {
                        return <div key={i}><span>{details.description}</span><span>:</span><span>{v}</span></div>
                    }
                } else {
                    return <div key={i}><span>{details.description}</span><span>:</span><span>{v}</span></div>
                }
            } else {
                return null;
            }
        })

        return (
            <div style={{ marginLeft: '30px' }} onClick={this.onSegmentClick.bind(null, segment)}>
                <section className="segment segment-marker">
                    <header className="title" style={{ width: '90%' }}>{segment.schema.description}</header>
                    {elements}
                </section>
            </div>
        )
    }
}

export default Segment;