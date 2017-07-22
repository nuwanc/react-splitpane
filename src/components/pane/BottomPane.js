import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StandardViewer from '../viewer/StandardViewer';
import ErrorViewer from '../viewer/ErrorViewer';
import FindViewer from '../viewer/FindViewer';


class BottomPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex : 0
        };
    }

    selectTab(tabIndex) {
        this.setState(()=>{
            return {
                tabIndex : tabIndex
            }
        });
    }

    render() {
        return (
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.selectTab(tabIndex)}>
                <TabList>
                    <Tab>Specification</Tab>
                    <Tab>Errors</Tab>
                    <Tab>Find</Tab>
                </TabList>

                <TabPanel forceRender={true}>
                    <StandardViewer onViewerClick={this.props.onViewerClick} onSchemaLoad={this.props.onSchemaLoad} openModal={this.props.openModal} selectedNode={this.props.selectedNode} viewerHeight={this.props.viewerHeight} selectedPath={this.props.selectedPath} messageId={this.props.messageId}/>
                </TabPanel>
                <TabPanel forceRender={true}>
                    <ErrorViewer onViewerClick={this.props.onViewerClick} onValidateClick={this.props.onValidateClick} openModal={this.props.openModal} selectedNode={this.props.selectedNode} viewerHeight={this.props.viewerHeight} messageId={this.props.messageId}/>
                </TabPanel>
                <TabPanel forceRender={true}>
                    <FindViewer onViewerClick={this.props.onViewerClick} openModal={this.props.openModal} selectedNode={this.props.selectedNode} viewerHeight={this.props.viewerHeight}/>
                </TabPanel>
            </Tabs>
        )
    }
}

BottomPane.propTypes = {
    onViewerClick : PropTypes.func,
    openModal : PropTypes.func
}

export default BottomPane;