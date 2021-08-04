import React, { Fragment, useState,useRef,useContext} from 'react'; 
import styled from 'styled-components'
import img from "../img/img.jpg"
import imgdesktop from "../img/imgbig.png"
import {Context} from "../context/Context"
import { Button } from '@material-ui/core';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import ReplyIcon from '@material-ui/icons/Reply';
import TextField from '@material-ui/core/TextField';

const Body = styled.main` 
height: ${({triggerToggle}) => triggerToggle ? "30vh" : "91.5vh"}; 
display: flex;
justify-content: center;
align-items:center;
width: 100%;
padding: 0;   
background-image: url(${img});  
color: white; 
background-repeat: no-repeat;
background-position: right;

.contenedor{ 
padding: 0;
width: 70%;
height: 80%; 
justify-content: center;
align-items: center;
display: ${({triggerToggle}) => triggerToggle ? "none" : "flex"};
flex-direction: column; 
}

label,input{
margin: 5px;
font-size:15px;
color: white;
}

.contenedor_botones{
display: flex;
width: 100%;
justify-content: center; 
flex-wrap: wrap;
margin-top:22px;
}

button{
color: black;
margin: 10px; 
border: none;
box-shadow: 2px 3px 4px 0px black;
cursor: pointer; 
background: white;
text-align: center;
padding: 12px; 
height: 40px;
}
.btn_prs{  
margin-top:20px;
padding: 5px;
border: 1px solid white;
cursor: pointer;  
}
form{
display: flex;
flex-flow: column; 
justify-content: center;
margin-top:-40px;
}
.label_presupuesto{
font-size: 14px;
color: red;
font-weight: bold;
text-align: center;
}
.contenedor > label{
  margin-top: 15px;
}

@media (min-width:640px) {
  background-image: url(${imgdesktop})
}
`
/// JSX
const Main = () => { 
  const [total,setTotal] = useState(0)
  const [valor,setValor] = useState('0')
  const [multiplicando,setMultiplicando] = useState(false)
  const [productos,setProductos] = useState()
  const [producto,setProducto] = useState()
  const [entrada,setEntrada] = useState("")
  const exampleInput = useRef();  
  const {
        user,
        setUser,
        presupuesto,
        setPresupuesto,
        historial,
        setHistorial,
        triggerToggle,
        setPrimerPresupuesto,
        primerPresupuesto,
        unCuartoDePresupuesto
        } = useContext(Context)
  const [signo,setSigno] = useState("")
  const [lastValue,setLastValue] = useState(0)
  const inputRef = useRef()

 const scrollToInput = () => {
    inputRef.current.scrollIntoView()
 } 
  const clientPresupuesto = (x) =>  {
    x.preventDefault()
    let name =  x.target[0].value;
    if( name.length > 10  ){
      return alert("Ingrese un nombre mas corto") 
    }
    setUser({nombre: name,
    presupuesto:Number(x.target[1].value)})
    setPresupuesto(Number(x.target[1].value)) 
    setPrimerPresupuesto(Number(x.target[1].value))
  }
  
  const precio = (x) => {
    const inputTest = exampleInput.current.value;
    setEntrada(inputTest) 
    let strEx = x; 
    strEx = strEx.replace(",",".");
    let numFinal = parseFloat(strEx);
    setValor(numFinal)
  }

  const sumando = () => {
      if(valor == false ){
        return alert('Ingrese un precio correcto')
      }
      let resultado = valor + total; 
      setTotal(resultado)
      setValor("0")
      setEntrada("")
      setPresupuesto(presupuesto - valor) 
      setLastValue(valor)
      setHistorial([...historial,{
        id: historial.length,
        producto: `Precio del producto ${historial.length + 1} es $+${valor} tu presupuesto era de $${presupuesto} ahora es $${presupuesto - valor}`,
        removido:false
      }])
      setSigno("suma") 
  }

  const restar = () => {
      if(valor == false ){
        return alert('Ingrese un precio correcto')
        }
      let resultado =  total - valor; 
      setTotal(resultado)   
      setValor("0")  
      setEntrada("") 
      setPresupuesto(presupuesto + valor)
      setLastValue(valor)
      setHistorial([...historial,{
        id: historial.length,
        producto: ` Precio del producto ${historial.length + 1} es $-${valor} tu presupuesto era de $${presupuesto} ahora es $${presupuesto + valor}`,
        removido:false
      }])
      setSigno("resta") 
  }

  const multiplicar = () => { 
      if(productos == false || producto == false) {
        return alert('Ingrese valores correctos')
      } 
      let resultado = productos * producto
      
      setLastValue(resultado)
      setSigno("multi")
      setTotal( resultado + total )
      setValor("0") 
      setEntrada("")
      setMultiplicando(!multiplicando) 
      setPresupuesto(presupuesto - resultado)
      setHistorial([...historial,{
        id: historial.length,
        producto: ` Precio de los productos ${historial.length + 1} es $+${resultado} tu presupuesto era de $${presupuesto} ahora es $${presupuesto - resultado}`,
        removido:false
      }])
      setProducto("")
      setProductos("") 
  }
  const reiniciar = () => {
      setTotal(0)
      setEntrada("")
      setPresupuesto(primerPresupuesto)
      setHistorial([])
  }

  const valorPrevio = () => { 
    let sumaPositivo = lastValue + total;   /// si el signo es negativo
    let sumaNegativa =  total - lastValue;  /// si el signo es positivo
    let multiplicacion = total - lastValue;

    if(signo === "suma") {
      setTotal(sumaNegativa)
      setPresupuesto(presupuesto + lastValue)
      setSigno("")
      setHistorial([...historial,{
        id: historial.length - 1,
        producto: ` Removiste el Producto ${historial.length} tu actual presupuesto es de $${presupuesto + lastValue}`,
        removido:true
      }])
    }
    else if (signo === "resta") {
      setTotal(sumaPositivo)
      setPresupuesto(presupuesto - lastValue)
      setSigno("")
      setHistorial([...historial,{
        id: historial.length,
        producto: ` Removiste el Producto ${historial.length} tu actual presupuesto es de $${presupuesto - lastValue}`,
        removido:true
      }])
    }
    else if (signo === "multi") {
      setTotal(multiplicacion)
      setPresupuesto(presupuesto + lastValue)
      setHistorial([...historial,{
        id: historial.length,
        producto: ` Removiste el Producto ${historial.length} tu actual presupuesto es de $${presupuesto + lastValue}`,
        removido: true
      }])
      setSigno("")
    }
    return
  }
  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth"
    })
  }
  scrollToTop()
  return ( 
      <Fragment>
        <Body img={img} triggerToggle={triggerToggle} >
          {
          primerPresupuesto > 0 ?
          !multiplicando ? 
          <div className="contenedor">
            <TextField type="number" 
            label="Precio del producto" 
            inputRef={exampleInput} 
            required 
            value={entrada} 
            onChange={(x) =>  precio(x.target.value)}
            /> 
            <div  className="contenedor_botones" >
              <Button  onClick={() => sumando()}>  + </Button>
              <Button  onClick={() => restar()}>  - </Button> 
              <Button  onClick={() => setMultiplicando(!multiplicando)}>  x </Button>
              <Button  onClick={() => valorPrevio()} > <RestoreIcon/> </Button> 
              <Button  onClick={() => reiniciar()} > <RemoveShoppingCartIcon/> </Button> 
            </div> 
            <label > Total: ${total.toFixed(2)} </label>
            {presupuesto <= unCuartoDePresupuesto  ? <label className="label_presupuesto">{`${user.nombre || "Jonathan"}, tu presupuesto esta casi al limite`}</label> : null}
          </div>
          :
          <div className="contenedor">
              <TextField label="Precio de Producto" type="number" value={ producto || "" } onChange={(x) => setProducto(Number(x.target.value))}/> 
              <TextField label="Cantidad de Productos" type="number" value={ productos || "" } onChange={(x) => setProductos(Number(x.target.value))}/> 
              <Button className="btn_prs" onClick={() => multiplicar()}> x </Button>
              <Button className="btn_prs" onClick={() => setMultiplicando(false)}> <ReplyIcon/> </Button> 
          </div>
          : 
          <div className="contenedor">
            <form  onSubmit={(e) => clientPresupuesto(e)}  ref={inputRef}   > 
              <TextField   type="text"  label="Usuario (Opcional)" name='inputName' onClick={() => scrollToInput() }/>
              <TextField  type="number" label="Ingrese su Presupuesto" name='inputoPresupuesto'  onClick={() => scrollToInput() }  required/> 
              <Button  type="submit" className="btn_prs" >
                Listo
              </Button>
            </form>
          </div>
          }
        </Body>
      </Fragment>
  );
} 
export default Main;