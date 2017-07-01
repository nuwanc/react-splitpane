import React, { Component } from 'react';
import Store from '../utils/Store';
import LazyLoadTree from './LazyLoadTree';

class Schema extends Component {

    render() {
        let node = Store.lookupSegmentPath(this.props.path);
        return (
            <div className="schema">
                <h5>{this.props.path}</h5>
                <LazyLoadTree node={node} root={false} toggleOnLoad={true}/>
            </div>
        );
    }
}

export default Schema;