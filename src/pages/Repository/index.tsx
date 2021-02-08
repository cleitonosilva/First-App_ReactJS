import React from 'react';
import { useRouteMatch} from 'react-router-dom'

// interface é a classe e se declara a classe com <> antes de executar a função
interface RepositoryParams{
  repository: string;
}
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return <h1>Repository:{params.repository}</h1>;
};

export default Repository;
