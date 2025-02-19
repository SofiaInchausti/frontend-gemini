import GeminiResponse from '../types';

const sendRequest = async (
  datos: object,
  url = 'https://backend-gemini-1.onrender.com/gemini',
): Promise<GeminiResponse> => {
  const respuesta = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    throw new Error('Error en la solicitud: ' + respuesta.statusText);
  }

  const data: GeminiResponse = await respuesta.json();

  if (typeof data === 'string') {
    throw new Error('Unexpected string response from API');
  }

  return data;
};

export default sendRequest;
