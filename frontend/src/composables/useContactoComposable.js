export function useContactoComposable()
{

    let sendData = async (body) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}contacto`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                alert('Tu mensaje se envió exitosamente. Pronto nos pondremos en contacto contigo.');
                location.reload();
            } else {
                alert('Error al enviar el mensaje. Inténtalo nuevamente.');
            }
        } catch (err) {
            console.error(err);
            alert('Error de envío. Verifica tu conexión y vuelve a intentarlo.');
        }
    };

    return{
        sendData
    };

}
