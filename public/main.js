/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
//
//1.QR코드 입력시 시작 js

const ipUrl = '10.50.8.244:9000'; //ip 주소

function goToNextPage() {
    window.open("https://"+ipUrl,"_self");
}


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
const text =["사용법<br><br>1. 삶의 한평은 총 4장의 사진을 찍을 수 있습니다.<br><br>2. 한 장을 찍을 때 3초가 지난 후 사진이 찍히게 됩니다.<br><br>3. 사진을 프린트 하는것은 유료 입니다.<br><br>4. 4장의 사진을 다 찍었다면 내가 원하는 사진을 터치해 print를 터치하면 사진을 프린트 할 수 있습니다.<br><br>(단 사진을 프린트 하실때 팝업창을 허용해주셔야 작동됩니다!)","추가기능<br><br>1.좌측 하단에 있는 버튼을 터치해 여러 사진 포즈를 추천 받을 수 있습니다.<br><br>2.우측 하단에 있는 버튼을 터치해 여러 필터를 적용해 볼 수 있습니다."]
function page(i) {
    document.getElementById("modal-body").innerHTML = text[i]
}

//팝업창 이전 페이지 함수
function pagedown() {
    if(pg>0) {
        pg--
        document.getElementById("modal-body").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/2"
        console.log(pg)
    }
}

//팝업창 다음 페이지 함수
function pageup() {
    if(pg<1) {
        pg++
        document.getElementById("modal-body").innerHTML = text[pg]
        document.getElementById("current-page").innerHTML = (pg+1)+"/2"
        console.log(pg)
    }
}