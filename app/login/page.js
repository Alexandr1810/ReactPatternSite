'use client'
import React, {useState, useEffect} from 'react'
import { server_config } from '@/app/utils/server_config.js'
import { useRouter } from 'next/navigation';

import { api } from '@/app/utils/api.js';

function LoginPage() {
  const [login, setLogin] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [hasError, setHasError] = useState(false);
  const router = useRouter();


  const sendLogin = async () => {
    console.log('Sending login:', login);
    const res = await api('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ login, site_key: server_config.site_key })
    });
    if (res && res.ok){
      setStep(2);
      setHasError(false); 
    } else {
      setHasError(true);
    }
  };

  const sendCode = async () => {
    const res = await api('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ login, code, site_key: server_config.site_key })
    });
    if (res && res.ok) {
      router.push('/admin'); 
      console.log('toAdmin')
    } else {
      setHasError(true);
    }
  };

  return (
    <div className='loginPage main'>
    
        <form className='loginForm' onSubmit={e => {
          e.preventDefault();
          if (step === 1) sendLogin();
          else sendCode();
        }}>
          <h2>Вход в Панель управления</h2>
          <label htmlFor='login'>Логин:</label>
          <input value={login} placeholder='Введите логин' onChange={e => setLogin(e.target.value)} />
          {step === 1 && <button type='submit'>Запросить код</button>}
          {step === 2 && <label htmlFor='code'>Ваш код:</label>}
          {step === 2 && <input value={code} placeholder='Введите код' onChange={e => setCode(e.target.value)} />}
          {step === 2 && <button type='submit'>Войти</button>}
          {hasError && <p className='errorFormAlert'>Неверный логин или одноразовый код</p>}
        </form>

    </div>
  );
}


export default LoginPage;
