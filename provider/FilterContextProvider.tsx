import React, { createContext, useState } from 'react'

export const FilterContext = createContext({filterValue:{backgroundColorValue:"",textValue:""}, setFilterValue:()=>{}})

const FilterContextProvider = ({children}:any) => {
    const [filterValue, setFilterValue] = useState({backgroundColorValue:"",textValue:""})
  return (
    <FilterContext.Provider value={{filterValue,setFilterValue}}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider