import React, { Component } from 'react';
import Store from '../../utils/Store';
import * as EdiHelper from '../../utils/EdiHelper';
import JSPath from 'jspath';
import Modal from '../ui/Modal'
import Segment from '../edit/Segment';
import Loading from '../ui/Loading';


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
            this.setState(() => {
                return {
                    isModalOpen: true
                }
            });
        }
    }


    render() {
        let json = '';
        let segments = null;
        let popup = null;

        let divStyle = {
            maxHeight: this.props.viewerHeight || this.state.viewerHeight
        }

        if (this.props.schemaLoading) {
            return <Loading textAlign={'center'} height={divStyle.maxHeight} text={'Initializing the Edit Viewer'}/>
        } else {
            if (this.props.selectedNode && this.props.docType === 1) {
                if (this.props.selectedNode.split('.').length > 3 || !Store.large) {
                    json = JSPath.apply(this.props.selectedNode, Store.message);
                    segments = EdiHelper.getSegments(json, false).map((v, i) => {
                        return <Segment key={v.path} segment={v} type={this.props.docType} selectedSegment={v.path === this.props.selectedSegment} validate={this.props.validate} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick} />
                    })
                } else {
                    json = JSPath.apply(this.props.selectedNode, Store.message);
                    segments = EdiHelper.getSegments(json, true).map((v, i) => {
                        return <Segment key={v.path} segment={v} type={this.props.docType} selectedSegment={v.path === this.props.selectedSegment} validate={this.props.validate} openModal={this.props.openModal} onSegmentClick={this.props.onSegmentClick} />
                    })
                    popup = <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} params={{ msg: "Too many transaction to display. Please select individual transaction." }}></Modal>
                }
            }
        }

        return (
            <div className="doc" style={divStyle}>
                {segments}
                {popup}
            </div>
        )
    }
}


export default EditViewer;