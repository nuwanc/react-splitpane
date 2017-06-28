import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Store from '../utils/Store';

class SimpleTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
        this.toggle = this.toggle.bind(this);
        this.nodeClick = this.nodeClick.bind(this);
    }

    toggle() {
        this.setState({ visible: !this.state.visible });
    }

    nodeClick(node) {
        this.props.onTreeNodeSelect(node);
    }

    render() {
        let childNodes;
        let classObj;
        let selectedObj;

        if (this.props.node.childNodes != null) {
            childNodes = this.props.node.childNodes.map((node, index) => {
                return <li key={index}><SimpleTree node={node} selected={this.props.selected} onTreeNodeSelect={this.props.onTreeNodeSelect} validate={this.props.validate}/></li>
            });

            classObj = {
                "minus": this.state.visible,
                "plus": !this.state.visible
            };

        }

        let style;
        if (!this.state.visible) {
            style = { display: "none" };
        }

        //console.log(this.props.node.spath,Store.lookupErrorSegment(this.props.node.spath))
        //console.log(Store.errorPaths);

        selectedObj = {
            "fa": true,
            "node": true,
            "selected": this.props.selected === this.props.node.path,
            "error" : Store.lookupErrorPath(this.props.node.spath)
        }

        let root;
        if (this.props.node.title) {
            root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
        } else {
            root = '';
        }

        return (
            <div>
                {root}
                <i className={this.props.node.icon} aria-hidden="true">&nbsp;</i>
                <i className={classNames(selectedObj)} onClick={this.props.onTreeNodeSelect.bind(null,this.props.node.path)}>{this.props.node.title}</i>
                <ul className='SimpleTree' style={style}>
                    {childNodes}
                </ul>
            </div>
        );
    }

}

SimpleTree.propTypes = {
    node: PropTypes.object.isRequired,
    onTreeNodeSelect : PropTypes.func.isRequired
}

export default SimpleTree;