import React, { useContext } from 'react';
import * as d3 from "d3";
import { useRef,useEffect} from "react";
import { Context } from '../Context/context';
import { HelperFamilyTree } from '../helper_familyTree';

export function FamilyTreeComponent(props){   
  //console.log("Table of patients:", props.tableIndivs)
    let tableIndivs = props.tableIndivs
    
    const context = useContext(Context);
   
    const svgRef = useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleClickAway = (state) =>{
      setOpen(state);
  };
  const handleClick =  () => {
    setOpen((prev) => !prev);
   
  };

    useEffect(() =>{
      renderTree(tableIndivs);
   
   },[tableIndivs]

   );

   

    function renderTree(table){
    
      const clickHandler = (tag,id) => {
      
        console.log("tag",tag)
        console.log("id",id)
        let son = tableIndivs.filter((i)=>{return(i.nodeId==id)})[0]
        let mother = tableIndivs.filter((i)=>{return(i.nodeId==son.mId)})[0]
        console.log('m',mother)
        tableIndivs=HelperFamilyTree.addParents(son,tableIndivs,mother)
        /*let maxId = getLargestID(tableIndivs)
        let updateIds = tableIndivs.filter((i)=>{return(i.nodeId==id)})[0]
        console.log("upId",updateIds)
        tableIndivs.push({nodeId:maxId+1, id:(maxId+1).toString(),gender:"F",fId: 0, mId:0})
        updateIds.mId = maxId+1
        tableIndivs.push({nodeId:maxId+2, id:(maxId+2).toString(),gender:"M",fId: 0, mId:0})
        updateIds.fId =maxId+2
        tableIndivs = tableIndivs.filter((i)=>{return(i.nodeId!=id)})
        tableIndivs.push(updateIds)*/
        context.setFamilyTable(tableIndivs)
    /*
        tableIndivs.push({nodeId:Int32(id)+1, id:String(Int32(id)+1),gender:"F",fId: 0, mId:0})
        tableIndivs.push({nodeId:id+2, id:id+2,gender:"M",fId: 0, mId:0})
    
        return(
          props.on_action_to_perform("GENERAL",
          
                  { action: "UPDATE_INDIVIDUAL", value:{page:"family_tree", id_patient:id,tag:tag} })
                 
                  )*/
                  
       
        };
       
      //original code from https://observablehq.com/@d3/tree
        function Tree(data, { // data is either tabular (array of objects) or hierarchy (nested objects)
            path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
            id = Array.isArray(data) ? d => d.nodeId  : null,//d.id : null // if tabular data, given a d in data, returns a unique identifier (string)
            parentId = Array.isArray(data) ? d => d.mId : null,
            //d => d.mother_id != "" ? d.mother_id : d.father_id,// if tabular data, given a node d, returns its parent’s identifier  Array.isArray(data) ? d => d.parentId : null,
            children, // if hierarchical data, given a d in data, returns its children
            tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
            sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
            label, // given a node d, returns the display name
            title, // given a node d, returns its hover text
            link, // given a node d, its link (if any)
            linkTarget = "_blank", // the target attribute for links (if any)
            width =800, // outer width, in pixels = 100
            height =800, // outer height, in pixels
            r = 20, // radius of nodes
            padding = 3, // horizontal padding for first and last column
            fill = "black", // fill for text nodes
            fillOpacity, // fill opacity for nodes
            stroke = "#555", // stroke for links
            strokeWidth = 1.5, // stroke width for links
            strokeOpacity = 0.4, // stroke opacity for links
            strokeLinejoin, // stroke line join for links
            strokeLinecap, // stroke line cap for links
            halo = "#fff", // color of label halo 
            haloWidth = 3, // padding around the labels
            curve = d3.curveStepAfter,//d3.curveStep curve for the link
          } = {}) {
          
            // If id and parentId options are specified, or the path option, use d3.stratify
            // to convert tabular data to a hierarchy; otherwise we assume that the data is
            // specified as an object {children} with nested objects (a.k.a. the “flare.json”
            // format), and use d3.hierarchy.
            
            const root = path != null ? d3.stratify().path(path)(data)
                : id != null || parentId != null ? d3.stratify().id(id).parentId(parentId)(data)
                : d3.hierarchy(data, children);
            // Sort the nodes.
            if (sort != null) root.sort(sort);
          
         
            // Compute labels and titles.
            const descendants = root.descendants()
            
            const L = label== null ? null : descendants.map(d => label(d.data, d));
            // Compute the layout.
            const dx = 90;//100
            const dy = -70; 
           
            tree().nodeSize([dx, dy])(root);
           
            // Edit links
            const treeLinks = root.links().filter(n=>{return(n.source.id > 0)})

            treeLinks.map((l) =>{
              //if(l.target.data.father_id != "" && l.target.data.mother_id != "" ){
                if(l.target.data.fId != "" && l.target.data.mId != "" ){
                let father = descendants.filter((d)=>{return d.id == l.target.data.fId }) //d.id == l.target.data.father_id
                let mother = descendants.filter((d)=>{return d.id ==  l.target.parent.id }) //l.target.data.mother_id
          
                father[0].depth = mother[0].depth
                father[0].height = mother[0].height
                   treeLinks.push({source:mother[0], target: father[0]})
                  
                  const parentsLink = treeLinks[treeLinks.length-1]
                 
                  if(Math.abs(parentsLink.source.x) >= dx){
                     l.target.x = l.target.x - parentsLink.source.x/2
                  }else{
                     l.target.x = l.target.x +  dx/2
                  }
           
              }
            })
           
           console.log("treelinks",treeLinks)
            // Center the tree.
            let x0 = Infinity;
            let x1 = -x0;
            root.each(d => {
              if (d.x > x1) x1 = d.x;
              if (d.x < x0) x0 = d.x;
            });
          
            // Compute the default height.
            if (height === undefined) height = x1 - x0 + dx *2;
          
            // Use the required curve
            if (typeof curve !== "function") throw new Error(`Unsupported curve`);
          
            //const svg = d3.create("svg")
            const svg = d3.select(svgRef.current);
            svg.selectAll('g').remove();        //-dy *-padding , (x0 - dx),width, height
                svg.classed("svgTree", true)                    //width posicion *0.6, height tamaño *0.7
                svg.attr("viewBox", [-dy *-padding,0 ,900,700])
                /*.attr("width", width)
                .attr("height", height)
                .attr("style", "max-width: 100%;height:auto; ")//height:auto;height: intrinsic; 
                .attr("font-family", "sans-serif")
                .attr("font-size", 9)*/
             
         svg.append("g")
              .classed("treeBody", true)
                .attr("stroke-linecap", strokeLinecap)
                .attr("stroke-linejoin", strokeLinejoin)
                .attr("stroke-width", strokeWidth)
              .selectAll("path")
              //.data(root.links())
              .data(treeLinks)
              .join("path")
              .attr("d", //d is data.source in x(d => ...) // for setting the parents up and the childrens down
                 d3.link(curve).x(d => d.parent == null ? -d.x : -d.x)
                      .y(d=> d.parent == null ? d.y: -d.y));
               
            
            const node = svg.append("g")
              .selectAll("a")
              .data(root.descendants())
              .join("a")
                .attr("xlink:href", link == null ? null : d => link(d.data, d))
                .attr("target", link == null ? null : linkTarget)
                .attr("target", "no_parent" == true ? null : linkTarget)
                .attr("transform",d => d.parent == null ? `translate(${-d.x},${-d.y})` : `translate(${-d.x},${-d.y})`)//d => `translate(${-d.x},${d.y})`);
          
                node.filter(function(d){return d.data.gender == "F"}).append("circle")
                    .classed("treeBody", true)
                    .attr("stroke",stroke)
                    .attr("r", r);
                
                     
                  const foWidth = 100;
            const anchor = {'w': width/8, 'h': height/4};
            const t = 50, k = 15;
            const tip = {'w': (3/4 * t), 'h': k};            
              node.filter(function(d){return d.data.gender == "M"}).append("rect")
                    .attr("x", -20) //d => d.x =-20
                    .attr("y", -20 ) //d => d.y = -20 )
                   .attr("width",35)
                   .attr("height",35)
                   .classed("treeBody", true)
                   //.attr("fill",fill)
                   .attr("stroke",stroke);
                  node.on("click", function(e){
                    
                      handleOptions(e,d3.select(this))
                   
                    });
                   
                 

                        const handleOptions = (e,data) =>{            
                            data.each(n => {
                               
                                const fo =  svg.append('foreignObject')
                                    .attr("x", -n.x-5) //0
                                    .attr("y", -n.y-15) //100
                                   .attr("width",foWidth)
                                   .classed("svg-tooltip", true);
                                      
                                const div = fo.append('xhtml:div')
                                    .append('div')
                                    .classed("tooltip", true);
                             
                                   
                                   
                              if (n.data.mId == 0){
                                div.append('button')
                                .attr("type","button")
                               .classed("tooltip_button", true)
                             
                                .html('Add parents')
                                .on("click",function(){clickHandler("ADD_PARENTS",n.id)})
                              }
                            
            
                                div.append('button')      
                                .attr("type","button")         
                                .classed("tooltip_button", true)
                                .html('Add children')
                                .on("click",function(){clickHandler("ADD_CHILDREN",n.id)})
                           
            
                                div.append('button')
                                .attr("type","button")
                                .classed("tooltip_button", true)
                                .html('Delete')
                                .on("click",function(){clickHandler("DELETE",n.id)})
                                //console.log(div)
                                const foHeight = div["_groups"][0][0].getBoundingClientRect().height;
                                fo.attr( "height", foHeight);                 
                                
                                })      
                               
                              
                              }

                       node.on('mouseleave', function() {
                        setTimeout(() => {svg.selectAll('foreignObject').remove()},1000)
                          
                       });
        
          
            if (title != null || title != "?" || title != "0") node.append("title")
                .text(d => title(d.data, d));
          
            if (L) node.append("text")
                .attr("dy", "0.32em")
                .attr("x", 28)//d => d.children ? -4 : -4)//d.parents ? -6 : 6)
                .attr("y",26)//d => d.children ? 15 : 15)
                .attr("text-anchor", "end")//d => d.data.gender ? "end" : "start")
                .attr("paint-order", "fill")
                .attr("fill", fill)
                .attr("stroke-width", haloWidth)
                .text((d, i) => L[i]);
            
            
            console.log("Final pedigree tree internal structure:",node)
            return svg.node();
          }
      return(

       Tree(table, {
        label: d => d.nodeId > 0  ? "Individual ID :"+ d.id : null,  //id
          title: (d,n) => {n.ancestors().reverse().map(d => d.id)},//.join("."), 
          link: (d,n) => {n.ancestors().reverse().map(d => d.nodeId)},
          //width: 1600
          
        })
        )
}
      
      
      
       
     return(
      
   
       <svg ref={svgRef} />

      
      )

    
}

//FamilyTreeComponent().contextType = Context;
