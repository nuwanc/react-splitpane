import React, { Component } from 'react';
import JSPath from 'jspath';
import Store from '../utils/Store';
import * as EdiHelper from '../utils/EdiHelper';

class FindViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : '',
            results : null,
            ulHeight : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindClick = this.handleFindClick.bind(this);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.saveRef = this.saveRef.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(()=>{
            return {
                text: value
            }
        });
    }

    saveRef(ref) {
        this.containerNode = ref;
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
    }

    render() {

        let ulStyle = {
            height: this.state.ulHeight || 90
        }

        return (
            <div ref={this.saveRef}>
                <span>Find in Edit View : <input type="text" name="find" value={this.state.text} onChange={this.handleChange}/> <button onClick={this.handleFindClick}>Find</button></span>
                <ol className="results" style={ulStyle}>
                    {this.state.results && this.state.results.map((v,i)=>{
                        return <li key={v.path}><a className="pointer" onClick={this.onFindViewerClick.bind(null,v.path)}>{v.path}</a> -> {v.element.join('*')}</li>
                    })}
                </ol>
            </div>
        )
    }
}

export default FindViewer;