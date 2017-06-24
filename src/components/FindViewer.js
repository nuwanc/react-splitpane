import React, { Component } from 'react';
import JSPath from 'jspath';
import Store from '../utils/Store';
import * as EdiHelper from '../utils/EdiHelper';

class FindViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text : '',
            results : null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindClick = this.handleFindClick.bind(this);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(()=>{
            return {
                text: value
            }
        });
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

    onFindViewerClick(){
        this.props.onViewerClick('segment 3',0);
    }

    render() {
        return (
            <div>
                <span>Find in Edit View : <input type="text" name="find" value={this.state.text} onChange={this.handleChange}/> <button onClick={this.handleFindClick}>Find</button></span>
                <ol>
                    {this.state.results && this.state.results.map((v,i)=>{
                        return <li key={v.path}>{v.path} -> {v.element.join('*')}</li>
                    })}
                </ol>
            </div>
        )
    }
}

export default FindViewer;