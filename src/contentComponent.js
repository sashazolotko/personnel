var React = require('react');
var EmployeeComponent = require('./employeeComponent');
var ModalLink = require('./modalComponents');
var ContentComponent = React.createClass({
    getInitialState: function () {
        return {
            selected: false,
            active: false,
            mode: 'create',
            personnel: JSON.parse(localStorage.getItem('personnel')),
            firstname: '',
            lastname: '',
            post: ''
        };
    },
    handleToggleMode: function () {
        this.setState({
            mode: 'Create',
            selected: false,
            firstname: '',
            lastname: '',
            post: '',
            active: true
        });
    },
    handleDeleteButton: function (evt) {
        this.setState({isShow: true});
        this.state.personnel.splice(evt, 1);
        this.setState({personnel: this.state.personnel});
        localStorage.setItem('personnel', JSON.stringify(this.state.personnel));
        this.setState({
            selected: false,
            active: false
        });
    },
    handleSaveButton: function () {
        if (this.state.firstname == '' || this.state.lastname == '' || this.state.post == '') {
            return;
        }
        var newEmployee = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            post: this.state.post
        };
        if (this.state.selected !== false) {
            this.state.personnel.splice(this.state.selected, 1, newEmployee);
            this.setState({personnel: this.state.personnel});
            localStorage.setItem('personnel', JSON.stringify(this.state.personnel));
            return;
        }
        this.state.personnel.push(newEmployee);
        this.setState({personnel: this.state.personnel});
        localStorage.setItem('personnel', JSON.stringify(this.state.personnel));
        this.handleSelect(this.state.personnel.length - 1);
    },
    handleInput: function (evt) {
        this.setState({[evt.target.id]: evt.target.value});
    },
    handleSelect: function (indx, evt) {
        if (evt && (evt.target.id == 'deleteButton' || evt.target.id == 'modalLink')) {
            return;
        }
        this.setState({
            mode: 'Edit',
            selected: indx,
            firstname: this.state.personnel[indx].firstname,
            lastname: this.state.personnel[indx].lastname,
            post: this.state.personnel[indx].post,
            active: true
        });
    },
    handlerExit: function () {
        this.setState({
            mode: 'Create',
            firstname: '',
            lastname: '',
            post: '',
            selected: false,
            active: false
        });
        this.props.parentCallback();
    },
    render: function () {
        var personnel = this.state.personnel.map(function (p, indx) {
            return (<li className={'employee'} onClick={this.handleSelect.bind(undefined, indx)}>
                <EmployeeComponent p={p}/>
                <button type='button' id='deleteButton' className={'deleteButton'} >
                    <ModalLink buttonName='Delete' onConfirm={this.handleDeleteButton.bind(this, indx)}/>
                </button>
            </li>);
        }.bind(this));
        return (
            <div className={'content' + (this.props.visible ? '': ' novisible')}>
                <div className={'header'}>
                    <h1>Personnele</h1>
                    <button type='button' onClick={this.handlerExit}>Exit</button>
                </div>
                <div className='left'>
                    <ul>
                        {personnel}
                    </ul>
                </div>
                <div className={'right' + (this.state.active ? '' : ' hidden')}>
                    <h2>{this.state.mode} employee</h2>
                    <form className={this.state.mode}>
                        <label htmlFor='#firstname'>firstname</label>
                        <input type='text' id='firstname' value={this.state.firstname}
                               onChange={this.handleInput}/>
                        <label htmlFor='#lastname'>lastname</label>
                        <input type='text' id='lastname' value={this.state.lastname}
                               onChange={this.handleInput}/>
                        <label htmlFor='#post'>post</label>
                        <input type='text' id='post' value={this.state.post}
                               onChange={this.handleInput}/>
                        <button type='button' onClick={this.handleSaveButton}>Save</button>
                    </form>
                </div>
                <div className='footer'>
                    <button type='button' onClick={this.handleToggleMode}>Add</button>
                </div>
            </div>
        );
    }
});
module.exports = ContentComponent;