import React, { Component } from 'react';
import axios from 'axios'

class EditTicket extends Component {

  constructor(props) {
    super(props);

    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePermission = this.onChangePermission.bind(this);
    this.onChangeInstruction = this.onChangeInstruction.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.state = {
      priority: '',
      category: '',
      description: '',
      permission: '',
      instruction: '',
      status: '',
      dueDate: ''
    }
  }

  componentDidMount() {
    console.log("edit component mounted")
    console.log(this.props.match.params.id)
    axios.get(`http://localhost:4000/tickets/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({
          priority: response.data.priority,
          category: response.data.category,
          description: response.data.description,
          permission: response.data.permission,
          instruction: response.data.instruction,
          status: response.data.status,
          dueDate: response.data.dueDate
        })
        console.log(this)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }


  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePermission(e) {
    this.setState({
      permission: e.target.value
    });
  }

  onChangeInstruction(e) {
    this.setState({
      instruction: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeDueDate(e) {
    this.setState({
      dueDate: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const obj = {
      priority: this.state.priority,
      category: this.state.category,
      description: this.state.description,
      instruction: this.state.instruction,
      permission: this.state.permission,
      status: this.state.status,
      dueDate: this.state.dueDate
    }
    axios.put(`http://localhost:4000/tickets/${this.props.match.params.id}/edit`, obj)
      .then(res => console.log(res.data));

    this.props.history.push('/');
  }

  formatDate(dueDate) {
    if (!dueDate) {
      return ""
    }
    let reg = /\d\d\d\d-\d\d-\d\d/i
    return dueDate.match(reg)[0]
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6">
                  <div class="card">
                    <div class="card-header">Maintenance Request</div>
                    <div class="card-body">
                      <div class="card-title">
                        <h3 class="text-center title-2">Update Ticket</h3>
                      </div>
                      <div>

                        <form onSubmit={this.onSubmit}>
                          <div className="form-group">
                            <label>Priority: </label>
                            <input type="text"
                              className="form-control mw-75"
                              value={this.state.priority}
                              onChange={this.onChangePriority}
                            />
                          </div>
                          <div className="form-group">
                            <label>Category: </label>
                            <input type="text"
                              className="form-control mw-75"
                              value={this.state.category}
                              onChange={this.onChangeCategory}
                            />
                          </div>
                          <div className="form-group">
                            <label>Description: </label>
                            <textarea rows="5"
                              className="form-control rounded mw-75"
                              value={this.state.description}
                              onChange={this.onChangeDescription}
                            />
                          </div>
                          <div className="form-group">
                            <label>Permission to Enter: </label>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mw-75"
                                type="radio"
                                name="typeOptions"
                                id="yesEnter"
                                value="Yes"
                                checked={this.state.permission === 'Yes'}
                                onChange={this.onChangePermission}
                              />
                              <label className="form-check-label">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mw-75"
                                type="radio"
                                name="typeOptions"
                                id="noEnter"
                                value="No"
                                checked={this.state.permission === "No"}
                                onChange={this.onChangePermission}
                              />
                              <label className="form-check-label">No</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Maintenance Status: </label>
                            <br />
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mw-75"
                                type="radio"
                                name="statusOptions"
                                id="notStarted"
                                value="Not Started"
                                checked={this.state.status === 'Not Started'}
                                onChange={this.onChangeStatus}
                              />
                              <label className="form-check-label">Not Started</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mw-75"
                                type="radio"
                                name="statusOptions"
                                id="inProgress"
                                value="In Progress"
                                checked={this.state.status === "In Progress"}
                                onChange={this.onChangeStatus}
                              />
                              <label className="form-check-label">In Progress</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mw-75"
                                type="radio"
                                name="statusOptions"
                                id="finished"
                                value="Finished"
                                checked={this.state.status === 'Finished'}
                                onChange={this.onChangeStatus}
                              />
                              <label className="form-check-label">Finished</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label >Ticket Due Date: </label>
                            <input className="form-control mw-75"
                              type="date"
                              name="ticketDueDate"
                              max="2022-12-31"
                              min="2019-02-01"
                              onChange={this.onChangeDueDate}
                              value={this.formatDate(this.state.dueDate)}
                            />
                          </div>
                          <div className="form-group">
                            <button id="payment-button" type="submit" class="btn btn-lg btn-info btn-block">
                              <span >Submit</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditTicket;