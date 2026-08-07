import React from 'react'
import Main from './components/Main'
function App(){
 //const [starWar, setStarWar] = React.useState(null)
  //const [count, setCount] = React.useState(1)
   
  //console.log('great')

 /* React.useEffect(function(){
    fetch(`https://swapi.dev/api/people/${count}`)
    .then(load => load.json())
    .then(data => setStarWar(data))
  },[count])*/
  return(
    <>
      <Main/>
    {/*<div>
      <button onClick={()=> setCount(prevCount => prevCount + 1)}>Get next data</button>
      <pre>{JSON.stringify(starWar,null,2)}</pre>
    </div>*/}
    </>
  )
}
export default App