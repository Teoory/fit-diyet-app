import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../Hooks/UserContext';

const LoginPage = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ redirect, setRedirect ] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:3030/login', {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      credentials: 'include',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('Hatalı kullanıcı adı veya şifre!');
    }
  }

  if (redirect) {
    return <Navigate to="/" />
  }
  
  return (
    <div className="loginArea">
      <form onSubmit={login}>
        <h1>Giriş Yap</h1>
        <input  type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                required
                onChange={ev => setUsername(ev.target.value)} />
        <input  type='password'
                placeholder='Şifre'
                value={password}
                required
                onChange={ev => setPassword(ev.target.value)} />
        <button>Giriş</button>
        <div className="newAccount">
          Hesabın yok mu? 
          <Link to="/register">Kayıt Ol</Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage