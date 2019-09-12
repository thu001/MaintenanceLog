import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import CreateTicket from './components/createTicketComponent';
import TicketsList from './components/showTicketsComponent';
import EditTicket from './components/editTicketComponent';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <div>

            <nav class="navbar navbar-expand-xl navbar-dark bg-dark">
              <div className="container-fluid" height="100vh">
                <Link to="/" class="navbar-brand" ><h5>Maintenance System</h5></Link>

                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item ">
                      <Link to="/create" class="nav-link">Maintenance Request Form</Link>
                    </li>
                    <li class="nav-item ">
                      <Link to="/" className="nav-link">Request History</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <Route path="/" exact component={TicketsList} />
            <Route path="/:id/edit" component={EditTicket} />
            <Route path="/create" component={CreateTicket} />
          </div>

        </Router>
      </Fragment>
    );
  }
}

export default App;