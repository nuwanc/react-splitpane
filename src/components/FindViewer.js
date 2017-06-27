import React, { Component } from 'react';
import JSPath from 'jspath';
import Store from '../utils/Store';
import * as EdiHelper from '../utils/EdiHelper';
import Loading from './Loading';

class FindViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : '',
            results : null,
            ulHeight : null,
            selected : null,
            loading : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindClick = this.handleFindClick.bind(this);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(()=>{
            return {
                text: value
            }
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleFindClick();
        }
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
                    text : '',
                    selected : null
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

        this.setState(()=>{
            return {
                loading : true
            }
        });

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
                results : results,
                loading : false
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
        let content = null;

        if (this.state.loading) {
            content = <Loading textAlign={'center'} height={ulStyle.height}/>
        } else {
            content = this.state.results && this.state.results.map((v,i)=>{
                        return <FindResult key={v.path} node={v} onClickResult={this.onFindViewerClick} selected={this.state.selected === v.path}/>
            })
        }

        return (
            <div>
                <span>Find in Edit View : <input type="text" name="find" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/> <button onClick={this.handleFindClick}>Find</button></span>
                <ol className="results" style={ulStyle}>
                    {content}
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

    handleClick(path) {
        this.props.onClickResult(path);
    }

    render () {
        return <li><span className={ this.props.selected ? "highlight" : "" }><a className="pointer" onClick={this.handleClick.bind(null,this.props.node.path)}>{this.props.node.path}</a> -> {this.props.node.element.join('*')}</span></li>
    }
}

export default FindViewer;