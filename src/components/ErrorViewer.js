import React, { Component } from 'react';
import * as Api from '../utils/HttpService';
import Store from '../utils/Store';
import Loading from './Loading';

class ErrorViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results : null,
            ulHeight : null,
            selected : null,
            loading : false
        }
        this.onErrorViewerClick = this.onErrorViewerClick.bind(this);
        this.handleValidateClick = this.handleValidateClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
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
                    selected : null
                }
            })
        }

    }


    handleValidateClick() {
        this.setState(()=>{
            return {
                loading : true
            }
        });

        Api.fetchErrorData().then((errors) => {
            Store.errors = errors;
            this.setState(()=>{
                return {
                    results : errors,
                    loading : false
                }
            })
        })
    }

    onErrorViewerClick(path) {
        this.props.onViewerClick(path.substring(0,path.lastIndexOf('/')), 1);
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
        if (this.state.loading && this.state.results === null) {
            content = <Loading fontSize={'13px'} textAlign={'left'}/>
        } else {
            if (this.state.results!== null) {
                content =  this.state.results.map((v,i)=>{
                        return <ErrorResult key={v.location} node={v} onClickResult={this.onErrorViewerClick} selected={this.state.selected === v.location}/>
                })
            }
        }

        return (
            <div>
                <button onClick={this.handleValidateClick}>Validate</button>
                <ol className="results" style={ulStyle}>
                    {content}
                </ol>
            </div>
        );
    }
}

class ErrorResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path) {
        this.props.onClickResult(path);
    }

    render () {
        return <li><span className={ this.props.selected ? "highlight" : "" }><a className="pointer" onClick={this.handleClick.bind(null,this.props.node.location)}>{this.props.node.location}</a> -> {this.props.node.message}</span></li>
    }
}

export default ErrorViewer;