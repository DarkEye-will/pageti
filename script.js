let spamInterval;
const spamSpeed = 100;

function openSpammer() {
    let formContainer = document.querySelector('.form-container');

    if (formContainer.style.display === 'block') {
        closeForm();
        return;
    }

    formContainer.style.display = 'block';
}

function closeForm() {
    let formContainer = document.querySelector('.form-container');
    formContainer.style.display = 'none';
    clearInterval(spamInterval);
}

function startSpam() {
    let webhookUrl = document.getElementById('webhookUrl').value.trim();
    let message = document.getElementById('message').value.trim();
    let button = document.querySelector('.form-container button');

    if (webhookUrl && message) {
        spamInterval = setInterval(async () => {
            await sendMessage(webhookUrl, message);
        }, spamSpeed);
        button.textContent = 'Stop';
        button.setAttribute('onclick', 'stopSpam()');
    }
}

function stopSpam() {
    clearInterval(spamInterval);
    let button = document.querySelector('.form-container button');
    button.textContent = 'Flood!!';
    button.setAttribute('onclick', 'startSpam()');
}

async function sendMessage(webhookUrl, message) {
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: message })
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}
