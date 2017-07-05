import React, { Component } from 'react';
import * as EdiHelper from '../../utils/EdiHelper';

class Group extends Component {
    render() {
        let segment = EdiHelper.processSegment(this.props.segment);
        let elements = segment.element.map((v,i)=>{
            if (segment.schema && segment.schema.element) {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                return <div key={i}><span>{details.description}</span><span>:</span><span>{v}</span></div>
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
                    return <th>{details.description}</th>
                } else {
                    return <th></th>
                }
            })

            rows = this.props.transaction.map((v,i)=>{
                let st = v.ST;
                let tds = st.e.map((v,i)=>{
                    return <td>{v}</td>
                });
                return <tr>{tds}</tr>
            })
        }
        return (
            <div>
            <section>
                {elements}
            </section>
            <table>
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