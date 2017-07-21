import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import Modal from './components/ui/Modal';
import DocumentPane from './components/pane/DocumentPane';
import BottomPane from './components/pane/BottomPane';
import TreePane from './components/pane/TreePane';
import Loading from './components/ui/Loading';
import * as Api from './utils/HttpService';
import Store from './utils/Store';
import 'string.prototype.startswith/startswith';
import * as EdiHelper from './utils/EdiHelper';

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
      validate: false,
      path: null,
      schemaLoading: true,
      snode: null
    };

    this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    this.onViewerClick = this.onViewerClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.resizePane = this.resizePane.bind(this);
    this.resizeTopPane = this.resizeTopPane.bind(this);
    this.onValidateClick = this.onValidateClick.bind(this);
    this.onSegmentClick = this.onSegmentClick.bind(this);
    this.onSchemaLoad = this.onSchemaLoad.bind(this);
    this.onCtrlNumberClick = this.onCtrlNumberClick.bind(this);
  }

  componentDidMount() {
    Api.fetchMessageData().then((message) => {
      Store.message = message;
      this.setState(() => {
        return {
          loading: false
        }
      });
    })
  }

  onTreeNodeClick(node,snode) {
    this.setState(() => {
      return {
        node: node,
        tabIndex: -1,
        segment: null,
        snode: snode
      }
    });
  }

  onCtrlNumberClick(node) {
    this.setState(() => {
      return {
        node: node
      }
    });
  }

  onViewerClick(segment, tabIndex) {
    this.setState(() => {
      return {
        node: EdiHelper.serverPathToJsonPath(segment),
        snode : EdiHelper.segmentPathToRootPath(segment)
      }
    }, () => {
      this.setState(() => {
        return {
          segment: segment,
          tabIndex: tabIndex,
        }
      })
    });
  }

  onValidateClick(validate) {
    this.setState(() => {
      return {
        validate: validate
      }

    })
  }

  onSegmentClick(path,tabIndex) {
    this.setState(() => {
      return {
        path: path,
        segment : path,
        tabIndex: tabIndex
      }
    })
  }

  onSchemaLoad() {
    this.setState(()=>{
      return {
        schemaLoading : false,
        node : '.interchange[0]',
        tabIndex : 0
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

  openModal(isLarge, params) {
    this.setState(() => {
      return {
        isModalOpen: true,
        isModalLarge: isLarge,
        params: params
      }
    });
  }

  resizePane(size) {
    this.setState(() => {
      return {
        viewerHeight: size - 44
      };
    });
  }

  resizeTopPane(size) {
    this.setState(() => {
      return {
        treeHeight: size
      };
    });
  }



  render() {

    if (this.state.loading) {
      return <Loading  text={'Loading the message'}/>
    }

    let isOuter = false;
    if (this.props.showOuter && this.props.showOuter === true) {
      isOuter = true;
    }

    if (isOuter) {
      return (
        <div>
          <SplitPane split="horizontal" defaultSize={'90vh'} minSize={50} maxSize={-50} onChange={(size) => { this.resizeTopPane(size) }} primary="second">
            <div id="outer"></div>
            <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={300}>
              <div><TreePane onTreeNodeClick={this.onTreeNodeClick} treeHeight={this.state.treeHeight} showOuter={isOuter} validate={this.state.validate} selectNode={this.state.node} /></div>
              <div id="rightPane">
                <SplitPane defaultSize="70%" split="horizontal" onChange={(size) => { this.resizePane(size) }}>
                  <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedServerNode={this.state.snode} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} openModal={this.openModal} viewerHeight={this.state.viewerHeight} validate={this.state.validate} onSegmentClick={this.onSegmentClick} schemaLoading={this.state.schemaLoading} onCtrlNumberClick={this.onCtrlNumberClick}/></div>
                  <div style={{ width: '100%' }}><BottomPane onViewerClick={this.onViewerClick} onValidateClick={this.onValidateClick} onSchemaLoad={this.onSchemaLoad} selectedNode={this.state.node} openModal={this.openModal} viewerHeight={this.state.viewerHeight} selectedPath={this.state.path} /></div>
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
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={300}>
            <div><TreePane onTreeNodeClick={this.onTreeNodeClick} treeHeight={this.state.treeHeight} showOuter={isOuter} validate={this.state.validate} selectNode={this.state.node} /></div>
            <div id="rightPane">
              <SplitPane defaultSize="70%" split="horizontal" onChange={(size) => { this.resizePane(size) }}>
                <div style={{ width: '100%' }} id="docPane"><DocumentPane selectedNode={this.state.node} selectedServerNode={this.state.snode} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} openModal={this.openModal} viewerHeight={this.state.viewerHeight} validate={this.state.validate} onSegmentClick={this.onSegmentClick} schemaLoading={this.state.schemaLoading} onCtrlNumberClick={this.onCtrlNumberClick}/></div>
                <div style={{ width: '100%' }}><BottomPane onViewerClick={this.onViewerClick} onValidateClick={this.onValidateClick} onSchemaLoad={this.onSchemaLoad} selectedNode={this.state.node} openModal={this.openModal} viewerHeight={this.state.viewerHeight} selectedPath={this.state.path} /></div>
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
