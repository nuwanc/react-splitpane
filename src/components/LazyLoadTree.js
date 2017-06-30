import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as EdiHelper from '../utils/EdiHelper';

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

    componentDidMount() {
        if (this.props.toggleOnLoad && this.props.toggleOnLoad === true) {
            this.toggle();
        }
    }

    toggle() {
        let childNodes = null;
        if (!this.state.loaded) {
            if (this.props.node.element) {
                childNodes = this.props.node.element.map((node, index) => {
                    return <li key={index}><LazyLoadTree node={node} root={false} openModal={this.props.openModal} /></li>
                });
                this.setState(() => {
                    return {
                        visible: !this.state.visible,
                        childNodes: childNodes,
                        loaded: true
                    }
                });
            } else {
                let name = this.props.node.name;
                if (name.startsWith("code") || name.startsWith("mpcode")) {
                    let details = EdiHelper.getSchemaDetails(name);
                    let codes;
                    if (details.value) {
                        codes = details.value.map((v, i) => {
                            return <li key={i}>{v.value} - {v.description}</li>
                        })
                    } else if (details.part) {
                        details.part.forEach((v,i)=>{
                            codes = details.part[i].map((v,i)=>{
                                return <li key={i}>{v.value} - {v.description}</li>
                            })
                        })
                    }

                    let content = <ul style={{ height: 220, overflowY: 'auto' }}>{codes}</ul>
                    this.props.openModal(false, { title: details.name + " - " + details.description, content: content });
                }

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
            "node": true
        }
        //if root, show immediate childNode
        let root;
        let childNodes = null;
        let icon;
        let info;

        if (this.props.root) {
            if (this.props.node.transaction) {
                childNodes = this.props.node.transaction.map((node, index) => {
                    return <li key={index}><LazyLoadTree node={node} root={false} openModal={this.props.openModal} /></li>
                });
            } else if (this.props.node.element) {
                childNodes = this.props.node.element.map((node, index) => {
                    return <li key={index}><LazyLoadTree node={node} root={false} openModal={this.props.openModal} /></li>
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
                details = EdiHelper.getSchemaDetails(name);

                if (name.startsWith("segment")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="ssegment">S</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span>} </i>
                } else if (name.startsWith("composite")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scomposite">C</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span>} </i>
                } else if (name.startsWith("loop")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="sloop">L</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span>} </i>
                } else if (name.startsWith("transaction")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <i className={'fa fa-file-o'} aria-hidden="true">&nbsp;</i>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType ? <span>({this.props.node.requirementType}/{this.props.node.maxOccurs})</span> : <span> </span>} </i>
                } else if (name.startsWith("code")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scode">C</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span>} </i>
                } else if (name.startsWith("mpcode")) {
                    root = <span onClick={this.toggle} className={classNames(classObj)}></span>;
                    icon = <span className="scode">MC</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span>} </i>
                } else {
                    root = <span className="blank">&nbsp;</span>
                    icon = <span className="selement">E</span>
                    info = <i className={classNames(selectedObj)} >&nbsp;{this.props.node.description || this.props.node.name} {this.props.node.requirementType && details ? <span>({this.props.node.requirementType} - {details.dataType} -  {details.minLength} / {details.maxLength})</span> : <span> </span>} </i>
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