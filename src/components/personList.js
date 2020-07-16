import React from 'react';
import Axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        persons:[],
        search:'',
        filteredPersons:'',
        sort:'',
        order:''
    }


componentDidMount() {
    Axios.get("https://randomuser.me/api/?results=200&nat=us").then(res => {
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
orderChange(event){
        this.setState({order:event.target.value})
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
      let orderedList = ''
      switch(this.state.order) {
        case 'reverse':
            orderedList = list.reverse()
          break;
        default:
            orderedList = list
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
        <label>Sort By </label>
          <select value={this.state.value} onChange={this.sortChange.bind(this)}>
            <option value="">default</option>
            <option value="age">Age</option>
            <option value="name">First Name</option>
          </select>
        <label>Order: </label>
          <select value={this.state.value} onChange={this.orderChange.bind(this)}>
            <option value="null">Asc</option>
            <option value="reverse">Desc</option>
          </select>
      </form>
            </div>
        <div className="grid">
        {orderedList.map(function (person,i){
            return <div key={i} className="empBlock">
            
                <img src={person.picture.large} alt=''></img>   
                <h1> {person.name.first} {person.name.last}</h1>
                <p>Age:{person.dob.age}</p>
                <p>Phone:{person.cell}</p>
                <p>Email:{person.email}</p>
                <p>{person.location.city}, {person.location.state}</p>
            
                </div>
        })}
        </div>
    </div>
    )
}
}