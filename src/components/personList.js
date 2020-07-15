import React from 'react';
import Axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons:[]
    }


componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=10&nat=us").then(res => {
        console.log(res.data.results);
        this.setState({persons: res.data.results})
    })
}
render(){
    return (
       
            
            
        <div className="empBody">
        {this.state.persons.map(person => (
            <div className="empBlock">
            <ul>
                <li><img src={person.picture.medium} alt=''></img></li>   
                <li key={person.name.first}>{person.name.first} {person.name.last}</li>
                <li key={person.dob.date}>{person.dob.age}</li>
                <li key={person.cell}>{person.cell}</li>
                <li key={person.email}>{person.email}</li>
                <li key={person.phone}>{person.location.city}{person.location.state}</li>
            </ul>
            </div>
        ))}
    </div>
    )
}
}