import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as EdiHelper from '../../utils/EdiHelper';

class SegmentTab extends Component {

    renderOption(option) {
        return option.value + "=" +option.description;
    } 

    render() {
        let node = this.props.segment.schema;
        let index = this.props.index;
        let tabs = [];
        let tabPanels = [];

        node.element.forEach((v,i)=>{
            let details = EdiHelper.getSchemaDetails(v.name);
            let select;
            if (details.name.startsWith("code")) {
                let options = [];
                options = details.value.map((v,i)=>{
                    return <option key={i + 1} value={v.value}>{v.value} = {v.description}</option>
                })
                options.unshift(<option value="" key={0}>[empty]</option>);
                select = <select defaultValue={this.props.segment.element[i]} style={{width:'400px'}}>{options}</select>
            } else {
                if (this.props.segment.element[i]) {
                    select = <span>{this.props.segment.element[i]}</span>
                } else {
                    select = <span>[empty]</span>
                }
                
            }
            tabs.push(<Tab key={this.props.segment.name + (i + 1)}>{this.props.segment.name + (i + 1)}</Tab>);
            tabPanels.push(
            <TabPanel key={this.props.segment.name + (i + 1)} className="tab-panel">
                 <div>Description: {details.description} ({v.requirementType })</div>
                 <div>Data:{select}</div>
                 <div>Standard: {details.name} {details.dataType} {details.minLength}/{details.maxLength}</div>
            </TabPanel>);
        })
        return <Tabs defaultIndex={index}><TabList>{tabs}</TabList>{tabPanels}</Tabs>
    }
}

export default SegmentTab;