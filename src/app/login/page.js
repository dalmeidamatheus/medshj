"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Login() {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      router.push('/calendario');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Obter as informações do localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.cpf === values.cpf &&
      storedUser.senha === values.senha
    ) {
      // Simular autenticação bem-sucedida
      sessionStorage.setItem('token', 'dummyToken');
      router.push('/calendario');
    } else {
      setError('Credenciais inválidas');
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-14">
      <div className="">
        <img
          src="/images/mulher-idosa-tendo-dela-medicinas.png"
          alt=""
          className="object-cover"
          style={{ width: '500px', height: '560px', borderRadius: '10px' }}
        />
      </div>
      <div className='text-center'>
        <h1 className="text-2xl font-bold" style={{ color: '#FFD700' }}>login</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              name='cpf'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='text'
              placeholder='cpf'
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              value={values.cpf}
              onChange={e => setValues({ ...values, cpf: e.target.value })}
            />
            <input
              name='senha'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='password'
              placeholder='senha'
              value={values.senha}
              onChange={e => setValues({ ...values, senha: e.target.value })}
            />
            <button className='bg-cyan rounded-md p-2 text-amber-400 font-bold' type='submit'>
              {loading ? 'carregando...' : 'entrar'}
            </button>
            <a className='text-sky-950 text-sm' href='/registrar'>criar conta</a>
            {error && <p className='text-red-500'>{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}