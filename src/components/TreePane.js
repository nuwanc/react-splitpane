import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleTree from './SimpleTree';
import Loading from './Loading';
import Store from '../utils/Store';

class TreePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            tree: null
        };
        this.onTreeNodeSelect = this.onTreeNodeSelect.bind(this);

    }

    componentDidMount() {
        let content = document.getElementById('content');
        let outerDiv = document.getElementById('outer');
        if (content && outerDiv) {
            outerDiv.innerHTML = content.innerHTML;
            content.parentNode.removeChild(content);
        }
        if (Store.message) {
            let tree = {};
            tree.childNodes = [];

            Store.message["interchange"].forEach((v,i)=>{
                let isa = {};
                isa.title = v.name;
                isa.path = v.path;
                isa.icon = "fa fa-envelope-o";
                isa.childNodes = [];

                v["group"].forEach((v1,i1)=>{
                    let gs = {};
                    gs.title = v1.name;
                    gs.path = v1.path;
                    gs.icon = "fa fa-folder-o";
                    gs.childNodes = [];

                    v1["transaction"].forEach((v2,i2)=>{
                        let st = {};
                        st.title = v2.name;
                        st.path = v2.path;
                        st.icon = "fa fa-file-o";
                        gs.childNodes.push(st);
                    })
                    isa.childNodes.push(gs);
                })
                tree.childNodes.push(isa);
            })
            this.setState(() => {
                return {
                    tree: tree
                }
            })
        }
    }

    onTreeNodeSelect(node) {
        this.setState(() => {
            return {
                selected: node
            };
        });
        this.props.onTreeNodeClick(node);
    }

    render() {
        return (
            <div>
                {!this.state.tree ? <Loading /> : <SimpleTree node={this.state.tree} selected={this.state.selected} onTreeNodeSelect={this.onTreeNodeSelect} />}
            </div>
        )
    }
}

TreePane.propTypes = {
    onTreeNodeClick : PropTypes.func.isRequired
}

export default TreePane;