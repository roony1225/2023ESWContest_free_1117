/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
//
//1.QR코드 입력시 시작 js

const ipUrl = '10.50.10.50:9000'; //ip 주소

//팝업창 변수
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

//버튼 입력시 팝업 띄움
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal) //팝업 출력 함수 실행
    })
})

//버튼 입력시 팝업 종료
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal) //팝업 종료 함수 실행
    })
})

//-----------------------------------------------------------------------

//팝업창 페이지 변수
var pg = 0

//팝업 출력 함수
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
    document.getElementById("current-page").innerHTML = (pg+1)+"/4"
    page(pg)
}

//팝업 종료 함수
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
    pg=0
}

//팝업창 텍스트 : 변수 pg에 따라 텍스트 내용 변경
const text =["text1","text2","text3","text4"]
function page(i) {
    document.getElementById("page").innerHTML = text[i]
}

//팝업창 이전 페이지 함수
function pagedown() {
    if(pg>0) {
        pg--
        document.getElementById("page").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/4"
        console.log(pg)
    }
}

//팝업창 다음 페이지 함수
function pageup() {
    if(pg<3) {
        pg++
        document.getElementById("page").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/4"
        console.log(pg)
    }
    else { 
        //팝업창 4번째 페이지에서 다음 입력시 index.html로 이동
        closeModal(modal)
        window.open("https://"+ipUrl,"_self")
    }
}