document.querySelectorAll('.nav__list-link').forEach(function(element) {
    element.addEventListener('click', function() {
        document.querySelector(".active").classList.remove("active")
        const tabText = document.querySelector(`.${this.getAttribute('data-tab')}`)
        tabText.classList.add('active')
    })
})

async function getPosts() {
    const postsList = document.querySelector('.main__posts-section-list')
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json()
        let currentPage = 1
        const postsPerPage = 10
        function showPosts() {
            const startIndex = (currentPage - 1) * postsPerPage
            const endIndex = currentPage * postsPerPage
            postsList.innerHTML = ''
            posts.slice(startIndex, endIndex).forEach(post => {
                const {userId, id, title, body} = post
                const postItem = document.createElement('div')
                postItem.classList.add('main__posts-section-list-item')
                postItem.innerHTML = `
                                <p class="main__posts-section-list-item-data">
                                    <span class="userId">${userId}</span>
                                    <span class="id">${id}</span>
                                </p>
                                <h3 class="main__posts-section-list-item-title">
                                    ${title}
                                </h3>
                                <p class="main__posts-section-list-item-descr">
                                    ${body}
                                </p>
                `
                postsList.append(postItem)
            })
        }
        function createPagination() {
            const pages = Math.floor(posts.length / postsPerPage)
            const pagination = document.createElement('div')
            pagination.classList.add('main__posts-section-pagination')
            for (let i = 1; i <= pages; i++) {
                const button = document.createElement('button')
                button.classList.add('main__posts-section-pagination-button')
                button.innerText = i
                if (i == currentPage) {
                    button.style.background = '#4DAD16'
                }
                button.addEventListener('click', () => {
                    currentPage = i
                    showPosts()
                    pagination.innerHTML = ''
                    createPagination()
                })
                pagination.append(button)
            }
            document.querySelector('.main__posts-section').append(pagination)
        }
        showPosts()
        createPagination()
    } catch (error) {
        console.log(error)
    }
}

getPosts()

async function getUsers() {
    const postsList = document.querySelector('.main__users-section')
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const posts = await response.json()
        posts.forEach(post => {
            const {id, name, username, email, address: {street, suite, city, zipcode, geo: {lat, lng}}, phone, website, company: {name:company_name, catchPhrase, bs}} = post
            const postItem = document.createElement('div')
            postItem.classList.add('main__users-section-list-item')
            postItem.innerHTML = `
                    <div class="main__users-section-list-item-data users__naming">
                        <h3 class="main__users-section-list-item-name">${name} <br>(@${username})</h3>
                    </div>
                    <div class="main__users-section-list-item-data">
                        <p class="main__users-section-list-item-text">Email:</p>
                        <a href="mailto:${email}" class="main__users-section-list-item-text-content">${email}</a>
                    </div>
                    <div class="main__users-section-list-item-data">
                        <p class="main__users-section-list-item-text">Address:</p>
                        <p class="main__users-section-list-item-text-content"><strong>City: </strong>${city}</p>
                        <p class="main__users-section-list-item-text-content"><strong>Street: </strong>${street}, ${suite}</p>
                        <p class="main__users-section-list-item-text-content"><strong>Zipcode: </strong>${zipcode}</p>
                        <p class="main__users-section-list-item-text-content"><strong>Geo: </strong>${lat}, ${lng}</p>
                    </div>
                    <div class="main__users-section-list-item-data">
                        <p class="main__users-section-list-item-text">Phone:</p>
                        <p class="main__users-section-list-item-text-content">${phone}</p>
                    </div>
                    <div class="main__users-section-list-item-data">
                        <p class="main__users-section-list-item-text">Website:</p>
                        <p class="main__users-section-list-item-text-content">${website}</p>
                    </div>
                    <div class="main__users-section-list-item-data">
                        <p class="main__users-section-list-item-text">Company:</p>
                        <p class="main__users-section-list-item-text-content"><strong>Name: </strong>${company_name}</p>
                        <p class="main__users-section-list-item-text-content"><strong>CatchPhrase: </strong>${catchPhrase}</p>
                        <p class="main__users-section-list-item-text-content"><strong>BS: </strong>${bs}</p>
                    </div>
                    <h4 class="users__id">${id}</h4>
            `
            postsList.append(postItem)
        })
    } catch (error) {
        console.log(error)
    }
}

getUsers()