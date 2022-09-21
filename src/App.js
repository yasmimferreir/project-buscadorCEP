import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BiMap } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import api from "./services/App";
import "./styles.css";

function App() {
  //const para guardar valores do input
  const [input, setInput] = useState('')
  //const para renderizar na tela os valores do input 
  const [cep, setCep] = useState({});


  async function handleSearch() {

    if (input === '') {
      alert("Preencha algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    } catch {
      alert("Erro ao buscar CEP");
      setInput("")

    }
  }

  return (
    <div className="container">
      <div className="content">
        <div className="containerInput">
          <input type="text" placeholder="Buscar CEP..."
            value={input}
            onChange={(e) => setInput(e.target.value)}

          />
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={20} color="#000" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <BiMap size={28} />
            <h2> CEP: {cep.cep} </h2>
            <span>{cep.logradouro} </span>
            <span>Complemento: {cep.complemento} </span>
            <FaCity size={28} />
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf} </span>
          </main>
         )}

         </div>
    </div>
  );
}

export default App;
