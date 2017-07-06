import React, { Component } from 'react';
import Store from '../../utils/Store';
import * as EdiHelper from '../../utils/EdiHelper';
import Segment from "./Segment";

class Loop extends Component {
    render() {
        let elements = this.props.node.c.map((v,i)=>{
            if (v.t === "segment") {
                return <Segment node={v} key={i}/>
            } else if (v.t === "loop") {
                return <Loop node={v} key={i}/>
            }
        })
        return <div>{elements}</div>
    }
}

export default Loop;