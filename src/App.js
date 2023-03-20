import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [hoursWorked, setHoursWorked] = useState(0);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    const fetchHoursWorked = async () => {
      const response = await axios.get('/api/hours-worked');
      setHoursWorked(response.data.hoursWorked);
    };

    fetchHoursWorked();
  }, []);

  const handleStartWork = async () => {
    await axios.post('/api/start-work');
    setIsWorking(true);
  };

  const handleEndWork = async () => {
    await axios.post('/api/end-work');
    setIsWorking(false);
  };

  return (
    <div>
      <h1>Controle de Ponto</h1>
      <p>Horas trabalhadas hoje: {hoursWorked}</p>
      {isWorking ? (
        <button onClick={handleEndWork}>Finalizar turno</button>
      ) : (
        <button onClick={handleStartWork}>Iniciar turno</button>
      )}
    </div>
  );
};

export default App;
