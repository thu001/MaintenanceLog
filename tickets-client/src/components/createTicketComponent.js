import React, { Component } from 'react';
import axios from 'axios';



class CreateTicket extends Component {

  constructor(props) {
    super(props);

    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePermission = this.onChangePermission.bind(this);
    this.onChangeInstruction = this.onChangeInstruction.bind(this);
    this.onChangeDueDate = this.onChangeDueDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      priority: '',
      category: '',
      description: '',
      permission: '',
      instruction: '',
      status: 'Not Started',
      dueDate: ''
    }
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

  onChangeDueDate(e) {
    this.setState({
      dueDate: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Priority: ${this.state.priority}`);
    console.log(`Category: ${this.state.category}`);
    console.log(`Permission to Enter: ${this.state.permission}`);
    console.log(`Status: ${this.state.status}`);
    console.log(`Maintenance Due Date: ${this.state.dueDate}`);
    console.log(`Maintenance Instruction: ${this.state.instruction}`);
    console.log(`Brief Description: ${this.state.description}`);


    const newTicket = {
      priority: this.state.priority,
      category: this.state.category,
      description: this.state.description,
      permission: this.state.permission,
      instruction: this.state.instruction,
      status: this.state.status,
      dueDate: this.state.dueDate
    }

    axios.post('http://localhost:4000/tickets/new', newTicket)
      .then(res => console.log(res.data));

    this.setState({
      priority: '',
      category: '',
      description: '',
      permission: '',
      instruction: '',
      status: 'Not Started',
      dueDate: ''
    })
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
                        <h3 class="text-center title-2">Maintenance Invoice</h3>
                      </div>
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group mw-75">
                          <label>Priority*: </label>
                          <select type="text"
                            className="form-control"
                            value={this.state.priority}
                            onChange={this.onChangePriority}
                            defaultValue=""
                            required
                          >
                            <option value="" disabled hidden>Choose here</option>
                            <option value="Emergency" >Emergency</option>
                            <option value="Make Ready">Make Ready</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Preventative Maintenance">Preventative Maintenance</option>
                            <option value="Routine">Routine</option>
                          </select>
                        </div>
                        <div className="form-group mw-75">
                          <label>Category*: </label>
                          <select type="text"
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeCategory}
                            defaultValue=""
                            required
                          >
                            <option value="" disabled hidden>Choose here</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Interior">Interior</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Applicances">Applicances</option>
                            <option value="Exterior">Exterior</option>
                            <option value="Leaks/Moisture">Leaks/Moisture</option>

                          </select>
                        </div>
                        <div className="form-group">
                          <label>Full Description: </label>
                          <textarea rows="6"
                            className="form-control rounded mw-75"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            maxLength="800"
                          />
                        </div>
                        <div className="form-group">
                          <label>Permission to Enter: </label>
                          <br />
                          <div className="form-check form-check-inline">
                            <input className="form-check-input"
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
                            <input className="form-check-input"
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
                          <label>Access Instructions: </label>
                          <textarea rows="3"
                            type="text "
                            className="form-control mw-75"
                            value={this.state.instruction}
                            onChange={this.onChangeInstruction}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label >Ticket Due Date: </label>
                          <input className="form-control mw-75"
                            type="date"
                            name="ticketDueDate"
                            max="2020-12-31"
                            min="2019-02-15"
                            onChange={this.onChangeDueDate}
                            value={this.state.dueDate}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <button id="payment-button" type="submit" class="btn btn-lg btn-info btn-block">
                            <span >Submit</span>
                          </button>
                        </div>
                      </form>
                    </div >

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

export default CreateTicket;