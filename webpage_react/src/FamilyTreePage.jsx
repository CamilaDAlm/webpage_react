import React from "react";
import { FamilyTreeComponent } from "./Components/familyTree_component";
import {HeaderComponent} from "./Components/headerComponent";
import './Components/familyTree_page.css';

export class FamilyTreePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  open: false
        };
      }


    render(){
        let ft = <div class= 'ft-style'>
    <FamilyTreeComponent/>
    </div>
    
    let pedBuilder =  <div class='body-style'>
            <HeaderComponent/>
            {ft}
            </div>

    return (pedBuilder)
    }  
    

}


