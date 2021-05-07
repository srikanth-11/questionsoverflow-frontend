import React,{useState,createContext} from "react"

export const countContext = createContext();

export const CountProvider = props =>{
 
 let [count,setCount] = useState(0)
 return (
  <countContext.Provider value ={[count,setCount]}>
   {props.children}
  </countContext.Provider>
 )
}
export default CountProvider;