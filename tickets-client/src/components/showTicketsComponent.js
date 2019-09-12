import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Ticket extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    console.log('hitting the delete button');
    axios.delete(`http://localhost:4000/tickets/${this.props.ticket._id}/delete`)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))
  }

  formatDueDate(dueDate) {
    let reg = /\d\d\d\d-\d\d-\d\d/i
    return dueDate.match(reg)[0]
  }

  render() {
    return (
      <tr>
        <td className={this.props.ticket.status === 'Finished' ? 'finished' : ''}>{this.props.ticket.priority}</td>
        <td className={this.props.ticket.status === 'Finished' ? 'finished' : ''}>{this.props.ticket.category}</td>
        <td className={this.props.ticket.status === 'Finished' ? 'finished' : ''}>{this.props.ticket.permission}</td>
        <td className={this.props.ticket.status === 'Finished' ? 'finished' : ''}>{this.props.ticket.status}</td>
        <td className={this.props.ticket.status === 'Finished' ? 'finished' : ''}>{this.formatDueDate(this.props.ticket.dueDate)}</td>
        <td>
          <Link to={this.props.ticket._id + '/edit'}>Edit</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  }
}

class TicketsList extends Component {

  constructor(props) {
    super(props);
    this.state = { tickets: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/tickets')
      .then(response => {
        console.log(response);
        this.setState({ tickets: response.data });

      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/tickets')
      .then(response => {
        this.setState({ tickets: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  ticketList() {
    return this.state.tickets.map(function (currentTicket, i) {
      return <Ticket ticket={currentTicket} key={i} />;
    });
  }

  render() {
    return (
      <div style={{ padding: 15 }} class="container-fluid">
        <div class="row">
          <div class="col-lg-9">
            <div class="table-responsive table--no-card m-b-30">
              <table class="table table-borderless table-striped table-earning">
                <thead class="thead-dark">
                  <tr>
                    <th>Priority</th>
                    <th>Category</th>
                    <th>Enter Permission</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                    <th>Deletion</th>

                  </tr>
                </thead>
                <tbody>
                  {this.ticketList()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TicketsList;