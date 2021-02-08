import React, { useState, FormEvent, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import logoimg from "../../assets/logo.svg";
import { Title, Form, Repositorys, Error } from "./styles";
import api from "../../services/api";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("")

  // interface são as classes de tipagem do ts e toda vez que utiliza useState deve ser passado o tipo que é a variavel, no caso abaixo éuma array de repository que inicia vazia
  const [repositories, setrepositories] = useState<Repository[]>(()=> {
    const storagedRepositories = localStorage.getItem('@githubExplorer:repositories');
    if(storagedRepositories){
      // utilizando JSON.parse para retornar o valor como arry
      return JSON.parse(storagedRepositories);
    }else{
      return [];
    }
  });

  useEffect(()=> {
      // utilizando JSON.stringfy para fazer o casting para string

    localStorage.setItem('@githubExplorer:repositories', JSON.stringify(repositories));
  });

  async function handleAddRepositories(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    // adição do repositorio & o (event: FormEvent<HTMLFormElement>) não deixa a tela dar, cuidado com a importação do FormEvent ele sempre espera um <HTMLFormElement>
    // após deixar o event.preventDefault() como primeiro parametro da função
    event.preventDefault();

    if(!newRepo){
      setInputError('Digite o autor/nome do repositório');
      return ;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;
      setrepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('')
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    };
  };

  return (
    <>
      <img src={logoimg} alt="GitHub Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepositories}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(x) => setNewRepo(x.target.value)}
        ></input>
        <button type="submit">Pesquisar</button>
      </Form>


      { inputError && <Error>{inputError}</Error>}

      <Repositorys>
        {repositories.map(x => (
        <a key={x.full_name} href="teste">
          <img
            src={x.owner.avatar_url}
            alt={x.owner.login}
          />
          <div>
            <strong>{x.full_name}</strong>
            <p>{x.description}</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      ))}
      </Repositorys>

    </>
  );
};

export default Dashboard;
