import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Modal extends Component {

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }

    generateTabs(count) {
        
        let tabs = [];
        let tabPanels = [];
        for (let i = 0; i < count; i++) {
            tabs.push(<Tab>{i + 1}</Tab>);
            tabPanels.push(<TabPanel>This is content for tab panel {i + 1}</TabPanel>);
        }    

        return <Tabs><TabList>{tabs}</TabList>{tabPanels}</Tabs>;
        
    }

    render() {
        if (!this.props.isOpen) {
            return null;
        }

        let classObj;

        classObj = {
            "modal-dialog" : true,
            "modal-lg" : this.props.isLarge && this.props.isLarge === true
        };

        let displayStyle = {
            display : 'block'
        };

        let content = null;
        let title = 'Warnning';

        if (this.props.params) {
            if (this.props.params['tabs']) {
                content = this.generateTabs(this.props.params['count'] || 3);
            }
            if (this.props.params['msg']) {
                content = <h5>{this.props.params['msg']}</h5>;
            }
            if (this.props.params['title']) {
                title = this.props.params['title'];
            }
        }

        return (
            <div className="modal" tabIndex="-1" role="dialog" style={displayStyle}>
                <div className={classNames(classObj)} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e => this.close(e)}><span aria-hidden="true">&times;</span></button>
                            <h6 className="modal-title">{title}</h6>
                        </div>
                        <div className="modal-body">
                            {content}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={e => this.close(e)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


Modal.propTypes = {
    isOpen : PropTypes.bool.isRequired,
    onClose : PropTypes.func.isRequired,
    isLarge : PropTypes.bool.isRequired,
    params : PropTypes.object.isRequired
}

Modal.defaultProps = {
    isOpen : false,
    isLarge : false,
    params : {}
}


export default Modal;