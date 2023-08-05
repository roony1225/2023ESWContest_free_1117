/* pagevariable */
var pg = 0

const ipUrl = '192.168.45.210:9000';

/*시작화면 팝업창코드*/
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
    document.getElementById("current-page").innerHTML = (pg+1)+"/4"
    page(pg)
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    pg=0
}


/*시작화면 팝업창 예시 텍스트*/
const text =["text1","text2","text3","text4"]
function page(i) {
    document.getElementById("page").innerHTML = text[i]
}

/*시작화면 팝업창 페이지 넘기기*/
function pagedown() {
    if(pg>0) {
        pg--
        document.getElementById("page").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/4"
        console.log(pg)
    }
}

function pageup() {
    if(pg<3) {
        pg++
        document.getElementById("page").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/4"
        console.log(pg)
    }
    else {
        closeModal(modal)
        window.open("https://"+ipUrl,"_self")
    }
}