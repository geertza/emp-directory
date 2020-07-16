import React from 'react';
import Axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons:[],
        search:'',
        filteredPersons:'',
        sort:'age',
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
sortChange(event){
    this.setState({sort:event.target.value})
    }

     
render(){
    let filteredPersons = this.state.persons.filter(
        (persons) =>{
            return persons.name.first.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1 ;
        }
    )
    let list =''
    switch(this.state.sort) {
        case 'age':
          list =filteredPersons.sort((a,b)=> a.dob.age > b.dob.age ? 1:-1)
          break;
        case 'name':
         list =filteredPersons.sort((a,b)=> a.name.first > b.name.first ? 1:-1)
          break;
        default:
            list = filteredPersons
      }
   
    
    return (
        <div className="empBody">
            <div className='searchBar'>
            <label>First Name Search</label>
            <input type="text"
            id='nameSearch' 
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            />
            <form onSubmit={this.handleSubmit}>
        <label>
          Sort By
          <select value={this.state.value} onChange={this.sortChange.bind(this)}>
            <option value="">default</option>
            <option value="age">Age</option>
            <option value="name">First Name</option>
          </select>
        </label>
      </form>
            </div>
        <div className="grid">
        {list.map(person => (
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
    </div>
    )
}
}