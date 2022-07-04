function solve() {

    let spanInfo = document.getElementsByTagName('span');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let first = { next: 'depot' };
    async function depart() {

        const res = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${first.next}`);
        first = await res.json();

        spanInfo[0].textContent = `Next stop ${first.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;

    }
    function arrive() {
        spanInfo[0].textContent = `Arriving at ${first.name}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}
let result = solve();

    // without async/await

    // let spanInfo = document.getElementsByTagName('span');
    // let departBtn = document.getElementById('depart');
    // let arriveBtn = document.getElementById('arrive');
    // let first = 'depot';    
    // function depart() {

    //     fetch(`http://localhost:3030/jsonstore/bus/schedule/${first}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             spanInfo[0].textContent = `Next stop ${data.name}`;
    //             arriveBtn.disabled = false;
    //             departBtn.disabled = true;

    //         });
    // }
    // function arrive() {
    //     fetch(`http://localhost:3030/jsonstore/bus/schedule/${first}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             spanInfo[0].textContent = `Arriving at ${data.name}`;
    //             first = data.next;
    //             arriveBtn.disabled = true;
    //             departBtn.disabled = false;
    //         });
    // }

 

