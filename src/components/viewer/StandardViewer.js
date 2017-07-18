import React, { Component } from 'react';
import LazyLoadTree from '../tree/LazyLoadTree';
import * as Api from '../../utils/HttpService';
import Store from '../../utils/Store';
import Loading from '../ui/Loading';

class StandardViewer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            divHeight: null
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
            },()=> {
                this.props.onSchemaLoad()
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
            let divHeight = parentHeight - this.props.viewerHeight;
            this.setState(()=>{
                return {
                    divHeight : divHeight - 100
                }
            })
        } else {
            let viewerHeight = document.getElementById("docPane").clientHeight - 44
            let divHeight = parentHeight - viewerHeight;
            this.setState(()=>{
                return {
                    divHeight : divHeight - 100
                }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.viewerHeight !== nextProps.viewerHeight) {
            let parentHeight = document.getElementById("rightPane").firstChild.clientHeight;
            let divHeight = parentHeight - nextProps.viewerHeight;
            this.setState(()=>{
                return {
                    divHeight : divHeight - 100
                }
            })
        }
    }
    
    render() {
        let divStyle = {
            height: this.state.divHeight || 110
        }
        
        let content = null;
        if (this.state.loading) {
            content = <Loading textAlign={'center'} height={divStyle.height} text={'Loading the Specification'}/>
        } else {
            if (Store.schema !== null) {
                content =  <LazyLoadTree node={Store.schema} root={true} openModal={this.props.openModal} selectedPath={this.props.selectedPath} />
            }
        }

        return (
            <div>
                <div className="standard" style={divStyle}>
                    {content}
                </div>
                
            </div>
        );
    }
}

export default StandardViewer;