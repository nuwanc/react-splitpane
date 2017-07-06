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
            main: {
                display: 'flex',
                justifyAontent: 'center',
                alignItems: 'center',
                height : this.props.height
            },
            content: {
                textAlign: this.props.textAlign,
                fontSize: this.props.fontSize,
                width: '100%'
            }
        };

        return (
            <div style={styles.main}>
                <div style={styles.content}>
                    {this.state.text}
                </div>
            </div>
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
    textAlign: 'center',
    height : '100vh'
};

export default Loading;