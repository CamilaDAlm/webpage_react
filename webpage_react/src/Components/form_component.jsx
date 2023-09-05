import React from 'react';
import { useState } from "react";
import './form.scss';

export function FamilyTreeFormComponent(props) {

    const [inputs, setInputs] = useState({});
    console.log(props.sensitive_patients)
    function getNamesList(spats){
      let namesList = [];
      for (const sp of spats){
        namesList.push(<option value={sp["Name"]}></option>)
      }
      return namesList;
    }
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      return(
        props.on_action_to_perform("GENERAL",
        
                { action: "SAVE_INDIVIDUAL", value:inputs })
               
                )
    }

     return( 
      <form onSubmit={handleSubmit} className='form-style'>
      <label className='label-style'>
      <label >Individual ID:
      <input 
        type="number" //text
        name="Patient_ID" 
        value={inputs.Patient_ID || ""} 
        onChange={handleChange}
      />
      </label>
      <label className='label-col'>Individual name:
      <input 
        list = "names"
        type="text" //text
        name="Name" 
        value={inputs.Name || ""} 
        onChange={handleChange}
      />
      <datalist id="names">
          {getNamesList(props.sensitive_patients)}
        </datalist>
      </label>
      </label>
      <label className='label-style'>
      <label >Gender:
      <input 
        type="text" //text
        name="Gender" 
        value={inputs.Gender|| ""} 
        onChange={handleChange}
      />
      </label>
      <label className='label-col'>Age:
        <input 
          type="number" 
          name="AGE" 
          value={inputs.AGE || ""} 
          onChange={handleChange}
        />
        </label>
        </label>
        <label className='label-style'>
        <label >Adopted:
      <input 
        type="checkbox"
        name="Adopted" 
        value={inputs.Adopted|| ""} 
        onChange={handleChange}
      />
      </label>
      <label >Deceased:
      <input 
       type="checkbox"
        name="Deceased" 
        value={inputs.Deceased || ""} 
        onChange={handleChange}
      />
      </label>
      </label>
      <label className='label-style'>
        <label >Mother ID:
        <input 
          type="number" 
          name="Mother_ID" 
          value={inputs.Mother_ID || ""} 
          onChange={handleChange}
        />
        </label>
        <label className='label-col'>Mother name:
        <input 
          list = "names"
          type="text" 
          name="Mother_name" 
          value={inputs.Mother_name || ""} 
          onChange={handleChange}
        />
        <datalist id="names">
          {getNamesList(props.sensitive_patients)}
        </datalist>
        </label>
        </label>
        <label className='label-style'>
        <label >Father ID:
        <input 
          type="number" 
          name="Father_ID" 
          value={inputs.Father_ID || ""} 
          onChange={handleChange}
        />
        </label>
        <label className='label-col' >Father name:
        <input 
          list = "names"
          type="text" 
          name="Father_name" 
          value={inputs.Father_name || ""} 
          onChange={handleChange}
        />
         <datalist id="names">
          {getNamesList(props.sensitive_patients)}
        </datalist>
        </label>
        </label>
        <input type="submit" value="Send" className='submit' />
    </form>
   
    );
     

}