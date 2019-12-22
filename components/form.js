import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Seats from './seats';
// import { Link } from 'react-router-dom';
import './form.css';
import "react-datepicker/dist/react-datepicker.css";
import firebase from 'firebase';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            startDate: new Date(),
            date: null,
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    search = () => {
        let date = this.state.startDate;

        let d = date.getDate();
        let m = date.getMonth() + 1;
        let y = date.getFullYear();

        date = 'D_' + d + '_' + m + '_' + y;

        var ref = firebase.database().ref("/Bus/Bus1/Book/");
        ref.once("value")
            .then(function (snapshot) {
                var ifChild = snapshot.hasChild(date);
                let parent = ref.parent;
                if (!ifChild) {
                    parent.on('value', data => {
                        let userData = data.val()
                        let dedefaultSeatCode = userData.defaultSeatCode
                        ref.child(date).set({
                            seatCode: dedefaultSeatCode
                        })
                    })
                }
                else {
                    this.setState({
                        date: date
                    })
                }
            }.bind(this));
    }

    render() {
        return (
            <div>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    minDate={new Date()}
                />
                <button onClick={this.search}>Search</button>
                <br />
                <br />
                <br />
                {this.state.date ? <Seats date={this.state.date} /> : null}
            </div>
        );
    }
}

export default Form;