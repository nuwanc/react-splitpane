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

    componentWillMount() {
        if (Store.message) {
            let tree = {};
            tree.childNodes = [];
            let count = 0;

            Store.message["interchange"].forEach((v,i)=>{
                let isa = {};
                if (v.ISA) {
                    let element = v.ISA.e;
                    isa.title = element[4]+'/'+element[5]+'->'+element[6]+'/'+element[7];//+', Ctrl = '+element[12];
                } else {
                    isa.title = v.n;
                }
                isa.path = v.j;
                isa.icon = "fa fa-envelope-o";
                isa.childNodes = [];

                v["group"].forEach((v1,i1)=>{
                    let gs = {};
                    if (v1.GS) {
                        let element = v1.GS.e;
                        gs.title = element[1] +'->' + element[2];// + ', Ctrl='+ element[5]
                    } else {
                        gs.title = v1.n; 
                    }
                    gs.path = v1.j;
                    gs.icon = "fa fa-folder-o";
                    gs.childNodes = [];

                    v1["transaction"].forEach((v2,i2)=>{
                        let st = {};
                        st.title = v2.n;
                        st.path = v2.j;
                        st.icon = "fa fa-file-o";
                        gs.childNodes.push(st);
                        count ++;
                    })
                    isa.childNodes.push(gs);
                })
                tree.childNodes.push(isa);
            })
            this.setState(() => {
                return {
                    tree: tree
                }
            },()=>{
                Store.large = (count > 50);
            })
        }
    }

    componentDidMount() {
        let content = document.getElementById('content');
        let outerDiv = document.getElementById('outer');
        if (content && outerDiv) {
            outerDiv.innerHTML = content.innerHTML;
            content.parentNode.removeChild(content);
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

        let divStyle = {
            maxHeight: this.props.treeHeight || '90vh'
        }

        return (
            <div className="tree" style={divStyle}>
                {!this.state.tree ? <Loading /> : <SimpleTree node={this.state.tree} selected={this.state.selected} onTreeNodeSelect={this.onTreeNodeSelect} />}
            </div>
        )
    }
}

TreePane.propTypes = {
    onTreeNodeClick : PropTypes.func.isRequired
}

export default TreePane;