function attachEvents() {

    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');
    let posts = document.getElementById('posts');
    let postTitle = document.getElementById('post-title');
    let postBody = document.getElementById('post-body');
    let postComments = document.getElementById('post-comments');

    btnLoadPosts.addEventListener('click', async () => {

        let res = await fetch('http://localhost:3030/jsonstore/blog/posts');
        let commonData = await res.json();

        for (const line of Object.entries(commonData)) {

            let option = document.createElement('option');
            option.value = line[0];
            option.textContent = line[1].title;
            posts.appendChild(option);
        }

        btnViewPost.addEventListener('click', () => {
            let id = posts.value;

            fetch('http://localhost:3030/jsonstore/blog/comments')
                .then(res => res.json())
                .then(data => {
                    let found = Object.values(data).filter(com => com.postId == id);

                    postComments.innerHTML = '';
                    postTitle.textContent = commonData[id].title;
                    postBody.textContent = commonData[id].body;

                    for (const comment of found) {

                        let li = document.createElement('li');
                        li.textContent = comment.text;
                        postComments.appendChild(li);
                    }

                });
        });
    });
}
attachEvents();