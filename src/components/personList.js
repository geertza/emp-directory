import React from 'react';
import Axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons:[],
        search:''
    }


componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=10&nat=us").then(res => {
        console.log(res.data.results);
        this.setState({persons: res.data.results})
    })
}

updateSearch(event){
    this.setState({search:event.target.value.substr(0,10)})
}
render(){
    let filteredPersons = this.state.persons.filter(
        (persons) =>{
            return persons.name.first.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1 ;
        }
    )
    return (
        <div className="empBody">
        <input type="text" 
        value={this.state.search}
        onChange={this.updateSearch.bind(this)}
        />
        
        {filteredPersons.map(person => (
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