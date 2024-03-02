import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';

const query = gql`
  query GetTodo {
    getTodo {
      id
      title
      completed
      user {
        id
        name
      }
    }
  }
`

function App() {

  const { loading, data } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {
            data.getTodo.map((todo) =>
              <tr>
                <td>{todo?.title}</td>
                <td>{todo?.user?.name}</td>
              </tr>)
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
