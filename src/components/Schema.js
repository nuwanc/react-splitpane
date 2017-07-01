import React, { Component } from 'react';
import Store from '../utils/Store';
import LazyLoadTree from './LazyLoadTree';

class Schema extends Component {

    render() {
        let node = Store.lookupSegmentPath(this.props.segment.path);
        let elements = this.props.segment.element.map((v,i)=>{
                    if (!Array.isArray(v)) {
                        return <span className="pointer" key={i}>*{v}</span>
                    } else {
                        // process composite
                        return <span className="pointer" key={i}>*{v}</span>
                    }
        });

        

        return (
            <div className="schema">
                <h5>Segment Path:{this.props.segment.path}</h5>
                <div>Content:{this.props.segment.name}{elements}</div>
                <LazyLoadTree node={node} root={false} toggleOnLoad={true}/>
            </div>
        );
    }
}

export default Schema;