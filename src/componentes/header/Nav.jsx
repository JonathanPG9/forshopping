import React, { Fragment, useContext } from 'react';
import { Context } from "../context/Context"
import styled from 'styled-components'
import img from "../img/imgHistorial.png"

const Header = styled.header`
display: flex;
width: 100%;
height:10vh;
position: relative;
justify-content: center;
align-items: center;
font-family: 'Courier New', Courier, monospace;
border-bottom: 2px solid black;
cursor: pointer;

::before{
content: "";
position: absolute; 
left: 0;
width: 120px;
height: 10vh;
border-right: 0.25px solid black;
border-left: 0.25px solid black;
}
::after{
content: attr(aria-label);
position: absolute;
left:0;
width: 120px;
text-align: center;
cursor: pointer;
} 
`

const Navegacion = styled.nav`
height: 100%;
width: calc(100% - 120px);
justify-content: center;
position: relative;
align-items: center;
display: flex; 
font-family: 'Courier New', Courier, monospace;
margin-left: 100px;

ul{
display: flex;
flex-flow: column;
align-content: center;
justify-content: center;
padding: 0; 
text-align: center;
}
ul li{
text-decoration: none;
list-style: none;
cursor: pointer;
font-size:15px;  
font-weight: bold;
line-height: 1.55;
}
ul li:nth-child(2) {
color: ${({ presupuesto, mitadPresupuesto, unCuartoDePresupuesto }) => 
          presupuesto <= unCuartoDePresupuesto 
          ? `red` 
          : presupuesto <= mitadPresupuesto 
          ? "purple" 
          : "green"
          };
margin-bottom: 1px;
}
`

const Toggle = styled.nav`
width: ${({triggerToggle}) =>  triggerToggle ? "calc(100% + 120px)" : "0px" };
background-color: red;
display: flex;
justify-content: flex-start;
position: fixed;
align-items: center;
background-position: center;
flex-direction: column;
height: 91vh;
top: 9.5vh;
list-style: none;
background-image: url(${img});

ul{
  list-style: none;
  padding: 0;
  text-align: center;
  width: 75%;
  color: white; 
  overflow-y: scroll;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
}

li{
  margin: 13px 13px 5px 13px;
}
`

const Nav = () => {
  const { 
          user,
          presupuesto, 
          historial, 
          triggerToggle, 
          setTriggerToggle,
          mitadPresupuesto,
          unCuartoDePresupuesto
        } = useContext(Context)
  return (
    <Fragment>
      <Header aria-label={user.nombre ? user.nombre : "Jonathan"} onClick={() => setTriggerToggle(!triggerToggle)}>
        <Toggle triggerToggle={triggerToggle} >
          <ul>
            {historial.map(x => {
              return <li key={x.id}>
                        {
                        x.producto
                        }
                    </li>
            })}
          </ul>
        </Toggle> 
      <Navegacion presupuesto={presupuesto} mitadPresupuesto={mitadPresupuesto} unCuartoDePresupuesto={unCuartoDePresupuesto}>
        <ul>
          {presupuesto && <li>Presupuesto</li>}
          {presupuesto && <li>${presupuesto.toFixed(2)}</li>}
        </ul>
      </Navegacion>
      </Header>
    </Fragment>
  );
}

export default Nav;