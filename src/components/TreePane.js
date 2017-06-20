import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
                        title: "ZZ/EB009S1",
                        path : "interchange[0]",
                        icon: "fa fa-envelope-o",
                        childNodes: [
                            {
                                title: "EB009S1",
                                path: "interchange[0]/group[0]",
                                icon: "fa fa-folder-o",
                                childNodes: [
                                    {
                                        title: "850 Ctrl=0001",
                                        path: "interchange[0]/group[0]/transaction[0]",
                                        icon: "fa fa-file-o"
                                    },
                                    {
                                        title: "850 Ctrl=0002",
                                        path: "interchange[0]/group[0]/transaction[1]",
                                        icon: "fa fa-file-o"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: "ZZ/EB009S2",
                        path : "interchange[1]",
                        icon: "fa fa-envelope-o",
                        childNodes: [
                            {
                                title: "EB009S2",
                                path : "interchange[1]/group[0]",
                                icon: "fa fa-folder-o",
                                childNodes: [
                                    {
                                        title: "850 Ctrl=0001",
                                        path : "interchange[1]/group[0]/transaction[0]",
                                        icon: "fa fa-file-o"
                                    },
                                    {
                                        title: "850 Ctrl=0002",
                                        path : "interchange[1]/group[0]/transaction[1]",
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

TreePane.propTypes = {
    onTreeNodeClick : PropTypes.func.isRequired
}

export default TreePane;