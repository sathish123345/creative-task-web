  "use client"
import FilterContextProvider from "@/provider/FilterContextProvider";
import Dashboard from './dashboard/page'

export default function Home() {

  return (
    <FilterContextProvider>
   <Dashboard/>
    </FilterContextProvider>
  );
}
