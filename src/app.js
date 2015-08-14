var React = require('react');
var LoginComponent = require('./loginComponent');
var ContentComponent = require('./contentComponent');
var AppComponent = React.createClass({
    getInitialState: function () {
        return {
            isContentShow: false
        };
    },
    onChildChange: function () {
        this.setState({isContentShow: !this.state.isContentShow});
    },
    render: function () {
        return (
            <div>
                <LoginComponent visible={!this.state.isContentShow} parentCallback={this.onChildChange}/>
                <ContentComponent visible={this.state.isContentShow} parentCallback={this.onChildChange}/>
            </div>
        );
    }
});
module.exports = AppComponent;