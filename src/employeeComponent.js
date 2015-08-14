var React = require('react');
var EmployeeComponent = React.createClass({
    render: function () {
        return (
            <div className={'employeeData'}>
                <p className='employeeName'>{(this.props.p.firstname) + ' ' + (this.props.p.lastname)}</p>
                <p className='employeePost'>{this.props.p.post}</p>
            </div>
        );
    }
});
module.exports = EmployeeComponent;
