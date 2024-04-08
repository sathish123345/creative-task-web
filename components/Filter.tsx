import { FilterContext } from '@/provider/FilterContextProvider'
import { CreativeProps } from '@/utility/Types';
import React, { useCallback, useContext, useState } from 'react'


interface FilterProps {

    colors:Array<string>;
    creatives:Array<CreativeProps>;
    handleFilterResult(creatives:CreativeProps):void;
    creativeModalStatus:boolean;
}

function Filter(props:FilterProps) {
    const {filterValue, setFilterValue} = useContext(FilterContext)
    
    const handleColor = (color:string)=>{

        if(props.creativeModalStatus) return
            var filterColor
            if(filterValue.textValue !== ""){
                if(props.creatives === undefined) return
                filterColor = props.creatives.filter((creative:any)=>{
                    const matchesColor = creative.backgroundColor === color;
            
                    // Check if the creative's title or subtitle includes the search text
                    const matchesText = creative.title.includes(filterValue.textValue) || creative.subtitle.includes(filterValue.textValue);
            
                    // Return true if both conditions are met
                    if(matchesColor && matchesText) return creative
                      
                    })
            }else{
                if(props.creatives === undefined) return
                filterColor = props.creatives.filter((creative:any)=>{
                    if(creative.backgroundColor === color){
                        return creative
                    }
                    })
            }
            setFilterValue((state:any)=>({...state, backgroundColorValue:color}))
           props.handleFilterResult(filterColor)
            
        }
    

    const handleSearch = (text:string)=>{
        var filterTextResult

        if(filterValue.backgroundColorValue !== ""){ 
            if(props.creatives === undefined) return
            filterTextResult = props.creatives.filter((creative:any)=>{
                const matchesColor = creative.backgroundColor === filterValue.backgroundColorValue;
                // Check if the creative's title or subtitle includes the search text
                const matchesText = creative.title.includes(text) || creative.subtitle.includes(text);
                // Return true if both conditions are met
                if(matchesColor && matchesText) return creative
            })
        }else{
            if(props.creatives === undefined) return
            filterTextResult = props.creatives.filter((creative:any)=>{
                if(creative.title.includes(text) || creative.subtitle.includes(text)){
                    return creative
                }
            })
        }
       setFilterValue((state:any)=>({...state, textValue:text}))
       props.handleFilterResult(filterTextResult)
        
    }

    
  return (
    <div>


<h2 className="text-2xl font-medium">Filter By</h2>

<div className='flex flex-row items-center'>
    <div>
    <p>colors</p>
    <div className='flex flex-row my-2'>
    {props.colors !== undefined && props.colors.map((color:string)=>(
                <div
                onClick={() => handleColor(color)}
                className={`h-9 w-9 rounded-full flex flex-row items-center justify-center mr-3 `}
                style={{ backgroundColor: filterValue.backgroundColorValue == color ? "black" : "white" }}
              >
                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: color}}></div>
              </div>
    ))}
</div> 
    </div>
   
<div className='m-2'>
    <p>title / subtitle</p>
    <input
        value={filterValue.textValue}
        disabled={props.creativeModalStatus}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded"
        placeholder="Search"
      />
</div>
</div>
    </div>
  )
}

export default Filter