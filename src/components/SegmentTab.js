import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as EdiHelper from '../utils/EdiHelper';

class SegmentTab extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let node = this.props.segment.schema;
        let index = this.props.index;
        let tabs = [];
        let tabPanels = [];

        node.element.forEach((v,i)=>{
            let details = EdiHelper.getSchemaDetails(v.name);
            //console.log(v,details);
            tabs.push(<Tab key={this.props.segment.name + (i + 1)}>{this.props.segment.name + (i + 1)}</Tab>);
            tabPanels.push(
            <TabPanel key={this.props.segment.name + (i + 1)}>
                 <div>Description: {details.description} ({v.requirementType })</div>
                 <div>Data: {this.props.segment.element[i]}</div>
                 <div>Standard: {details.name} {details.dataType} {details.minLength}/{details.maxLength}</div>
            </TabPanel>);
        })
        return <Tabs defaultIndex={index}><TabList>{tabs}</TabList>{tabPanels}</Tabs>;;
    }
}

export default SegmentTab;