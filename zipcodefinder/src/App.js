import {useState} from'react'
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './Services/Api'
import apiPexels from './Services/ApiPexels';
import cathState from './Functions/fullBrazilianStateNames';
import changeConainerBg from './Functions/changeContainerBg';

function App() {

  const [input,setInput]= useState('');
  const [cep,setCep]= useState({});
  const [urlPhoto,setUrl]=useState('');

  async function handleSearch(){
    if(input===''){
      return;
    }
    try{

      const response=await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
      const responseFromPexels= await apiPexels.get(`${cathState(response.data.uf)}&per_page=1/json`);
      setUrl(responseFromPexels.data.photos[0].src.original)

    }catch(error){
      console.log(error.message);
      setInput('');
    }
  }

  return (
    <div className="container" style={{backgroundImage:changeConainerBg(urlPhoto), backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#ffff'/>
        </button>

      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>Complemento: {cep.complemento}</span>

          <span>{cep.logradouro}</span>

          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )} 

      </div>
  );
}

export default App;