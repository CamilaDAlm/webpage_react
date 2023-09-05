
import React from "react";
import { FamilyTreeComponent } from "./Components/familyTree_component";
import {HeaderComponent} from "./Components/headerComponent";

import './PediLib.css';

export class PediLibraryPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  open: false
        };
      }

      

      render(){
        let table = 
      <table>
        <tr>
          <th>Family tree</th>
          <th>Date of creation</th>
          <th>Country</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>

      let search = <form class = 'form-style' >  
          <input type="search" placeholder="Search..." />
          <button class="button-svg" >
          <svg class='search-style'  clip-rule="evenodd"  fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"  xmlns="http://www.w3.org/2000/svg"><path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fill-rule="nonzero"/></svg>
          </button>
      </form>

      let view = <div class='view'><FamilyTreeComponent/></div>
        return(<div class='body-style'>
                  <HeaderComponent/>
                  {search}
                  {table}
                  {view}
                  </div>)
      }

}