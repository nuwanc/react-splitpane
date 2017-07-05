import React, { Component } from 'react';
import JSPath from 'jspath';
import Store from '../utils/Store';
import Interchange from './templates/Interchange';
import Group from './templates/Group';
import Transaction from './templates/Transaction';
import Loading from './Loading';

class HTMLViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewerHeight: null
        }
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
        this.setState(() => {
            return {
                viewerHeight: document.getElementById("docPane").clientHeight - 44
            }
        });
    }

    render() {
        let json;
        let content;

        let divStyle = {
            maxHeight: this.props.viewerHeight || this.state.viewerHeight
        }

        if (this.props.schemaLoading) {
            return <Loading textAlign={'center'} height={divStyle.maxHeight} text={'Initializing the HTML Viewer'}/>
        } else {
            if (this.props.selectedNode && this.props.docType === 0) {
                json = JSPath.apply(this.props.selectedNode, Store.message);
                let length = this.props.selectedNode.split('.').length;
                switch (length) {
                    case 2:
                        let isa = json.ISA || json.UNB;
                        let group = json.group;
                        content = <Interchange segment={isa} group={group} />
                        break;
                    case 3:
                        let gs = json.GS || json.UNG;
                        let transaction = json.transaction;
                        content = <Group segment={gs} transaction={transaction} />
                        break;
                    case 4:
                        let st = json.ST;
                        console.log(this.props.selectedNode,json);
                        content = <Transaction segment={st} transaction={json} />
                        break;
                    default:
                        break;
                }
            } else {
                return null;
            }
        }

        return (
            <div className="doc" style={divStyle}>
                {content}
            </div>
        )
    }
}

export default HTMLViewer;