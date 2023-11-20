"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Registro() {
  const router = useRouter();

  const [values, setValues] = useState({
    nome: '',
    cpf: '',
    senha: '',
    idade: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      nome: values.nome,
      cpf: values.cpf,
      email: values.email,
      idade: values.idade
    };
    localStorage.setItem('user', JSON.stringify(values));

    router.push('/login');
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="/images/mulher-jovem-cuidando-de-seu-avo-idoso-com-um-quadro-de-resfriado-em-casa_144962-14614.png"
          alt=""
          className="object-cover rounded"
          style={{ width: '900px', height: '400px', borderRadius: '10px' }}
        />
      </div>

      <main className="flex flex-col items-center justify-between px-24 py-8">
        <div className='text-center'>
          <h1 className='text-sky-950 font-bold text-2xl' style={{ color: '#FFD700' }}>registrar</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              name='nome'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='text'
              placeholder='nome'
              autoFocus
              value={values.nome}
              onChange={handleChange}
            />
            <input
              name='cpf'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='text'
              placeholder='cpf'
              autoFocus
              value={values.cpf}
              onChange={handleChange}
            />
            <input
              name='email'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='text'
              placeholder='email'
              autoFocus
              value={values.email}
              onChange={handleChange}
            />
            <input
              name='idade'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='text'
              placeholder='idade'
              autoFocus
              value={values.idade}
              onChange={handleChange}
            />
            <input
              name='senha'
              className='border border-sky-700 rounded-md p-2 text-sky-900'
              type='password'
              placeholder='senha'
              value={values.senha}
              onChange={handleChange}
            />
            <button className="bg-cyan-900 rounded-md p-2 text-amber-400 font-bold px-8" type='submit'>
              criar conta
            </button>
            <a className='text-sky-950 text-sm' href='/login'>
              fazer login
            </a>
          </div>
        </form>
      </main>
    </>
  );
}
