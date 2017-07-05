import React, { Component } from 'react';
import * as EdiHelper from '../../utils/EdiHelper';

class Interchange extends Component {
    render() {
        let segment = EdiHelper.processSegment(this.props.segment);
        let elements = segment.element.map((v,i)=>{
            if (segment.schema && segment.schema.element) {
                let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                return <div key={i}><span>{details.description}</span><span>:</span><span>{v}</span></div>
            } else {
                return <div></div>
            }
        });

        let headers;
        let rows;

        if (this.props.group) {
            
            let segment = EdiHelper.processSegment(this.props.group[0].GS);
            headers = segment.element.map((v,i)=>{
                if (segment.schema && segment.schema.element){
                    let details = EdiHelper.getSchemaDetails(segment.schema.element[i].name);
                    return <th key={i}>{details.description}</th>
                } else {
                    return <th></th>
                }
            });

            rows = this.props.group.map((v,i)=>{
                let gs = v.GS;
                let tds = gs.e.map((v,i)=>{
                    return <td key={i}>{v}</td>
                });
                return <tr key={i}>{tds}</tr>
            })
        }
        return (
            <div style={{marginLeft:'30px'}}>
            <section className="segment segment-marker">
                <header>{segment.schema.description}</header>
                {elements}
            </section>
            <table className="table table-bordered" style={{width:'70%'}}>
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