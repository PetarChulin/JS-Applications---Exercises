function attachEvents() {
    
    let inputs = [...document.querySelectorAll('input')];    
    let inputName = inputs[0];
    let inputMessage = inputs[1];
    document.getElementById('submit').addEventListener('click' , onSend);
    document.getElementById('refresh').addEventListener('click' , onRefresh);
    
    async function onSend() {
       
        const data = {
            author: inputName.value,
            content: inputMessage.value
        }        
        await fetch('http://localhost:3030/jsonstore/messenger' , {
            method: 'post',           
            body: JSON.stringify(data)
        });
        inputName.value = '';
        inputMessage.value = '';

    }
    async function onRefresh() {

        const res = await fetch('http://localhost:3030/jsonstore/messenger');
        const forView = await res.json();

        let result = [];
        for (const message of Object.values(forView)) {
            result.push(`${message.author}: ${message.content}`)
        }
        document.getElementById('messages').textContent = result.join('\n');

    }
}

attachEvents();