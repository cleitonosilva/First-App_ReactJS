import React, {useEffect} from 'react';
import { useRouteMatch} from 'react-router-dom'
import api from "../../services/api";

import logoimg from "../../assets/logo.svg";
import {Link} from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


import { Header, RepositoryInfo, Issues } from "./styles";




// interface é a classe e se declara a classe com <> antes de executar a função
interface RepositoryParams{
  repository: string;
}
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      console.log(response.data)
    });
    api.get(`repos/${params.repository}/issues`).then(response => {
    console.log(response.data)
  });
}


// exemplo de chama assincrona porem chamando as 2 juntas
//   async function loadData(): Promise<void> {
//      const [repository, issues] = await Promise.all([
//       api.get(`repos/${params.repository}`),
//       api.get(`repos/${params.repository}/issues`),
//      ]);

//      console.log(repository, issues)
//   }

//   loadData();
// }
,[params.repository]);

  return(
      <>
    <Header>
      <img src={logoimg} alt="GitHub Explorer"/>
      <Link to="/"> <FiChevronLeft size={16}/>Voltar</Link>
    </Header>

    <RepositoryInfo>
      <header>
        <img src="https://avatars.githubusercontent.com/u/66958728?s=400&u=de3b173ec4b5be1d5a7f23f865b0170f47c784cb&v=4" alt=""/>
      <div>
        <strong>Repositorio de Cleiton</strong>
        <p> descrição do repositório</p>
      </div>
      </header>
      <ul>
        <li>
        <strong>1808</strong>
        <span>Stars</span>
        </li>

        <li>
        <strong>48</strong>
        <span>Forks</span>
        </li>


        <li>
        <strong>67</strong>
        <span>Issues</span>
        </li>

      </ul>
    </RepositoryInfo>

    <Issues>
        <Link to={`/`}>

          <div>
            <strong>hatshha s</strong>
            <p> jajuhsuha </p>
          </div>
          <FiChevronRight size={20} />
        </Link>



    </Issues>

     </>
  )

};

export default Repository;
