async function updateEmail(email, card) {
    try {
        const response = await fetch('http://localhost:3000/select-card', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                card: card
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

export default updateEmail;
