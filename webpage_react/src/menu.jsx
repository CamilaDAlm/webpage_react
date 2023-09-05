
//import { MenuComponent } from "./MenuComponent";
import React from 'react';
import { Context } from './Context/context';
import { FamilyTreeComponent } from "./Components/familyTree_component";
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
    if (this.context.page == 1) {
        let start = 
   <h2 class='title-start'> Welcome to the pedigree collection. This is a demo project
      based a bit from a final degree project. Click the following button
      to create a pedigree or to see the saved ones. </h2>   
  
     
  
  let startButton = <button class='button-style button-start' onClick={()=>this.handleClickStart()} >Start</button>
  
   return (<div class='body-style'>
             <HeaderComponent/>
              {start}
              {startButton}
   </div>)
    }else if (this.context.page == 2){
        return(<FamilyTreePage state ={this.state} header = {<HeaderComponent/>}/>)
    }else if (this.context.page == 3){
        return(<PediLibraryPage/>)
    }else {
        let start = 
   <h2 class='title-start'> Welcome to the pedigree collection. This is a demo project
      based a bit from a final degree project. Click the following button
      to create a pedigree or to see the saved ones. </h2>   
  
     
  
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