import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DocumentViewer from './DocumentViewer';

class DocumentPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex : 0
        };
        this.selectTab = this.selectTab.bind(this);
    }

    selectTab(tabIndex) {
        this.setState(()=>{
            return {
                tabIndex : tabIndex
            }
        });
        this.props.onTabUserSelect(true);
    }

    render() {
        let selectedIndex = 0;
        if (this.props.userSelected) {
            selectedIndex = this.state.tabIndex;   
        } else {
            if (this.props.tabToSelect === -1) {
                selectedIndex = 0;
            } else {
                selectedIndex = this.props.tabToSelect;
            }
        }

        return (
            <Tabs selectedIndex={selectedIndex} onSelect={this.selectTab}>
                <TabList>
                    <Tab>Html</Tab>
                    <Tab>Edit</Tab>
                    <Tab>Text</Tab>
                </TabList>

                <TabPanel >
                    <DocumentViewer docType={selectedIndex} selectedNode={this.props.selectedNode} selectedSegment={this.props.selectedSegment}/>
                </TabPanel>
                <TabPanel>
                   <DocumentViewer docType={selectedIndex} selectedNode={this.props.selectedNode} selectedSegment={this.props.selectedSegment}/>
                </TabPanel>
                <TabPanel>
                    <DocumentViewer docType={selectedIndex} selectedNode={this.props.selectedNode} selectedSegment={this.props.selectedSegment}/>
                </TabPanel>
            </Tabs>
        )
    }
}

export default DocumentPane;