"use client"
import AddCreative from "@/components/AddCreative";
import CreativeList from "@/components/CreativeList";
import Filter from "@/components/Filter";
import ProgressBar from "@/components/ProgressBar";
import { FilterContext } from "@/provider/FilterContextProvider";
import { CreativeProps } from "@/utility/Types";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Home() {

  const {filterValue} = useContext(FilterContext)

  const [colors, setColors] = useState([])
  const [creativesList, setCreativesList] = useState([])
  const [creativeModalStatus, setCreativeModalStatus] = useState(false);
  const [filterCreativesList, setFilterCreativesList] = useState([])
  

  useEffect(() => {
    handleFetchColors()
    return () => {};
  }, []);

const handleFetchColors = async()=>{
  try {
    let result = await fetch("https://random-flat-colors.vercel.app/api/random?count=5");
    let response = await result.json();

    setColors(response.colors || [])
   
  } catch (error: any) {
    console.log(error.message);
  }
}

  //creative object added to the creative state and modal will be closed
  const handleAddCreative = useCallback((creative: CreativeProps) => {
    setCreativesList(state => [creative, ...state]);
    setCreativeModalStatus(false);
  }, []);

  const handleOpenCreativeModal = () =>{
    if( 5 > creativesList.length && !creativeModalStatus) setCreativeModalStatus(true)
  }

  //close Creative modal
  const handleCloseCreativeModal = () =>{
    if(creativeModalStatus) setCreativeModalStatus(false)
  }


    //filter result function
    const handleFilterResult = (creativesFilter:any) => {
      setFilterCreativesList(creativesFilter)
    };
  
  
  
  return (
    
    colors.length !== 0 ? <main className="flex flex-row min-h-screen bg-white p-5">
      <div className="w-8/12">

<Filter creativeModalStatus={creativeModalStatus} creatives={creativesList} colors={colors} handleFilterResult={handleFilterResult} />

<ProgressBar creativesLength={creativesList.length} />
<button className={`${ 5 <= creativesList.length || creativeModalStatus ? "bg-blue-300": "bg-blue-500"} p-2 text-white rounded-sm`} onClick={handleOpenCreativeModal}>+ Add Creative</button>

<CreativeList creativesList={filterValue.backgroundColorValue != "" || filterValue.textValue != "" ? filterCreativesList: creativesList}/>
      </div>
     {creativeModalStatus ? <div className="w-4/12">
        <AddCreative handleCloseCreativeModal={handleCloseCreativeModal} handleAddCreative={handleAddCreative} colors={colors} />
      </div> : null} 

    </main> :null
    
  );
}
