import React, { Component } from 'react';
import firebase from 'firebase';
import './seats.css';

class Seats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busData: [],

            // for push
            busId: '',
            seatCode: '',
            seats: '',

            // for print
            seat: [],
            emptySpace: [],
            active: [],
            classes: [],

            // for search
            date: this.props.date,
        }
    }

    getData = () => {
        let ref = firebase.database().ref('Bus/Bus1/Book');
        

        // let database = firebase.database().ref('Bus/Bus1');
        // database.on('value',
        //     (data) => {
        //         let userData = data.val();
        //         if (userData) {
        //             let seatCode = userData.Book[this.state.date].seatCode;
        //             seatCode = seatCode.split('');

        //             let fliterSeats = (seatStatus) => {
        //                 return seatCode.map((x, i) => x == seatStatus ? i : null).filter(x => x != null);
        //             }

        //             let emptySpace = fliterSeats('_');

        //             let busSeats = userData.seats;
        //             let seat = [];
        //             for (let i = 0; i < busSeats; i++) {
        //                 seat.push(i + 1);
        //             }

        //             for (let i = 0; i < emptySpace.length; i++) {
        //                 let x = emptySpace[i];
        //                 seat.splice(x, 0, '')
        //             }

        //             let classes = [];
        //             seatCode.map((x, i) => {
        //                 if (x === 'a') {
        //                     classes.splice(i, 0, 'available')
        //                 }
        //                 else if (x === 'r') {
        //                     classes.splice(i, 0, 'reserved')
        //                 }
        //                 else if (x === 'u') {
        //                     classes.splice(i, 0, 'unavailable')
        //                 }
        //                 else if (x === '_') {
        //                     classes.splice(i, 0, 'emptySpace')
        //                 }
        //             })

        //             this.setState({
        //                 seat: seat,
        //                 seatCode: seatCode.join(''),
        //                 classes: classes,
        //                 active: seatCode,
        //             })

        //         }
            // }
        // )
    }

    componentDidMount() {
        this.getData();
        let x = [
            'a', 'r', 'a', 'a', 'a', 'a', 'a', 'r', 'a', 'a', 'a',
            'a', 'a', 'a', 'a', 'r', 'u', 'a', 'r', 'a', 'r', 'a',
            '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_',
            '_', 'a', 'a', 'a', 'a', 'r', 'a', 'r', 'a', 'u', 'a',
        ];
        let a = x.join('');
        console.log(a.length)
        console.log(a)
    }

    updateHandler = (seatSingle) => {
        let i = parseInt(seatSingle);
        let classesArray = this.state.classes;
        let active = this.state.active;

        classesArray[i] = classesArray[i] == 'active' ? 'available' : 'active';
        active[i] = active[i] == 'a' ? 'r' : 'a';

        this.setState({
            classes: classesArray,
            active: active,
        })
    }

    updateClick = () => {
        let update = this.state.active;
        update = update.join('')
        firebase.database().ref().child('/Bus/Bus1/Book').update({
            seatCode: update,
        })
    }

    render() {
        return (

            <div className='container grid'>
                <div className='flex'>
                    {this.state.seat.map((x, i) =>
                        <div className={'card ' + this.state.classes[i]}
                            key={i} onClick={e => this.updateHandler(i)}>{x}</div>
                    )}
                </div>
                <div>
                    <h1>Seat Reservation System</h1>
                    <input name='busId' placeholder='Bus Id' onChange={this.inputHandler} />
                    <input name='seats' placeholder='seats' onChange={this.inputHandler} />
                    <input name='seatCode' placeholder='Code' value={this.state.seatCode} onChange={this.inputHandler} />
                    <button onClick={this.submitHandler}>Submit</button>
                    <button onClick={this.updateClick}>Update</button>
                </div>
                <div>{this.state.active}</div>
            </div>

        )
    }

    inputHandler = (e) => {
        let nam = e.target.name;
        let value = e.target.value;
        this.setState({
            [nam]: value,
        })
    }

    submitHandler = () => {
        let ref = firebase.database().ref().child('/Bus/Bus1/Book/' + this.state.busId)
        // .set({
        //     seatCode: this.state.seatCode,
        //     seats: this.state.seats,
        // })
        let x = this.state.date;
        ref.set({
            [x]:'abc'
        })
        // ref.child('Book/').set({ seatCode: this.state.seatCode })

    }
}

export default Seats;