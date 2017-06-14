import React, { Component } from 'react';
import SimpleTree from './SimpleTree';
import Loading from './Loading';

class TreePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            tree: null
        };
        this.onTreeNodeSelect = this.onTreeNodeSelect.bind(this);
        window.setTimeout(() => {
            let tree = {
                childNodes: [
                    {
                        title: "howdy1",
                        icon: "fa fa-envelope-o",
                        childNodes: [
                            {
                                title: "suzie1",
                                icon: "fa fa-folder-o",
                                childNodes: [
                                    {
                                        title: "puppy1",
                                        icon: "fa fa-file-o"
                                    },
                                    {
                                        title: "cherry tree1",
                                        icon: "fa fa-file-o"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "howdy2",
                        icon: "fa fa-envelope-o",
                        childNodes: [
                            {
                                title: "suzie2",
                                icon: "fa fa-folder-o",
                                childNodes: [
                                    {
                                        title: "puppy2",
                                        icon: "fa fa-file-o"
                                    },
                                    {
                                        title: "cherry tree2",
                                        icon: "fa fa-file-o"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            this.setState(() => {
                return {
                    tree: tree
                }
            })
        }, 500);
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
        return (
            <div>
                {!this.state.tree ? <Loading /> : <SimpleTree node={this.state.tree} selected={this.state.selected} onTreeNodeSelect={this.onTreeNodeSelect} />}
            </div>
        )
    }
}

export default TreePane;