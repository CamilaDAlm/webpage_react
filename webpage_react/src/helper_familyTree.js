
export class HelperFamilyTree {

    static empty_dictionary(keys){
        let empty_obj = new Object()
        
        for (const key of keys) {
            empty_obj[key] = "?"
           
        }
        empty_obj["mId"] = "?"
        empty_obj["fId"] = "?"
        empty_obj["nodeId"] = "?"
        return (empty_obj)
      
      }

    static createRoot(){
        return {"nodeId":0, "mId":null }
    }

    static createMother(initIndiv,ID,pID){
        const keys = Object.keys(initIndiv)
        let mother = this.empty_dictionary(keys)
        //mother["mother_id"] = mID
        //mother["father_id"] = ""
        mother["gender"] = "F"
        mother["nodeId"] = ID
        mother["mId"] = pID
        mother["fId"] = pID
        /*if (initIndiv["mother_id"]!= "?" ){
            mother["id"] = initIndiv["mother_id"]
            
        }*/
        return mother
    }

    static createFather(initIndiv,ID,pID){
        const keys = Object.keys(initIndiv)
        let father = this.empty_dictionary(keys)
        //father["mother_id"] = mID
        //father["father_id"] = ""
        father["nodeId"] = ID
        father["gender"] = "M"
        father["mId"] = pID
        father["fId"] = pID
        //father["id"] = ID
        /*if (initIndiv["father_id"]!= "?" ){
            father["id"] = initIndiv["father_id"]
            
        }*/
        return father
    }

    static createTable(initIndiv){
        const keys = Object.keys(initIndiv)
        let root = this.createRoot()
        let tableIndiv = []

        //let mother = this.createMother(initIndiv,root["id"])
        //let father = this.createFather(initIndiv,root["id"])
        let mother = this.createMother(initIndiv,1,root["nodeId"])
        let father = this.createFather(initIndiv,2,root["nodeId"]) 
        tableIndiv.push(mother)
        tableIndiv.push(father)
        tableIndiv.push(root)        
        tableIndiv = this.addIndiv(initIndiv,tableIndiv,mother,father)
        //tableIndiv.push(initIndiv)
       
        /*for(let i =0;i<2;i++){
              tableIndiv.push(emptyIndiv)  
        }*/
        return tableIndiv    

    }  
    
    static getLargestID(table){
        let max = 0
        table.map(ind =>{
            if (ind["nodeId"] > max){
                max = ind["nodeId"]
            }
            
        }
           )
           return max
    }

    static addIndiv(indiv,table,mother,father){
        let lastId = this.getLargestID(table)
        indiv["nodeId"] = lastId+1
        indiv["mId"] = mother["nodeId"]      
        indiv["fId"] = father["nodeId"] 
        table.push(indiv)
        return table
    }

    static deletIndiv(id,table){    
      return  table.filter(ind=>{return (ind["nodeId"]!=id )})
    }

    static findIndiv(id,table){
        return table.filter(ind=>{return (ind["nodeId"]==id )})
    }
    static findChildren(parentID,table){
        return table.filter(ind=>{return (ind["mId"]==parentID || ind["fid"]==parentID )})
    }

    static addChildren(number,table,mother,father,lastId){
        const keys = Object.keys(mother)
        let childlist = [] //this.empty_dictionary(keys) * number
        for(let i=0;i<number;i++){
          childlist.push(this.empty_dictionary(keys))
        }
        for(let i=0;i<number;i++){
            childlist[i]["nodeId"]=lastId+(i+1)
            childlist[i]["mId"]=mother
            childlist[i]["fId"]=father
            //table.push(childlist[i])
          }
          return childlist

    }
    static addParents(son,table,parent){
        let lastId = this.getLargestID(table)
        //let aux = this.createMother(son,lastId+1,parent["nodeId"])
        let children = this.findChildren(parent["nodeId"],table).filter(c=>{return(c["nodeId"]!=son["nodeId"])})
        let newTable =  this.deletIndiv(son["nodeId"],table)
        if (children.length > 0){
            let childlist= this.addChildren(children.length,table,parent["nodeId"],parent["nodeId"],-lastId)
            for (let i =0;i<children.length;i++){
                children[i]["mId"]=childlist[i]["nodeId"]
                children[i]["fId"]=childlist[i]["nodeId"]
                newTable = this.deletIndiv(children[i]["nodeId"],newTable)
                newTable.push(children[i])
                newTable.push(childlist[i])
            }
        }
        let mother = this.createMother(son,lastId+1,parent["nodeId"])
        let father = this.createFather(son,lastId+2,parent["nodeId"]) 
        let newSon = Object.assign({},son)
        newSon["mId"] = mother["nodeId"]
        newSon["fId"] = father["nodeId"]
        
        newTable.push(mother)
        newTable.push(father)
        newTable.push(newSon)
        return newTable
    }

    static updateIndiv(oldIndiv,newIndiv){
        oldIndiv["id"] = newIndiv["patient"]
        return oldIndiv
    }
}