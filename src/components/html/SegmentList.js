import React, { Component } from 'react';
import Segment from './Segment';
import * as EdiHelper from '../../utils/EdiHelper';

class SegmentList extends Component {
    constructor(props) {
        super(props);
        this.onSegmentClick = this.onSegmentClick.bind(this);
    }

    onSegmentClick(segment) {
        this.props.openModal(true, { schema: true, title: 'Schema', segment: segment });
        this.props.onSegmentClick(segment.path, 0);
    }

    render() {
        let segments;
        let node = this.props.node;
        let first = node.c[0];
        let description = "";

        if (first.n === "REF") {
            segments = node.c.map((v, i) => {
                let segment = EdiHelper.processSegment(v, false);
                description = segment.schema.description;
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
                    return <div key={i} onClick={this.onSegmentClick.bind(null, segment)}><span>{code.description}</span>:<span>{value}</span></div>
                } else {
                    return <div key={i} onClick={this.onSegmentClick.bind(null, segment)}><span>{codeValue}</span>:<span>{value}</span></div>
                }
            })
            return (
                <div style={{ marginLeft: '30px' }}>
                    <section className="segment segment-marker">
                    <header className="title" style={{ width: '90%' }}>{description}</header>
                        {segments}
                    </section>
                </div>
            )
        } else {
            segments = node.c.map((v, i) => {
                return <Segment node={v} key={i} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick} />
            })
        }


        return <div>{segments}</div>
    }
}

export default SegmentList;