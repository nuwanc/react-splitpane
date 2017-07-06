import React, { Component } from 'react';
import Segment from './Segment';
import Loop from './Loop'

class Transaction extends Component {

    render() {
        let content = this.props.transaction.c.map((v,i)=>{
            switch (v.t) {
                case "segment":
                    return <Segment node={v} key={i}/>
                case "loop":
                    return <Loop node={v} key={i}/>
                case "list":
                    let segments = v.c.map((v,i)=>{
                        return <Segment node={v} key={i}/>
                    })
                    return segments;
                case "loop-list":
                    let loops = v.c.map((v,i)=>{
                        return <Loop node={v} key={i}/>
                    })
                    return loops;
                default:
                    return <Segment node={v} key={i}/>
            }
        })
        return <div>{content}</div>
    }
}

export default Transaction;