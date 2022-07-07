function attachEvents() {

    let phonebook = document.getElementById('phonebook');
    let person = document.getElementById('person');
    let phone = document.getElementById('phone');    

    document.getElementById('btnLoad').addEventListener('click', async () => {
        
        phonebook.replaceChildren();
        let res = await fetch('http://localhost:3030/jsonstore/phonebook');
        let data = await res.json();
        let records = Object.values(data);
        records.forEach(data => {
            createLi(data)
        });
    });
    document.getElementById('btnCreate').addEventListener('click', async () => {

        let newRecord = {
            person: person.value,
            phone: phone.value
        }

        let res = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
        });

        let data = await res.json();
        createLi(data);

        person.value = '';
        phone.value = '';
    });

    function createLi(data) {
        let li = document.createElement('li');
        let delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.classList = 'button';
        delBtn.addEventListener('click', (e) => {
            e.target.parentElement.remove()
            fetch(`http://localhost:3030/jsonstore/phonebook/${data._id}`, {
                method: 'delete'
            });
        });
        li.textContent = `${data.person}: ${data.phone}`;
        li.appendChild(delBtn);
        phonebook.appendChild(li);
    }
}
attachEvents();
