import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Schema from '../edit/Schema';
import SegmentTab from '../edit/SegmentTab';

class Modal extends Component {

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }

    showSegmentTab(segment,index,cIndex) {
        return (<SegmentTab segment={segment} index={index} cIndex={cIndex}></SegmentTab>)
    }

    showSchema(segment) {
        return (<Schema segment={segment}></Schema>)
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
            if (this.props.params['segment']) {
                let segment = this.props.params['segment'];
                title = segment.name;
                content = this.showSegmentTab(segment,this.props.params['index'],this.props.params['cIndex']);
            }
            if (this.props.params['msg']) {
                content = <h5>{this.props.params['msg']}</h5>;
            }
            if (this.props.params['title']) {
                title = this.props.params['title'];
            }
            if (this.props.params['content']) {
                content = this.props.params['content'];
            }
            if (this.props.params['schema']) {
                let segment = this.props.params['segment'];
                title = "Schema for:"+segment.name;
                content = this.showSchema(segment);

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