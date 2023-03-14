let post = JSON.parse(new URL(window.location.href).searchParams.get('post'));
let postDetailsDiv = document.getElementsByClassName('post-details')[0];

show.call(postDetailsDiv, post);

fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
    .then(response => response.json())
    .then(comments => {
        let commentsDiv = document.body.getElementsByClassName('comments')[0];
        for (const comment of comments) {
            let div = document.createElement('div');
            div.innerHTML = comment.body;
            commentsDiv.appendChild(div);
        }
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