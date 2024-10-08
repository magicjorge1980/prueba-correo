async function sendEmail(email) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}envio-mail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Éxito:', result);
        } else {
            console.error('Error:', result);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default sendEmail;
