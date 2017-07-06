import React, { Component } from 'react';
import * as EdiHelper from '../../utils/EdiHelper';

class Group extends Component {
    render() {
        let segment = EdiHelper.processSegment(this.props.segment);
        let elements = segment.element.map((v,i)=>{
            if (segment.schema && segment.schema.element && v.trim() !== "") {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                if (details.name.startsWith("code")) {
                    if (details.value) {
                        let code;
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
                return <div></div>
            }
        })

        let headers;
        let rows;

        if (this.props.transaction) {
            
            let segment = EdiHelper.processSegment(this.props.transaction[0].ST);
            headers = segment.element.map((v,i)=>{
                if (segment.schema && segment.schema.element){
                    let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                    return <th key={i}>{details.description}</th>
                } else {
                    return <th></th>
                }
            })

            rows = this.props.transaction.map((v,i)=>{
                let st = v.ST;
                let tds = st.e.map((v,i)=>{
                    return <td key={i}>{v}</td>
                });
                return <tr key={i}>{tds}</tr>
            })
        }
        return (
            <div style={{marginLeft:'30px'}}>
            <section className="segment segment-marker">
                <header className="title" style={{width : '90%'}}>{segment.schema.description}</header>
                {elements}
            </section>
            <table className="table table-bordered" style={{width:'90%'}}>
                <thead>
                    <tr>{headers}</tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        )
    }
}

export default Group;