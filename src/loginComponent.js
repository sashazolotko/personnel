var React = require('react');
var LoginComponent = React.createClass({
    getInitialState: function () {
        return {
            login: '',
            password: '',
            error: ''
        };
    },
    handlerChange: function (evt) {
        this.setState({
            error: '',
            [evt.target.id]: evt.target.value
        });
    },
    handlerSubmit: function () {
        var reverse = this.state.password.split('').reverse().join('');
        if (this.state.login === reverse && this.state.login != '') {
            this.setState({
                login: '',
                password: ''
            });
            this.props.parentCallback();
        } else {
            this.setState({error: 'Error login or password!'});
        }
    },
    render: function () {
        return (
            <div className={'login' + (this.props.visible ? '' : ' novisible')}>
                <form>
                    <h1>Login</h1>
                    <label htmlFor='#login'>Login</label>
                    <input type='text' value={this.state.login} onChange={this.handlerChange} id='login'/>
                    <label htmlFor='#password'>Password</label>
                    <input type='password' id='password' onChange={this.handlerChange} value={this.state.password} />
                    <button type='button' onClick={this.handlerSubmit}>Submit</button>
                    <span className='errorBlock'>{this.state.error}</span>
                </form>
            </div>
        );
    }
});
module.exports = LoginComponent;