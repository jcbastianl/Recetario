import apiClient from '@/services/apiClient';

export function useContactoComposable()
{

    let sendData = async (body) => {
        try {
            const response = await apiClient.post('/contacto/', body);
            alert('Tu mensaje se envió exitosamente. Pronto nos pondremos en contacto contigo.');
            location.reload();
        } catch (err) {
            console.error(err);
            alert('Error al enviar el mensaje. Inténtalo nuevamente.');
        }
    };

    return{
        sendData
    };

}
