import Nav from './componentes/header/Nav'
import Body from './componentes/body/Body'
import Contexto from "./componentes/context/Context"

function App() {
  return (
    <Contexto>
      <Nav/>
      <Body/>
    </Contexto>
  );
}

export default App;
