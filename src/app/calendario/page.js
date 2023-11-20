"use client"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


class BancoDeDadosLocal {
  salvarMedicamentos(medicamentos) {
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  }

  obterMedicamentos() {
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    return medicamentos;
  }
}

export default function Calendario({ params }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamentoNome, setMedicamentoNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adicionarMedicamentoAberto, setAdicionarMedicamentoAberto] = useState(false);
  const router = useRouter();
  const bancoDados = new BancoDeDadosLocal();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  
    async function carregarDados() {
      if (!params.calendario) router.push('/calendario');
  
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const medicamentosSalvos = bancoDados.obterMedicamentos();
  
        if (!medicamentosSalvos.length) {
          const exemploMedicamentos = [
            { nome: 'Medicamento A', quantidade: '1 comprimido', hora: '8:00 AM' },
            { nome: 'Medicamento B', quantidade: '2 comprimidos', hora: '12:00 PM' },
            { nome: 'Medicamento C', quantidade: '1 comprimido', hora: '6:00 PM' },
          ];
  
          setMedicamentos(exemploMedicamentos);
          bancoDados.salvarMedicamentos(exemploMedicamentos);
        } else {
          setMedicamentos(medicamentosSalvos);
        }
      } catch (err) {
        console.error(err, err.message);
        setError('Erro ao carregar dados');
      }
    }
  
    carregarDados();
  }, [params.calendario, router]);

  const abrirAdicionarMedicamento = () => {
    setAdicionarMedicamentoAberto(true);
  };

  const fecharAdicionarMedicamento = () => {
    setAdicionarMedicamentoAberto(false);
  };
  const handleLogout = () => {
    sessionStorage.removeItem('token');

    router.push('/login');
  };
  const adicionarMedicamento = () => {
    const novoMedicamento = { nome: medicamentoNome, quantidade, hora };
    const novosMedicamentos = [...medicamentos, novoMedicamento];
    setMedicamentos(novosMedicamentos);
    bancoDados.salvarMedicamentos(novosMedicamentos);
    setMedicamentoNome('');
    setQuantidade('');
    setHora('');
    fecharAdicionarMedicamento();

    if ('Notification' in window && Notification.permission === 'granted') {
      const user = JSON.parse(sessionStorage.getItem('user'));
  
      if (user && user.nome) {
        const notificacao = new Notification('Novo Medicamento Adicionado', {
          body: `Um novo medicamento foi adicionado para ${user.nome}.`,
        });
  
        notificacao.onclick = () => {
          console.log('Notificação clicada!');
        };
      }
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          adicionarMedicamento();
        }
      });
    }
    toast.success(`Um novo medicamento foi adicionado!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    
    if (user && user.nome && user.email) {
      const assunto = 'Novo Medicamento Adicionado';
      const corpo = `<p>Olá ${user.nome},</p>
                      <p>Um novo medicamento foi adicionado:</p>
                      <p>Nome: ${medicamentoNome}</p>
                      <p>Quantidade: ${quantidade}</p>
                      <p>Hora: ${hora}</p>`;
  
      try {
        enviarEmail(user.email, assunto, corpo);
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error.message);
      }
    } else {
      console.warn('Usuário não encontrado ou informações incompletas.');
    }
  };

  const excluirMedicamento = (index) => {
    const novosMedicamentos = [...medicamentos];
    novosMedicamentos.splice(index, 1);
    setMedicamentos(novosMedicamentos);
    bancoDados.salvarMedicamentos(novosMedicamentos);
  };

  return (
    <>
      <ToastContainer />
      <main>
        <div className="mt-4 p-4">
          <div className="flex justify-end mb-4">
            <button onClick={handleLogout} className='bg-red-500 rounded-md p-2 text-white font-bold'>
              <img src="/images/door.png" alt="" className="w-6 h-6 mr-2" />
              Logout
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <button onClick={abrirAdicionarMedicamento} className='bg-sky-950 rounded-md p-2 text-amber-400 font-bold'>
              Adicionar Medicamento
            </button>
          </div>
          
          <ul>
            {medicamentos.map((medicamento, index) => (
              <div key={index} className="border p-3 mb-2 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-black">Nome: {medicamento.nome}</p>
                  <p className="text-black">Quantidade: {medicamento.quantidade}</p>
                  <p className="text-black">Hora: {medicamento.hora}</p>
                </div>

                <button onClick={() => excluirMedicamento(index)} className='bg-red-500 rounded-md p-2 text-white font-bold'>
                  Excluir
                </button>
              </div>
            ))}
          </ul>

          <div className="flex justify-center mb-4">
      <button onClick={() => router.push('/controle')} className='bg-blue-500 rounded-md p-2 text-white font-bold'>
        Controle de Medicamentos
      </button>
    </div>
        </div>

        {adicionarMedicamentoAberto && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-black">Nome do Medicamento:</label>
              <input
                type="text"
                value={medicamentoNome}
                onChange={(e) => setMedicamentoNome(e.target.value)}
                className="border border-sky-700 rounded-md p-2 text-sky-900"
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-black">Quantidade:</label>
              <input
                type="text"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="border border-sky-700 rounded-md p-2 text-sky-900"
              />
            </div>
            <div className="flex flex-col gap-4 mb-4">
              <label className="text-black">Horário:</label>
              <input
                type="text"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="border border-sky-700 rounded-md p-2 text-sky-900"
              />
            </div>
            <div className="flex gap-4">
              <button onClick={adicionarMedicamento} className='bg-sky-950 rounded-md p-2 text-amber-400 font-bold'>
                Adicionar
              </button>
              <button onClick={fecharAdicionarMedicamento} className='bg-red-500 rounded-md p-2 text-white font-bold'>
                Fechar
              </button>
            </div>
          </div>
        )}
        </main>
        </>
  );
}     
