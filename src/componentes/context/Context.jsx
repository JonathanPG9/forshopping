import React,{useState} from 'react';


export const Context = React.createContext()


const Contexto = (props) => {
  const [user,setUser] = useState({})
  const [presupuesto,setPresupuesto] = useState()
  const [historial,setHistorial] = useState([])
  const [triggerToggle,setTriggerToggle] = useState(false)
  const [primerPresupuesto,setPrimerPresupuesto] = useState(0)
  let mitadPresupuesto = primerPresupuesto / 2;
  let unCuartoDePresupuesto = mitadPresupuesto / 2;
  let contexto = {
    user : user,
    setUser : setUser,
    presupuesto : presupuesto,
    setPresupuesto : setPresupuesto,
    historial : historial,
    setHistorial : setHistorial,
    triggerToggle : triggerToggle,
    setTriggerToggle : setTriggerToggle,
    setPrimerPresupuesto : setPrimerPresupuesto,
    primerPresupuesto : primerPresupuesto,
    mitadPresupuesto : mitadPresupuesto,
    unCuartoDePresupuesto : unCuartoDePresupuesto
  }
  return (
    <Context.Provider  value={contexto}>
      {props.children}
    </Context.Provider>
  );
}

export default Contexto;