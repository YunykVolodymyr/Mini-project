fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(users => {
    let buttonUserMap = [];
    for (const user of users) {
        let userDiv = document.body.getElementsByClassName('users')[0];
        let div = document.createElement('div');
        let p = document.createElement('p');
        let button = document.createElement('button');

        p.innerText = `${user.id} - ${user.name}`;
        button.innerText = 'details';

        userDiv.appendChild(div);
        div.append(p, button);
        buttonUserMap.push([button, user]);
    }
    return buttonUserMap;
})
.then(buttonUserMap => {
    for (const [button, user] of buttonUserMap) {
        button.addEventListener('click', () => {
            window.location.href = `user-details.html?user=${JSON.stringify(user)}`
        })
    }
})