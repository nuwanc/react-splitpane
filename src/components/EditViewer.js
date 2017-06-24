import React, { Component } from 'react';
import Store from '../utils/Store';
import * as EdiHelper from '../utils/EdiHelper';
import JSPath from 'jspath';
import Modal from './Modal'


function Segment(props) {

    if (props.type === 0) {
        return <div><h1>HTML view</h1></div>
    } else if (props.type === 1) {
        const name = <span>{props.segment.name}</span>;
        const elements = props.segment.element.map((v, i) => {
            return <span>*{v}</span>
        })
        return (
            <div>{name}{elements}</div>
        )
    } else if (props.type === 2) {
        return <div><h1>Text view</h1></div>
    }

}

class EditViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isModalOpen: true,
            viewerHeight: null
        }
        this.updateDimensions = this.updateDimensions.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    closeModal() {
        this.setState(() => {
            return {
                isModalOpen: false
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedNode !== this.props.selectedNode) {
            this.setState(()=>{
                return {
                    isModalOpen : true
                }
            });
        }
    }


    render() {
        let json = '';
        let segments = null;

        if (this.props.selectedNode) {
            if (this.props.selectedNode.split('.').length > 3 || !Store.large) {
                json = JSPath.apply(this.props.selectedNode, Store.message);

                segments = EdiHelper.getSegments(json).map((v, i) => {
                    return <Segment key={i} segment={v} type={this.props.docType} />
                })
            } else {
                segments = <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} params={{ msg: "Too many transaction to display in mode, please select individual transaction." }}></Modal>
            }
        }

        let divStyle = {
            maxHeight: this.props.viewerHeight || this.state.viewerHeight
        }

        return (
            <div className="doc" style={divStyle}>
                {segments}
            </div>
        )
    }
}


export default EditViewer;