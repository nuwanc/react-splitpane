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
        this.props.onSegmentClick(segment.path,0);
    }

    render() {
        let segment = EdiHelper.processSegment(this.props.node,false);

        let elements = segment.element.map((v,i)=>{
            if (Utilities.isNotEmptyArrayOrString(segment.schema) && Utilities.isNotEmptyArrayOrString(segment.schema.element) && Utilities.isNotEmptyArrayOrString(v)) {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                if (details.name.startsWith("code")) {
                    if (Utilities.isNotEmptyArrayOrString(details.value)) {
                        let code = {};
                        for (let i=0,length = details.value.length;i < length; i++) {
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
            <div style={{marginLeft:'30px'}} onClick={this.onSegmentClick.bind(null,segment)}>
                <section className="segment segment-marker">
                    <header className="title" style={{width : '90%'}}>{segment.schema.description}</header>
                    {elements}
                </section>
            </div>
        )
    }
}

export default Segment;