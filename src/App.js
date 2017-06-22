import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Modal from './components/Modal';
import DocumentPane from './components/DocumentPane';
import BottomPane from './components/BottomPane';
import TreePane from './components/TreePane';
import Loading from './components/Loading';
import * as api from './utils/api';
import Store from './utils/Store';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      node: null,
      segment: null,
      tabIndex: -1,
      userSelected: false,
      loading: true,
      isModalOpen: false,
      isModalLarge: false,
      params: {},
      viewerHeight: null
    };
    this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    this.onViewerClick = this.onViewerClick.bind(this);
    this.onTabUserSelect = this.onTabUserSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.resizePane = this.resizePane.bind(this);
    
  }

  componentDidMount() {
    api.fetchMessageData().then((message)=>{
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
        node: node
      }
    });
  }

  onViewerClick(segment, tabIndex) {
    this.setState(() => {
      return {
        segment: segment,
        tabIndex: tabIndex,
        userSelected: false
      }
    });
  }

  onTabUserSelect(userSelected) {
    this.setState(() => {
      return {
        userSelected: userSelected
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
        viewerHeight :  size - 44 + 'px'
      };
    });
  }

  render() {

    if (this.state.loading) {
      return <Loading />
    }

    let isOuter = false;
    if (window.showOuter && window.showOuter === true) {
      isOuter = true;
    }

    if (isOuter) {
      return (
        <div>
          <SplitPane split="horizontal">
            <div id="outer"></div>
            <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250}>
              <div><TreePane onTreeNodeClick={this.onTreeNodeClick} /></div>
              <SplitPane defaultSize="70%" split="horizontal" onChange={(size)=>{this.resizePane(size)}}>
                <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} userSelected={this.state.userSelected} onTabUserSelect={this.onTabUserSelect} openModal={this.openModal} viewerHeight={this.state.viewerHeight}/></div>
                <div><BottomPane onViewerClick={this.onViewerClick} openModal={this.openModal}/></div>
              </SplitPane>
            </SplitPane>
          </SplitPane>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} isLarge={this.state.isModalLarge} params={this.state.params}></Modal>
        </div>
      );
    } else {
      return (
        <div>
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250}>
            <div><TreePane onTreeNodeClick={this.onTreeNodeClick} /></div>
            <SplitPane defaultSize="70%" split="horizontal" onChange={(size)=>{this.resizePane(size)}}>
              <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} userSelected={this.state.userSelected} onTabUserSelect={this.onTabUserSelect} /></div>
              <div><BottomPane onViewerClick={this.onViewerClick} /></div>
            </SplitPane>
          </SplitPane>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()} params={this.state.params}></Modal>
        </div>
      );
    }


  }
}

export default App;
