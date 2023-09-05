import React, { Component } from 'react';
import './menu.css';

export function MenuComponent(props){

 //<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
 let header = <div class='top'>
               
 <button class='button-style '>Home</button>
 <button class='button-style'>Home</button>
 <button class='button-style'>Home</button>

</div>

let body = <div class='body-style'>
<svg width="200" height="200" class='svg-style'>
  <rect class="rect-style"/>
</svg>
<div class='svg-style'>
    <p>bla bla bla bla bla bla bla</p>
</div>

</div>

   return (<div>
   {header}
   {body}
   </div>
    
            

   )
}

/*<div class="top">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
        <div class="top">
          <div class="w3-row w3-large w3-light-grey">
                <div class="w3-col s3">
                <button class="w3-button w3-block">Home</button>
                </div>
                <div class="w3-col s3">
                <a href="#plans" class="w3-button w3-block">Plans</a>
                </div>
                <div class="w3-col s3">
                <a href="#about" class="w3-button w3-block">About</a>
                </div>
                <div class="w3-col s3">
                <a href="#contact" class="w3-button w3-block">Contact</a>
                </div>
          </div>
       </div>
   </div>*/