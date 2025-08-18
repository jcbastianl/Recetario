import apiClient from './apiClient';

export async function getDatosHome()
{
  try {
    const response = await apiClient.get('/recetas-home');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos del home:', error);
    return [];
  }
}
