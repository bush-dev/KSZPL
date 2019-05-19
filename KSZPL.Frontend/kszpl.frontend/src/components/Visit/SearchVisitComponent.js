import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Table, FormControl, Col, Row, Form, Button, Card} from "react-bootstrap";
import "../../styles/visit.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class SearchVisitComponent extends Component{

    constructor()
    {
        super();
        this.state = {
            visits: [],
            patients: [],
            doctors: [],
            dateVisit: new Date(),
            patientId: 0,
            doctorId: 0,
            nullPatient: 0,
            nullDoctor: 0
        }

    } 

    componentDidMount(){
        axios.get(BASE_URL + 'visit/createvisit')
       .then((response) => {
       this.setState({
           patients: response.data.patients,
           doctors: response.data.doctors
       });
       })
    }

    parseDate(date)
    {
        return (
            moment(date).format("DD-MM-YYYY")
        )
    }

    mapVisitsToShow = () => {
        if(this.state.visits[0] != null){
            return this.state.visits.map((visit) => (
            <tr>
                <td>{this.parseDate(visit.dateVisit)}</td>
                <td>{visit.place}</td>
                <td>{visit.patientName}</td>
                <td>{visit.doctorName}</td>
                <td> <Button variant="info" onClick={() => this.OnClickMoreInfo(visit.id)}>Więcej</Button> </td>
                <td> <Button variant="primary" onClick={() => this.OnClickAddRecipe(visit.id)}>Dodaj receptę</Button> </td>
            </tr>
            ));
    }
    };

    createOptionsPatients = () =>{  return this.state.patients.map(patients => (
        <option value={patients.value} key={patients.value}>
          {patients.label}
        </option>
      ))
  }

  createOptionsDoctors = () =>{  return this.state.doctors.map(doctors => (
      <option value={doctors.value} key={doctors.value}>
        {doctors.label}
      </option>
    ))
  }

  onChangeDateVisit = dateVisit => this.setState({ dateVisit })

  onChangePatientId = (event) => {
    this.setState({patientId: event.target.value});
  }

  onChangeDoctorId = (event) => {
    this.setState({doctorId: event.target.value});
  }

  OnClickMoreInfo = (visitId) => {
      debugger;
    window.location = '/visit/' + visitId;
  }

  OnClickAddRecipe = (visitId) => {
      window.location = '/createrecipe/' + visitId;
  }
  

  findVisit = () => {
        debugger;
        axios.get( BASE_URL + `visit/find/${this.state.patientId}/${this.state.doctorId}/${this.parseDate(this.state.dateVisit)}`)
        .then(response => {
            debugger;
            if (response.data[0] != null) {
              this.setState({ visits: response.data });
              this.mapVisitsToShow();
            }
            else
            {
                window.confirm('Nie znaleziono wizyty spełniającej kryteria!');
                window.location = '/searchvisit/'
            }
    }); 
  }



    render(){
            
        return (
            <div>
                <Card>
                <Card.Body>
                <Row>
                    <Col sm={2}> </Col>
                    <Col sm={4}> <Form.Label> <b> Doktor:</b>  </Form.Label> </Col>
                    <Col sm={4}> <Form.Label> <b> Pacjent:</b>  </Form.Label> </Col>
                    <Col sm={2}> </Col>
              </Row>
                <Row>
                <Col sm={2}> </Col>
                    <Col sm={4}>
                        <FormControl as="select" value={this.state.doctorId}  onChange={this.onChangeDoctorId}>
                            <option value='' key={this.state.nullDoctor}></option>
                            {this.createOptionsDoctors()}
                        </FormControl>
                    </Col>
                    <Col sm={4}>
                        <FormControl as="select" value={this.state.patientId}  onChange={this.onChangePatientId}>
                            <option value='' key={this.state.nullPatient}></option>
                            {this.createOptionsPatients()}
                        </FormControl>
                    </Col>
                    <Col sm={2}> </Col>
              </Row>
              <Row> <Form.Label>  </Form.Label> </Row> 
              <Row> <Col sm={12}> <Form.Label> <b> Termin wizyty: </b> </Form.Label> </Col> </Row> 
              <Row>
              <Col sm={12}>
                    <DatePicker selected={this.state.dateVisit}  
                                        onChange={this.onChangeDateVisit} 
                                        dateFormat="dd-MM-yyyy"
                                        timeCaption="time" />   
                    
                        </Col>
              
              </Row>
              <Row> <Form.Label>  </Form.Label> </Row> 
              <Row>
                <Col sm={12}>
                    <Button onClick={this.findVisit} className="btn btn-primary" type="submit">Szukaj</Button>
                </Col>
              </Row>
             </Card.Body>
             </Card> 
              <Row> <Form.Label>  </Form.Label> </Row> 
              <Table>
                <thead>
                  <tr>
                    <th>Termin</th>
                    <th>Miejsce</th>
                    <th>Pacjent</th>
                    <th>Doktor</th>
                    <th>  </th>
                  </tr>
                </thead>
                <tbody>{this.mapVisitsToShow()}</tbody>
              </Table>
            </div>
          );
    }

}

export default withRouter(SearchVisitComponent)