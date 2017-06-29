import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Modal from './components/Modal';
import DocumentPane from './components/DocumentPane';
import BottomPane from './components/BottomPane';
import TreePane from './components/TreePane';
import Loading from './components/Loading';
import * as Api from './utils/HttpService';
import Store from './utils/Store';
import * as startsWith from 'string.prototype.startswith/startswith'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      node: null,
      segment: null,
      tabIndex: -1,
      loading: true,
      isModalOpen: false,
      isModalLarge: false,
      params: {},
      viewerHeight: null,
      treeHeight: null,
      validate : false,
      path : null
    };
    
    this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    this.onViewerClick = this.onViewerClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.resizePane = this.resizePane.bind(this);
    this.resizeTopPane = this.resizeTopPane.bind(this);
    this.onValidateClick = this.onValidateClick.bind(this);
    this.onSegmentClick = this.onSegmentClick.bind(this);
  }

  componentDidMount() {
    Api.fetchMessageData().then((message)=>{
      Store.message = message;
      this.setState(()=>{
        return {
          loading : false
        }
      });
    })
  }

  onTreeNodeClick(node) {
    this.setState(() => {
      return {
        node: node,
        tabIndex: -1,
        segment: null
      }
    });
  }

  onViewerClick(segment, tabIndex) {
    this.setState(() => {
      return {
        segment: segment,
        tabIndex: tabIndex,
      }
    });
  }

  onValidateClick(validate) {
    this.setState(()=> {
      return {
        validate : validate
      }

    })
  }

  onSegmentClick(path) {
    this.setState(()=> {
      return {
        path : path
      }
    })
  }

  closeModal() {
    this.setState(() => {
      return {
        isModalOpen: false
      }
    });
  }

  openModal(isLarge,params) {
     this.setState(() => {
      return {
        isModalOpen: true,
        isModalLarge: isLarge,
        params: params
      }
    });
  }

  resizePane(size) {
    this.setState(()=>{
      return {
        viewerHeight :  size - 44
      };
    });
  }
  
  resizeTopPane(size) {
    this.setState(()=>{
      return {
        treeHeight :  size 
      };
    });
  }



  render() {

    if (this.state.loading) {
      return <Loading />
    }

    let isOuter = false;
    if (this.props.showOuter && this.props.showOuter === true) {
      isOuter = true;
    }

    if (isOuter) {
      return (
        <div>
          <SplitPane split="horizontal" defaultSize={'90vh'} minSize={50} maxSize={-50} onChange={(size)=>{this.resizeTopPane(size)}} primary="second">
            <div id="outer"></div>
            <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250}>
              <div><TreePane onTreeNodeClick={this.onTreeNodeClick}  treeHeight={this.state.treeHeight} showOuter={isOuter} validate={this.state.validate}/></div>
              <div id="rightPane">
                <SplitPane defaultSize="70%" split="horizontal" onChange={(size)=>{this.resizePane(size)}}>
                  <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex}  openModal={this.openModal} viewerHeight={this.state.viewerHeight} validate={this.state.validate} onSegmentClick={this.onSegmentClick}/></div>
                  <div style={{ width: '100%' }}><BottomPane onViewerClick={this.onViewerClick} onValidateClick={this.onValidateClick} selectedNode={this.state.node} openModal={this.openModal} viewerHeight={this.state.viewerHeight} selectedPath={this.state.path}/></div>
                </SplitPane>
              </div>
            </SplitPane>
          </SplitPane>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} isLarge={this.state.isModalLarge} params={this.state.params}></Modal>
        </div>
      );
    } else {
      return (
        <div>
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250}>
            <div><TreePane onTreeNodeClick={this.onTreeNodeClick} treeHeight={this.state.treeHeight} showOuter={isOuter} validate={this.state.validate}/></div>
            <div id="rightPane">
              <SplitPane defaultSize="70%" split="horizontal" onChange={(size)=>{this.resizePane(size)}}>
                <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex}  openModal={this.openModal} viewerHeight={this.state.viewerHeight} validate={this.state.validate} onSegmentClick={this.onSegmentClick}/></div>
                <div style={{ width: '100%' }}><BottomPane onViewerClick={this.onViewerClick} onValidateClick={this.onValidateClick} selectedNode={this.state.node} openModal={this.openModal} viewerHeight={this.state.viewerHeight} selectedPath={this.state.path}/></div>
              </SplitPane>
            </div>
          </SplitPane>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} isLarge={this.state.isModalLarge} params={this.state.params}></Modal>
        </div>
      );
    }


  }
}

export default App;
