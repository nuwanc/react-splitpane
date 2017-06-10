import React, { Component } from 'react';
import SimpleTree from './SimpleTree';

class TreePane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: null
        };
        this.onTreeNodeSelect = this.onTreeNodeSelect.bind(this);
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

        return (
            <SimpleTree node={tree} selected={this.state.selected} onTreeNodeSelect={this.onTreeNodeSelect} />
        )
    }
}

export default TreePane;