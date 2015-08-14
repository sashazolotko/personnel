var React = require('react');

var ReactLayeredComponentMixin = {
    componentWillUnmount: function() {
        this._unrenderLayer();
        document.body.removeChild(this._target);
    },
    componentDidUpdate: function() {
        this._renderLayer();
    },
    componentDidMount: function() {
        this._target = document.createElement('div');
        document.body.appendChild(this._target);
        this._renderLayer();
    },
    _renderLayer: function() {
        React.render(this.renderLayer(), this._target);
    },
    _unrenderLayer: function() {
        React.unmountComponentAtNode(this._target);
    }
};

var Modal = React.createClass({
    killClick: function() {
        this.props.onRequestClose();
    },
    handleBackdropClick: function(e) {
        e.stopPropagation();
    },
    render: function() {
        return (
            <div className="ModalBackdrop" onClick={this.handleBackdropClick}>
                <div className="ModalContent" onClick={this.killClick}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var ModalLink = React.createClass({
    mixins: [ReactLayeredComponentMixin],
    handleClick: function() {
        this.setState({shown: !this.state.shown});
    },
    getInitialState: function() {
        return {shown: false, modalShown: false};
    },
    onConfirm:function () {
        this.props.onConfirm();
    },
    renderLayer: function() {
        if (!this.state.shown) {
            return <span />;
        }
        return (
            <Modal onRequestClose={this.handleClick}>
                Delete this element?
                <div className='buttonsRow'>
                    <button id='yesButton' onClick={this.onConfirm}>Yes</button>
                    <button id='noButton' onRequestClose={this.handleClick}>No</button>
                </div>
            </Modal>
        );
    },
    render: function() {
        return <a href="#" id='modalLink' onClick={this.handleClick}>{this.props.buttonName}</a>;
    }
});
module.exports = ModalLink;