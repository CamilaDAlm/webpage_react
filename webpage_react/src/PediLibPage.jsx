
import React from "react";
import { useEffect } from "react";
import { FamilyTreeComponent } from "./Components/familyTree_component";
import {HeaderComponent} from "./Components/headerComponent";
import './families.json';
import './PediLib.css';

export class PediLibraryPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = { families:[],
          init:true,
          inputs:"",
          view : <div class='view'>
          <div class='view-inter'>
            
          </div>
        </div>
        };
      }

      handleClick(){
      
        this.context.setPageTag(3)
     } 

     handleFamilyTreesView(name){
      let family = this.state.families.filter((f)=>{return( f.title == name )})
      
      let newView = <div class='view'>
      <div class='view-inter'>
        <FamilyTreeComponent tableIndivs = {family[0].members} />
      </div>
    </div>
     this.setState({view:newView})
      //return(view)
     }
     
     handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      this.setState({inputs:value })
      //setInputs(values => ({...values, [name]: value}))
      /*const values=() =>{return ({...values, [name]: value}) }
      this.setState({inputs:values })
      console.log(this.state.inputs);*/
      
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      console.log('inputs',this.state.inputs);
      this.handleFamilySearch()
      /*return(
        props.on_action_to_perform("GENERAL",
        
                { action: "SAVE_INDIVIDUAL", value:inputs })
               
                )*/
    }

     componentDidMount(){
          fetch('./families.json'
          ,{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }
          ).then((res) => res.json())
          .then((json) => {
    
            this.setState({
              families:json[0].families
            });
          })
        
        
        
        
      }

      familiesTable(){
      /*const tableRows=()=>{ 
        this.state.families.map((f)=>{return(<tr>
        <td>f.title</td>
        <td>f.date</td>
      </tr>)})  }*/
      let tableRows = []
      tableRows = this.state.families.map((f)=>{return(<tr type='button' onClick={()=>{this.handleFamilyTreesView(f.title)}}>
        <td>{f.title}</td>
        <td>{f.date}</td>
      </tr>)}) 
        //console.log('tR',tableRows)

        let table = 
      <table>
        <tr>
          <th>Family tree</th>
          <th>Date of creation</th>
        </tr>
        {tableRows}
      </table>
      return table
      }

      handleFamilySearch(){
        let sfam = this.state.families.filter((f)=>{return( f.title == this.state.inputs)})
        this.setState({families:sfam})
        this.familiesTable()
       }

      getNamesList(spats){
        let namesList = [];
        for (const sp of spats){
          namesList.push(<option value={sp["title"]}></option>)
        }
        return namesList;
      }

      render(){
        console.log("st",this.state)
        let table = this.familiesTable()
     

      if (this.state.families.length > 0 && this.state.init == true){ //first time only to show init tree
        this.setState({init:false,
        view:<div class='view'>
        <div class='view-inter'>
          <FamilyTreeComponent tableIndivs={this.state.families[0].members} />
        </div>
      </div>})
      }

      let search =  <form onSubmit={this.handleSubmit} className='form-style'>
      <label >
      <input 
       list = "names"
        type="text"
        name="family_search"
        value={this.state.inputs.family_search} 
        onChange={this.handleChange}
        placeholder="Search..."
      />
       <datalist id="names">
      {this.getNamesList(this.state.families)}
    </datalist>
      </label>
      <svg class='search-style'  clip-rule="evenodd"  fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"  xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fill-rule="nonzero"/>
      <foreignObject x="0" y="10"  width="20" height="20">
      <input type="submit" value="" className="find" />
      </foreignObject>
      </svg>
     
    </form>
        return(<div class='body-style'>
                  <HeaderComponent/>
                  {search}
                  {table}
                  {this.state.view}
                  </div>)
      }

}