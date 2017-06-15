import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StandardViewer from './StandardViewer';
import ErrorViewer from './ErrorViewer';
import FindViewer from './FindViewer';


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
                    <Tab>Standard</Tab>
                    <Tab>Errors</Tab>
                    <Tab>Find</Tab>
                </TabList>

                <TabPanel forceRender={true}>
                    <StandardViewer onViewerClick={this.props.onViewerClick} openModal={this.props.openModal}/>
                </TabPanel>
                <TabPanel>
                    <ErrorViewer onViewerClick={this.props.onViewerClick} openModal={this.props.openModal}/>
                </TabPanel>
                <TabPanel>
                    <FindViewer onViewerClick={this.props.onViewerClick} openModal={this.props.openModal}/>
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