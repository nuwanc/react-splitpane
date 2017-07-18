import React, { Component } from 'react';
import Loading from '../ui/Loading';
import * as Api from '../../utils/FindService';

class FindViewer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            results: null,
            ulHeight: null,
            selected: null,
            loading: false,
            noResults: false,
            exact: false,
            matchCase: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindClick = this.handleFindClick.bind(this);
        this.onFindViewerClick = this.onFindViewerClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState(() => {
            return {
                text: value
            }
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleFindClick();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.viewerHeight !== nextProps.viewerHeight) {
            let parentHeight = document.getElementById("rightPane").firstChild.clientHeight;
            let ulHeight = parentHeight - nextProps.viewerHeight;
            this.setState(() => {
                return {
                    ulHeight: ulHeight - 130
                }
            })
        }
        // clear find results
        /*if (this.props.selectedNode !== nextProps.selectedNode) {
            this.setState(() => {
                return {
                    results: null,
                    text: '',
                    selected: null
                }
            })
        }*/

    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        let parentHeight = document.getElementById("rightPane").firstChild.clientHeight;
        if (this.props.viewerHeight) {
            let ulHeight = parentHeight - this.props.viewerHeight;
            this.setState(() => {
                return {
                    ulHeight: ulHeight - 130
                }
            })
        } else {
            let viewerHeight = document.getElementById("docPane").clientHeight - 44
            let ulHeight = parentHeight - viewerHeight;
            this.setState(() => {
                return {
                    ulHeight: ulHeight - 130
                }
            })
        }
    }

    handleFindClick() {
        let text = this.state.text;

        this.setState(() => {
            return {
                loading: true,
                results: null,
                noResults: false
            }
        });

        Api.findInDocument(text, this.props.selectedNode, this.state.exact, this.state.matchCase).then((results) => {
            console.log(results);
            this.setState(() => {
                return {
                    results: results,
                    loading: false
                }
            });
        }).catch((results) => {
            console.log(results);
            this.setState(() => {
                return {
                    noResults: results,
                    loading: false
                }
            });
        })

    }

    onFindViewerClick(path) {
        this.props.onViewerClick(path, 1);
        this.setState(() => {
            return {
                selected: path
            }
        });
    }

    render() {

        let ulStyle = {
            height: this.state.ulHeight || 90
        }
        let content = null;

        if (this.state.loading) {
            content = <Loading textAlign={'center'} height={ulStyle.height} text={'Finding'} />
        } else {
            if (this.state.results !== null) {
                content = Array.from(this.state.results).slice(0,500).map((v, i) => {
                    return <FindResult key={v.path} node={v} onClickResult={this.onFindViewerClick} selected={this.state.selected === v.path} />
                })
            }
        }

        if (this.state.noResults) {
            content = <li>No Results.</li>
        }

        return (
            <div>
                <span>
                    Find in Edit View : <input type="text" name="find" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress} /> <button onClick={this.handleFindClick}>Find</button>&nbsp;
                    Options:  <input type="checkbox" name="exact" checked={this.state.exact} onChange={this.handleInputChange} /> Match whole word <input type="checkbox" name="matchCase" checked={this.state.matchCase} onChange={this.handleInputChange} /> Match case
                </span>
                <ol className="results" style={ulStyle}>
                    {content}
                </ol>
            </div>
        )
    }
}

class FindResult extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(path) {
        this.props.onClickResult(path);
    }

    render() {
        return <li><span className={this.props.selected ? "highlight" : ""}><a className="pointer" onClick={this.handleClick.bind(null, this.props.node.path)}>{this.props.node.path}</a> -> {this.props.node.element.join('*')}</span></li>
    }
}

export default FindViewer;