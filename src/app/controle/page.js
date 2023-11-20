"use client";
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';

class BancoDeDadosLocal {
  obterMedicamentos() {
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    return medicamentos;
  }

  salvarMedicamentos(medicamentos) {
    localStorage.setItem('medicamentos', JSON.stringify(medicamentos));
  }
}

const ControleMedicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const bancoDados = new BancoDeDadosLocal();

  useEffect(() => {
    const medicamentosSalvos = bancoDados.obterMedicamentos();
    setMedicamentos(medicamentosSalvos);
  }, [bancoDados]);

  const calcularTempoFalta = (hora) => {
    const agora = new Date();
    const horaAtualEmMinutos = agora.getHours() * 60 + agora.getMinutes();

    const [horaMedicamento, minutosMedicamento] = hora.split(':');
    const horaMedicamentoEmMinutos = parseInt(horaMedicamento) * 60 + parseInt(minutosMedicamento);

    if (horaAtualEmMinutos > horaMedicamentoEmMinutos) {
      return 0;
    }

    return horaMedicamentoEmMinutos - horaAtualEmMinutos;
  };

  const marcarComoTomado = (index) => {
    const novosMedicamentos = [...medicamentos];
    novosMedicamentos[index].tomado = true;
    setMedicamentos(novosMedicamentos);
    bancoDados.salvarMedicamentos(novosMedicamentos);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-yellow-500">Controle de Medicamentos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {medicamentos.map((medicamento, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              medicamento.tomado
                ? 'bg-green-300'
                : calcularTempoFalta(medicamento.hora) <= 0
                ? 'bg-red-500'
                : 'bg-green-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white">{medicamento.nome}</span>
              {medicamento.tomado ? (
                <span>Certo!</span>
              ) : (
                <button onClick={() => marcarComoTomado(index)} className="p-2 bg-white rounded-md text-green-500">
                  <CheckIcon />
                </button>
              )}
            </div>
            {!medicamento.tomado && (
              <span>
                {calcularTempoFalta(medicamento.hora) <= 0
                  ? 'Atrasado!'
                  : `${calcularTempoFalta(medicamento.hora)} minutos para o próximo horário`}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControleMedicamentos;
