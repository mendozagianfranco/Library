let containerBook = document.querySelector('.container__card')
let modal = document.querySelector('.modal')
let modalClose = document.querySelector('.modal__close')
let btnAddBook = document.querySelector('.btn-add-book button')
let submitNewBook = document.querySelector('.btn-submit button')

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(e) {
    let titleBook = document.querySelector('#title').value;
    let authorBook = document.querySelector('#author').value;
    let pagesBook = document.querySelector('#pages').value;
    let readBook = document.querySelector('#read').checked;

    if (!titleBook || !authorBook || !pagesBook) {
        return
    }

    let newBook = new Book(titleBook, authorBook, pagesBook, readBook)
    myLibrary.push(newBook)
    modal.style.display = 'none'
    showLibraryOnDisplay()
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    e.preventDefault();
}

function showLibraryOnDisplay() {
    let card = document.createElement('div')
    card.setAttribute('class', 'card')

    for (let i = 0; i < myLibrary.length; i++) {
        updateAttributeCard()
        card.innerHTML = `<h2>${myLibrary[i].title}</h2>
        <h3>${myLibrary[i].author}</h3>
        <p>Pages: ${myLibrary[i].pages}</p>
        <button class="btn__card ${myLibrary[i].read ? `read` : `no-read`}">${myLibrary[i].read ? `Read` : `Not read`}</button>
        <button class="btn-remove">Remove</button>`
        containerBook.appendChild(card)
    }

    let btnRemoveCard = document.querySelectorAll('.btn-remove');
    btnRemoveCard.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let cardNumber = card.getAttribute('data-index')
            myLibrary.splice(cardNumber, 1)
            containerBook.removeChild(card)
            updateAttributeCard()
            e.stopImmediatePropagation()
        })
    })

    let btnReadBook = document.querySelectorAll('.btn__card')
    btnReadBook.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopImmediatePropagation()
        })
    })
}

function updateAttributeCard() {
    let cards = document.querySelectorAll('.card')
    for (let i = 0; i < cards.length; i++) {
        cards[i].setAttribute('data-index', i)
    }
}

function openModal() {
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none'
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})

submitNewBook.addEventListener('click', addBookToLibrary)
btnAddBook.addEventListener('click', openModal)
modalClose.addEventListener('click', closeModal)