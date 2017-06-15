import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Modal extends Component {

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
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

        return (
            <div className="modal" tabIndex="-1" role="dialog" style={displayStyle}>
                <div className={classNames(classObj)} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e => this.close(e)}><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">Modal title</h4>
                        </div>
                        <div className="modal-body">
                            <ul>
                                {
                                    this.props.params && this.props.params.map((v,i)=>{
                                        return <li key={i}>{v}</li>
                                    })
                                }
                            </ul>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={e => this.close(e)}>Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
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
    params : PropTypes.array.isRequired
}

Modal.defaultProps = {
    isOpen : false,
    isLarge : false,
    params : []
}


export default Modal;