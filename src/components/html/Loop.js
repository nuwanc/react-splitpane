import React, { Component } from 'react';
import Segment from "./Segment";

class Loop extends Component {
    render() {
        let elements = this.props.node.c.map((v,i)=>{
            if (v.t === "segment") {
                return <Segment node={v} key={i} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick}/>
            } else if (v.t === "loop") {
                return <Loop node={v} key={i}/>
            } else if (v.t === "list"){
                let segments = v.c.map((v,i)=>{
                        return <Segment node={v} key={i} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick}/>
                })
                return segments;
            } else if (v.t === "loop-list") {
                let loops = v.c.map((v,i)=>{
                        return <Loop node={v} key={i} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick}/>
                })
                return loops;
            } else {
                return <Segment node={v} key={i} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick}/>
            }
        })
        return <div>{elements}</div>
    }
}

export default Loop;