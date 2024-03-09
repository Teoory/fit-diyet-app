import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

const RegisterPage = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ passwordValidiated, setPasswordValidiated ] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
  });
  const [ email, setEmail ] = useState('');
  const [ redirect, setRedirect ] = useState(false);

  async function register(ev) {
    ev.preventDefault();
    if (password !== passwordConfirm) {
      alert('Şifreler uyuşmuyor!');
      return;
    }
    if (!passwordValidiated.minLength || !passwordValidiated.hasUppercase || !passwordValidiated.hasLowercase || !passwordValidiated.hasNumber) {
      alert('Şifre kriterleri sağlanmıyor!');
      return;
    }
    const response = await fetch('http://localhost:3030/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.');
      setRedirect(true);
    } else {
      alert('Kayıt olurken hata oluştu!');
    }
  };

  const validatePassword = (value) => {
    const validiations = {
      minLength: value.length >= 8, // min 8 karakter olmalı
      hasUppercase: /[A-Z]/.test(value), // en az 1 büyük harf olmalı
      hasLowercase: /[a-z]/.test(value), // en az 1 küçük harf olmalı
      hasNumber: /\d/.test(value), // en az 1 sayı olmalı
    };
    setPasswordValidiated(validiations);
  }

  const handlePassword = (ev) => {
    const value = ev.target.value;
    setPassword(value);
    validatePassword(value);
  }

  if (redirect) {
    return <Navigate to='/login' />
  }
  
  return (
    <div className="loginArea">
      <form onSubmit={register}>
        <h1>Kayıt Ol</h1>
        <input  type="email"
                placeholder="Email"
                value={email}
                required
                onChange={ev => setEmail(ev.target.value)} />
        <input  type='text'
                placeholder='Kullanıcı Adı'
                value={username}
                minLength={5}
                maxLength={16}
                required
                onChange={ev => setUsername(ev.target.value)} />
        <input  type='password'
                placeholder='Şifre'
                value={password}
                required
                autoComplete='off'
                onChange={handlePassword} />
                {password !== '' && 
                  <ul className='passwordValidiations'>
                    {!passwordValidiated.minLength && <li>En az 8 karakter olmalı</li>}
                    {!passwordValidiated.hasUppercase && <li>Bir büyük harf içermeli</li>}
                    {!passwordValidiated.hasLowercase && <li>Bir küçük harf içermeli</li>}
                    {!passwordValidiated.hasNumber && <li>Bir sayı içermeli</li>}
                  </ul>
                }
        <input  type='password'
                placeholder='Şifre Tekrar'
                value={passwordConfirm}
                required
                autoComplete='off'
                onChange={ev => setPasswordConfirm(ev.target.value)} />
                {password !== '' && password !== passwordConfirm &&
                  <div className="password-validations">Sifreler Eşleşmiyor!</div>
                }
        <button>Kayıt Ol</button>
        <div className="newAcoount">
          Zaten hesabın var mı?
          <Link to="/login">Giriş Yap</Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage