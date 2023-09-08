import React from "react";
import { FamilyTreeComponent } from "./Components/familyTree_component";
import {HeaderComponent} from "./Components/headerComponent";
import './Components/familyTree_page.css';
import { Context } from "./Context/context";
export class FamilyTreePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  open: true,
           
        };
      }

    render(){
        
         if (this.state.open === true ){
            this.context.setFamilyTable([
                {"nodeId":0,"mId":null},
                {"nodeId":1, "id":"1","gender":"F","fId": 0, "mId":0},
                {"nodeId":2,"id":"2","gender":"M","fId": 0,"mId":0},
                {"nodeId":3,"id":"3","gender":"M","fId": 2,"mId":1}])
            this.setState({open:false})        
         }
           console.log('contx',this.context.family)
            let ft = <div class= 'ft-style'>
        <FamilyTreeComponent tableIndivs={this.context.family}/>
        </div>

        let pedBuilder =  <div class='body-style'>
                <HeaderComponent/>
                {ft}
                </div>
        return (pedBuilder)
        
   
    }  
    

}

FamilyTreePage.contextType=Context;
