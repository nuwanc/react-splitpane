import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class LazyLoadTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loaded: false,
            childNodes: null
        };
        this.toggle = this.toggle.bind(this);
        //this.nodeClick = this.nodeClick.bind(this);
    }

    toggle() {
        let childNodes = null;
        if (!this.state.loaded) {
            if (this.props.node.element) {
                childNodes = this.props.node.element.map((node, index) => {
                    return <li key={index}><LazyLoadTree node={node} root={false} /></li>
                });
                this.setState(() => {
                    return {
                        visible: !this.state.visible,
                        childNodes: childNodes,
                        loaded: true
                    }
                });
            }
        } else {
            this.setState(() => {
                return {
                    visible: !this.state.visible
                }
            });
        }

    }

    /*nodeClick(node) {
        this.props.onTreeNodeSelect(node);
    }*/

    render() {
        let classObj;
        let selectedObj;

        classObj = {
            "minus": this.state.visible,
            "plus": !this.state.visible
        };

        let style;
        if (!this.state.visible) {
            style = { display: "none" };
        }


        selectedObj = {
            "fa": true,
            "node": true,
        }
        //if root, show immediate childNode
        let root;
        let childNodes = null;

        if (this.props.root) {
            if (this.props.node.transaction != null) {
                childNodes = this.props.node.transaction.map((node, index) => {
                    return <li key={index}><LazyLoadTree node={node} root={false} /></li>
                });
            }
            style = { display: "block" };

            return (
                <div>
                    <ul className='SimpleTree' style={style}>
                        {childNodes || this.state.childNodes}
                    </ul>
                </div>
            );

        } else {
            if (this.props.node.name) {
                root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
            } else {
                root = '';
            }

            return (
                <div>
                    {root}
                    <i className={'fa fa-file-o'} aria-hidden="true">&nbsp;</i>
                    <i className={classNames(selectedObj)} >{this.props.node.description || this.props.node.name}</i>
                    <ul className='SimpleTree' style={style}>
                        {childNodes || this.state.childNodes}
                    </ul>
                </div>
            );

        }

        
    }

}

LazyLoadTree.propTypes = {
    node: PropTypes.object.isRequired
}

export default LazyLoadTree;