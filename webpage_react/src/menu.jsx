
//import { MenuComponent } from "./MenuComponent";
import React from 'react';
import { Context } from './Context/context';
import {HeaderComponent} from "./Components/headerComponent";
import {FamilyTreePage} from "./FamilyTreePage";
import './Components/familyTree_page.css';
import './menu.css';
import { PediLibraryPage } from './PediLibPage';
export class Menu extends React.Component{
constructor(props) {
    super(props);
    
    this.state = {  open: false,
        
    };
    
  }

handleClickStart(){
   //this.setState({open:true})
   this.context.setPageTag(2)
} 

render(){
    
  if (this.context.page == 2){
        return(<FamilyTreePage state ={this.state} header = {<HeaderComponent/>}/>)
    }else if (this.context.page == 3){
        return(<PediLibraryPage/>)
    }else {
        let start = 
        <h2 class='title-start'> Welcome to the pedigree collection. This is a demo web-based app for building and navigating pedigree trees. Click the following button
        to create a pedigree tree. Also, clicking on pedigree library it is possible to see the
        saved family trees. </h2> 
  
  let startButton = <button class='button-style button-start' onClick={()=>this.handleClickStart()} >Start</button>
  
   return (<div class='body-style'>
             <HeaderComponent/>
              {start}
              {startButton}
   </div>)
    }

}  

 //<MenuComponent name='Pepe'/><FamilyTreeComponent/>  
}

Menu.contextType = Context;
//export default Menu;