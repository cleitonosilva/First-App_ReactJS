import React, {useEffect, useState} from 'react';
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


interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue{
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string
  };
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Repository: React.FC = () => {

  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data)
    });
    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data)
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

    {repository ?(
      <RepositoryInfo>
      <header>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
      <div>
        <strong>{repository.full_name}</strong>
        <p> {repository.description}</p>
      </div>
      </header>
      <ul>
        <li>
        <strong>{repository.stargazers_count}</strong>
        <span>Stars</span>
        </li>

        <li>
        <strong>{repository.forks_count}</strong>
        <span>Forks</span>
        </li>


        <li>
        <strong>{repository.open_issues_count}</strong>
        <span>Issues</span>
        </li>

      </ul>
    </RepositoryInfo>
    ): (<p>Carregando...</p>) }


    <Issues>
        {issues.map(res => (

        <a key={res.id} href={res.html_url}>

        <div>
          <strong>{res.title}</strong>
          <p> {res.user.login} </p>
        </div>
        <FiChevronRight size={20} />
        </a>


        ) )}



    </Issues>

     </>
  )

};

export default Repository;
