import React, { Component } from 'react';
import './App.css';
import GoodMatch from './components/GoodMatch';
import BadMatch from './components/BadMatch';
import { Button } from 'reactstrap';

export default class App extends Component{
  constructor(props){
    super(props)
    // The state object holds information that can be displayed to the user and updated throughout the program
    this.state = {
      // The handleChange methods update userName and loveName as the user types
      userName: "",
      loveName: "",
      value: "",
      percentage: ""
    }
  }

  handleChangeUser = (e) => {
    // This method takes the input and saves the value in this.state.userName so we can use the input in our program
    // no need to modify this method
    this.setState({ userName: e.target.value })
  }

  handleChangeLove = (e) => {
    // This method takes the input and saves the value in this.state.loveName so we can use the input in our program
    // No need to modify this method
    this.setState({ loveName: e.target.value })
  }

  // Add a method here that returns information to your user by adding a key:value pair to the state object. This method should utilize the user inputs established in state.

  percentageValue = (num) => {
      if(num > 1) return 0.25/num;
      else return num * 25
  }

  loveCal = () => {
      let num = "1234567890"
      let everyThing = this.state.userName + this.state.loveName
      if (everyThing.split("").filter(value => num.includes(value)).length === 0)
        {
          //Compare Name length
          let n1 = (this.state.userName.length / this.state.loveName.length)

          //Compare how many vowels in each name
          let vowels = "aeiouAEIOU"
          // let uservowel = this.state.userName.split("").filter(value => vowels.includes(value).length) + 1
          let n2 = ((this.state.userName.split("").filter(value => vowels.includes(value)).length + 1)/ (this.state.loveName.split("").filter(value => vowels.includes(value)).length + 1))

          //Compare how many constants in each name
          let cons = "qwrtypsdfghjklzxcvbnm"
          let cons2 = cons.toUpperCase() + cons
          let n3 = ((this.state.userName.split("").filter(value => cons2.includes(value)).length + 1)/ (this.state.loveName.split("").filter(value => cons2.includes(value)).length + 1))

          //Compare the distance between the starting letter
          let n4 = 1 - (Math.abs(this.state.userName.toLowerCase().charCodeAt(0) - this.state.loveName.toLowerCase().charCodeAt(0))/25)

          let sum = Math.trunc((this.percentageValue(n1) + this.percentageValue(n2) + this.percentageValue(n3) + this.percentageValue(n4)))
          this.setState({value: sum, percentage: sum + "%"})
        }else {
                this.setState({percentage: "only letters"})
        }
  }
  render(){

    // Destructuring this.state so that you may just use the following variables throughout your code
    let { value,
          userName,
          loveName,
          percentage
        } = this.state

    return(
      <>

        <div id = "all">
          <h1 id = "title"> Love-O-Meter </h1>

          {/* User input field - every DOM event that happens in the input will call the handleChange methods and update state */}
          <input
            id = "userName"
            onChange = { this.handleChangeUser }
            value = { userName }
            placeholder = "Your name"
          />
          <span id = "plus"> + </span>
          <input
            id = "loveName"
            onChange = { this.handleChangeLove }
            value = { loveName }
            placeholder = "Your love's name"
          />
          <br/>

          <Button
            //id = "submitButton"
            type = "submit"
            onClick = {this.loveCal}
            outline color="danger"
          >
          Submit!
          </Button>

          <p> Your compatibility percentage! </p>

          <textarea
            id = "compatibility"
            placeholder = "???"
            value = { this.state.percentage }
          />

          {/* Conditional rendering, based on the return value of calculatePercentage */}
          {/* Feel free to go in and change the values here to fall in line with your desired matching criteria */}
          { value <= 50 && value > 0 &&
            <div>
              <BadMatch />
            </div>
          }

          { value > 50 &&
            <div>
              <GoodMatch />
            </div>
          }

          {/* Go ahead and customize this info! */}
          <footer> Joe and Jeremy | LEARN Academy Alpha 2020 </footer>
        </div>

      </>
    )
  }
}
