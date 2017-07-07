import React, { Component } from 'react';
import Store from '../../utils/Store';
import * as EdiHelper from '../../utils/EdiHelper';
import * as Utilities from '../../utils/Utilities';

class Segment extends Component {
    render() {
        let schema = Store.lookupSegmentPath(this.props.node.p);
        let elements = this.props.node.e.map((v,i)=>{
            if (Utilities.isNotEmptyArrayOrString(schema) && Utilities.isNotEmptyArrayOrString(schema.element) && Utilities.isNotEmptyArrayOrString(v)) {
                let details = EdiHelper.getSchemaDetails(schema.element[i].name);
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
            <div style={{marginLeft:'30px'}}>
                <section className="segment segment-marker">
                    <header className="title" style={{width : '90%'}}>{schema.description}</header>
                    {elements}
                </section>
            </div>
        )
    }
}

export default Segment;