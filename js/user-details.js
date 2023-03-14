let user = JSON.parse(new URL(window.location.href).searchParams.get('user'))
let userDetailsDiv = document.body.getElementsByClassName('user-details')[0];
let postsButton = document.body.getElementsByClassName('show-posts-button')[0];

show.call(userDetailsDiv, user);

let postsVisible = false;

//show posts
postsButton.addEventListener('click', () => {
    let postsDiv = document.body.getElementsByClassName('posts')[0];
    if (postsVisible) {
        postsDiv.innerHTML = ''
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(response => response.json())
        .then(posts => {
            let buttonPostMap = [];
            for (const post of posts) {
                let div = document.createElement('div')
                let p = document.createElement('p');
                let button = document.createElement('button');

                p.innerText = post.title;
                button.innerText = 'details'

                div.append(p, button);
                postsDiv.appendChild(div);

                buttonPostMap.push([button, post])
            }
            return buttonPostMap;
        })
        .then(buttonPostMap => {
            for (const [button, post] of buttonPostMap) {
                button.addEventListener('click', () => {
                    window.location.href = `post-details.html?post=${JSON.stringify(post)}`;
                })
            }
        })
        .then(() => {
            window.scroll({
                top: postsDiv.scrollHeight,
                behavior: 'smooth'
            })
        })

    postsVisible = true;
})

function show(obj) {
    let ul = document.createElement('ul');
    this.appendChild(ul);
    for (const key in obj) {
        let li = document.createElement('li');
        if (typeof obj[key] !== 'object') {
            li.innerHTML = `${key}: ${obj[key]}`;
        } else {
            li.innerHTML = `${key}:<br>`
            show.call(li, obj[key]);
        }
        ul.appendChild(li);
    }
}