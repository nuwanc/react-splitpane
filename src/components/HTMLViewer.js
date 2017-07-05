import React, { Component } from 'react';
import JSPath from 'jspath';
import Store from '../utils/Store';
import Interchange from './templates/Interchange';
import Group from './templates/Group';

class HTMLViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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

        if (this.props.selectedNode && this.props.docType === 0) {
            json = JSPath.apply(this.props.selectedNode, Store.message);
            let length =  this.props.selectedNode.split('.').length;
            switch (length) {
                case 2:
                    let isa = json.ISA || json.UNB;
                    let group = json.group;
                    content = <Interchange segment={isa} group={group}/>
                    break;
                case 3:
                    let gs = json.GS || json.UNE;
                    let transaction = json.transaction;
                    content = <Group segment={gs} transaction={transaction}/>
                    break;
                case 4:

                    break;
                default:
                    break;
            }
        }

        let divStyle = {
            maxHeight: this.props.viewerHeight || this.state.viewerHeight
        }
        
        return (
            <div className="doc" style={divStyle}>
                {content}
            </div>
        )
    }
}

export default HTMLViewer;