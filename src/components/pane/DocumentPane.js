import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EditViewer from '../viewer/EditViewer';
import HTMLViewer from '../viewer/HTMLViewer';
//import TextViewer from './TextViewer';

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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tabToSelect > -1) {
            this.setState(()=>{
                return {
                    tabIndex : nextProps.tabToSelect
                }
            })
        }
    }

    render() {

        return (
            <Tabs selectedIndex={this.state.tabIndex} onSelect={this.selectTab}>
                <TabList>
                    <Tab>Html</Tab>
                    <Tab>Edit</Tab>
                    {/*<Tab>Text</Tab>*/}
                </TabList>

                <TabPanel forceRender={true}>
                    <HTMLViewer docType={this.state.tabIndex} selectedNode={this.props.selectedNode} selectedSegment={this.props.selectedSegment} openModal={this.props.openModal} viewerHeight={this.props.viewerHeight} validate={this.props.validate} onSegmentClick={this.props.onSegmentClick} schemaLoading={this.props.schemaLoading} onCtrlNumberClick={this.props.onCtrlNumberClick}/>
                </TabPanel>
                <TabPanel forceRender={true}>
                   <EditViewer docType={this.state.tabIndex} selectedNode={this.props.selectedNode} selectedServerNode={this.props.selectedServerNode} selectedSegment={this.props.selectedSegment} openModal={this.props.openModal} viewerHeight={this.props.viewerHeight} validate={this.props.validate} onSegmentClick={this.props.onSegmentClick} schemaLoading={this.props.schemaLoading}/>
                </TabPanel>
                {/*<TabPanel forceRender={true}>
                    <TextViewer docType={this.state.tabIndex} selectedNode={this.props.selectedNode} selectedSegment={this.props.selectedSegment} openModal={this.props.openModal} viewerHeight={this.props.viewerHeight}/>
                </TabPanel>*/}
            </Tabs>
        )
    }
}

export default DocumentPane;