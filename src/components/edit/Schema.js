import React, { Component } from 'react';
import LazyLoadTree from '../tree/LazyLoadTree';
import Store from '../../utils/Store';

class Schema extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedElement : null
        };
        this.onElementClick = this.onElementClick.bind(this);
    }

    onElementClick(i) {
        this.setState(()=>{
            return {
                selectedElement : i
            }
        });
    }

    render() {
        let node = this.props.segment.schema;
        let elements = this.props.segment.element.map((v, i) => {
            if (!Array.isArray(v)) {
                let delimiter = Store.delimiters[1]
                return <span key={i}><span>{delimiter}</span><span onClick={this.onElementClick.bind(null,i)} className={ this.state.selectedElement === i ? "highlight pointer" : "pointer"}>{v}</span></span>
            } else {
                let composite = [];
                v.forEach((c,ci)=>{
                    let key = i+"_"+ci;
                    if ( ci === 0) {
                        let delimiter = Store.delimiters[1];
                        composite.push(<span key={key}><span>{delimiter}</span><span onClick={this.onElementClick.bind(null,key)} className={ this.state.selectedElement === key ? "highlight pointer" : "pointer"}>{c}</span></span>)
                    } else {
                        let delimiter = Store.delimiters[2];
                        composite.push(<span className="pointer" key={key}><span>{delimiter}</span>{c}</span>)
                    }
                })
                return composite;
            }
        });

        return (
            <div className="schema">
                <h5>Path:{this.props.segment.path}</h5>
                <div>Content:{this.props.segment.name}{elements}</div>
                <LazyLoadTree node={node} root={false} toggleOnLoad={true} selectedElement={this.state.selectedElement}/>
            </div>
        );
    }
}

export default Schema;