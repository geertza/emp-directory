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
        <ul>
            
            {this.state.persons.map(person => (<li key={person.email}>{person.name.first}</li>))}
        </ul>
    )
}
}