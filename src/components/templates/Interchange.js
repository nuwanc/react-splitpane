import React, { Component } from 'react';
import * as EdiHelper from '../../utils/EdiHelper';

class Interchange extends Component {
    render() {
        let segment = EdiHelper.processSegment(this.props.segment);
        let elements = segment.element.map((v,i)=>{
            if (segment.schema && segment.schema.element) {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                return <div key={i}><span>{details.description}</span><span>:</span><span>{v}</span></div>
            }
        });

        let headers;
        let rows;

        if (this.props.group) {
            
            let segment = EdiHelper.processSegment(this.props.group[0].GS);
            headers = segment.element.map((v,i)=>{
                if (segment.schema && segment.schema.element){
                    let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                    return <th>{details.description}</th>
                }
            });

            rows = this.props.group.map((v,i)=>{
                let gs = v.GS;
                let tds = gs.e.map((v,i)=>{
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

export default Interchange;