import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Store from '../utils/Store';

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

     getDetails(name) {
        let type = name.split(":")[0];
        let elements;
        switch (type) {
            case 'code':
                elements = Store.schema["code"];
                for (let i = 0, len = elements.length; i < len; i++) {
                    let code = elements[i];
                    if (code.name === name) {
                        return code;
                    }
                }
                break;
            case 'simple':
                elements = Store.schema["simple"];
                for (let i = 0, len = elements.length; i < len; i++) {
                    let simple = elements[i];
                    if (simple.name === name) {
                        return simple;
                    }
                }
                break;
            case 'composite':
                elements = Store.schema["composite"];
                for (let i = 0, len = elements.length; i < len; i++) {
                    let composite = elements[i];
                    if (composite.name === name) {
                        return composite;
                    }
                }
                break;
            case 'mpcode':
                elements = Store.schema["mpcode"];
                for(let i =0, len = elements.len; i < len; i++) {
                    let mpcode = elements[i];
                    if(mpcode.name === name) {
                        return mpcode;
                    }
                }
                break;
            /*case 'segment':
                elements = Store.schema["segment"];
                for (let i = 0, len = elements.length; i < len; i++) {
                    let segment = elements[i];
                    if (segment.name === name) {
                        return segment;
                    }
                }
                break;
            case 'loop' :
                elements = Store.schema["loop"];
                for (let i = 0, len = elements.length; i < len; i++) {
                    let loop = elements[i];
                    if (loop.name === name) {
                        return loop;
                    }
                }
                break;*/
            default:
                return null;
        }
    }

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
            "node": true
        }
        //if root, show immediate childNode
        let root;
        let childNodes = null;
        let icon;
        let info;

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
            let details = null;
            if (this.props.node.name) {
                let name = this.props.node.name;
                details = this.getDetails(name);
                
                if (name.startsWith("segment")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="ssegment">S</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span> } </i>
                } else if (name.startsWith("composite")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scomposite">C</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span> } </i>
                } else if (name.startsWith("loop")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="sloop">L</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span> } </i>
                } else if (name.startsWith("transaction")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <i className={'fa fa-file-o'} aria-hidden="true">&nbsp;</i>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span> } </i>
                } else if (name.startsWith("code")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scode">C</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span> } </i>
                } else if (name.startsWith("mpcode")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scode">MC</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span> } </i>
                } else {
                    root = <span className="blank">&nbsp;</span>
                    icon = <span className="selement">E</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span> } </i>
                }
            } else {
                root = '';
                icon = <i className={'fa fa-file-o'} aria-hidden="true">&nbsp;</i>
            }

            return (
                <div>
                    {root}
                    {icon}
                    {info}
                    <ul className='LazyLoadTree' style={style}>
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