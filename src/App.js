import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import DocumentPane from './components/DocumentPane';
import BottomPane from './components/BottomPane';
import TreePane from './components/TreePane';
import Loading from './components/Loading';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      node: null,
      segment: null,
      tabIndex: -1,
      userSelected: false,
      loading: true
    };
    this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    this.onViewerClick = this.onViewerClick.bind(this);
    this.onTabUserSelect = this.onTabUserSelect.bind(this);
    window.setTimeout(()=>{
      this.setState(()=>{
        return {
          loading : false
        }
      })
    },1000)
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

  render() {
    
    if (this.state.loading) {
      return <Loading/>
    } 

    let isOuter = false;
    if (window.showOuter && window.showOuter === true) {
      isOuter = true;
    }

    if (isOuter) {
      return (
        <SplitPane split="horizontal">
          <div id="outer"></div>
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250} className="primary">
            <div><TreePane onTreeNodeClick={this.onTreeNodeClick} /></div>
            <SplitPane defaultSize="70%" split="horizontal" >
              <div style={{ width: '100%' }}><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} userSelected={this.state.userSelected} onTabUserSelect={this.onTabUserSelect} /></div>
              <div><BottomPane onViewerClick={this.onViewerClick} /></div>
            </SplitPane>
          </SplitPane>
        </SplitPane>
      );
    } else {
      return (
          <SplitPane split="vertical" minSize={150} maxSize={300} defaultSize={250} className="primary">
            <div><TreePane onTreeNodeClick={this.onTreeNodeClick} /></div>
            <SplitPane defaultSize="70%" split="horizontal" >
              <div style={{ width: '100%' }}><DocumentPane selectedNode={this.state.node} selectedSegment={this.state.segment} tabToSelect={this.state.tabIndex} userSelected={this.state.userSelected} onTabUserSelect={this.onTabUserSelect} /></div>
              <div><BottomPane onViewerClick={this.onViewerClick} /></div>
            </SplitPane>
          </SplitPane>
      );
    }


  }
}

export default App;
