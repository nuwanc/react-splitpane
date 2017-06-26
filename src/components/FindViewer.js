import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import JSPath from 'jspath';
import Store from '../utils/Store';
import * as EdiHelper from '../utils/EdiHelper';

class FindViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : '',
            results : null,
            ulHeight : null,
            selected : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindClick = this.handleFindClick.bind(this);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(()=>{
            return {
                text: value
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.viewerHeight !== nextProps.viewerHeight) {
            let parentHeight = document.getElementById("rightPane").firstChild.clientHeight;
            let ulHeight = parentHeight - nextProps.viewerHeight;
            this.setState(()=>{
                return {
                    ulHeight : ulHeight - 130
                }
            })
        }
        // clear find results
        if (this.props.selectedNode !== nextProps.selectedNode) {
            this.setState(()=>{
                return {
                    results : null,
                    text : ''
                }
            })
        }

    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        let parentHeight = document.getElementById("rightPane").firstChild.clientHeight;
        if (this.props.viewerHeight) {
            let ulHeight = parentHeight - this.props.viewerHeight;
            this.setState(()=>{
                return {
                    ulHeight : ulHeight - 130
                }
            })
        } else {
            let viewerHeight = document.getElementById("docPane").clientHeight - 44
            let ulHeight = parentHeight - viewerHeight;
            this.setState(()=>{
                return {
                    ulHeight : ulHeight - 130
                }
            })
        }
    }

    handleFindClick() {
        let json = '';
        let text = this.state.text;
        let results = [];

        if (this.props.selectedNode && this.props.selectedNode.split('.').length > 3) {
            json = JSPath.apply(this.props.selectedNode, Store.message);
            EdiHelper.getSegments(json).forEach((v,i)=>{
                if (v.element && v.element.indexOf(text) > -1) {
                    results.push(v);
                }
            })
        }
        
        this.setState(()=>{
            return {
                results : results
            }
        });
    }

    onFindViewerClick(path){
        this.props.onViewerClick(path,1);
        this.setState(()=>{
            return {
                selected : path
            }
        });
    }

    render() {

        let ulStyle = {
            height: this.state.ulHeight || 90
        }

        return (
            <div>
                <span>Find in Edit View : <input type="text" name="find" value={this.state.text} onChange={this.handleChange}/> <button onClick={this.handleFindClick}>Find</button></span>
                <ol className="results" style={ulStyle}>
                    {this.state.results && this.state.results.map((v,i)=>{
                        return <FindResult node={v} onClickResult={this.onFindViewerClick} selected={this.state.selected === v.path}/>
                    })}
                </ol>
            </div>
        )
    }
}

class FindResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate() {
        if (this.props.selected) {
            ReactDOM.findDOMNode(this).firstChild.classList.add('highlight');
        } else {
            ReactDOM.findDOMNode(this).firstChild.classList.remove('highlight');
        }
    }

    handleClick(path) {
        this.props.onClickResult(path);
    }

    render () {
        return <li key={this.props.node.path}><span><a className="pointer" onClick={this.handleClick.bind(null,this.props.node.path)}>{this.props.node.path}</a> -> {this.props.node.element.join('*')}</span></li>
    }
}

export default FindViewer;