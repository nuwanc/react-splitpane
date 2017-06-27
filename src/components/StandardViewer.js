import React, { Component } from 'react';
import LazyLoadTree from './LazyLoadTree';
import * as Api from '../utils/HttpService';
import Store from '../utils/Store';
import Loading from './Loading';

class StandardViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.onStandardClick = this.onStandardClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    onStandardClick() {
        this.props.onViewerClick('segment 1',1);
    }

    componentWillMount() {
        
        Api.fetchSchemaData().then((schema)=>{
            Store.schema = schema;
            this.setState(()=>{
                return {
                    loading : false
                }
            })
        })
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
    }
    
    render() {
        let divStyle = {
            height: this.state.ulHeight || 90
        }

        let content = null;
        if (this.state.loading) {
            content = <Loading textAlign={'center'} height={divStyle.height}/>
        } else {
            if (Store.schema !== null) {
                content =  <LazyLoadTree node={Store.schema} root={true} />
            }
        }

        return (
            <div>
                Standard Viewer
                <div className="standard" style={divStyle}>
                    {content}
                </div>
                
            </div>
        );
    }
}

export default StandardViewer;