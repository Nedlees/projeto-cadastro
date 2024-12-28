import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash-svgrepo-com.svg";
import api from "../../services/api";

// react hooks - useRef

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post("/usuarios", {
      email: inputEmail.current.value,
      name: inputName.current.value,
      age: inputAge.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers()
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input name="nome" placeholder="Nome" type="text" ref={inputName} />
        <input name="idade" placeholder="Idade" type="number" ref={inputAge} />
        <input name="email" placeholder="Email" type="email" ref={inputEmail} />
        <button onClick={createUsers} type="button">
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div className="card" key={user.id}>
          <div>
            <p>
              Nome: <span> {user.name} </span>
            </p>
            <p>
              Idade: <span> {user.age} </span>
            </p>
            <p>
              Email: <span> {user.email} </span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
