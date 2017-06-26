import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
        let stopper = this.props.text + '...';
        this.interval = window.setInterval(() => {
            if (this.state.text === stopper) {
                this.setState(function () {
                    return {
                        text: this.props.text
                    }
                })
            } else {
                this.setState(function (prevState) {
                    return {
                        text: prevState.text + '.'
                    }
                });
            }
        }, this.props.speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {

        let styles = {
            content: {
                textAlign: this.props.textAlign,
                fontSize: this.props.fontSize,

            }
        };

        return (
            <p style={styles.content}>
                {this.state.text}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    fontSize: PropTypes.string,
    textAlign: PropTypes.string
};

Loading.defaultProps = {
    text: 'Loading',
    speed: 300,
    fontSize: '20px',
    textAlign: 'center'
};

export default Loading;