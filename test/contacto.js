document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const webhookURL = 'https://discord.com/api/webhooks/1252995824510832651/r49Z40AS4aJQZIi7kgNKwGHl_EqnP27YFWFHDwlAxJzNDECvzxbkdp8Tjb_NSfKXXONO';
        const cooldownTime = 2 * 60 * 1000;
        const lastSubmission = localStorage.getItem('lastSubmissionTime');
        const now = new Date().getTime();

        if (lastSubmission && now - lastSubmission < cooldownTime) {
            alert('Por favor, espera 2 minutos antes de enviar otro mensaje.');
            return;
        }

        const formData = new FormData(form);
        const data = {
            username: formData.get('name'),
            embeds: [{
                title: formData.get('subject'),
                fields: [
                    { name: 'Nombre', value: formData.get('name'), inline: true },
                    { name: 'Apellidos', value: formData.get('lastname'), inline: true },
                    { name: 'Correo Electrónico', value: formData.get('email'), inline: true },
                    { name: 'Mensaje', value: formData.get('message') }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        try {
            const response = await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Mensaje enviado con éxito!');
                form.reset();
                localStorage.setItem('lastSubmissionTime', now);
            } else {
                alert('Error al enviar el mensaje. Inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
        }
    });
});
