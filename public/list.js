/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
/*  */
//3.이미지 선택창 js

//꾸미기 버튼: 미구현
function decorate() {
    alert("WOO Filter")
}

var printCheckVariable = 1; //n번째 이미지 선택 변수
let imgUrlList0; //프린트용 주소로 넘길 0번째 이미지 주소

//1번째 이미지 선택
function photochoice1(self) {
    printCheckVariable = 1;
    console.log(printCheckVariable);
}

//2번째 이미지 선택
function photochoice2(self) {
    printCheckVariable = 2;
    console.log(printCheckVariable);
}

//3번째 이미지 선택
function photochoice3(self) {
    printCheckVariable = 3;
    console.log(printCheckVariable);
}

//4번째 이미지 선택
function photochoice4(self) {
    printCheckVariable = 4;
    console.log(printCheckVariable);
}

//지정사진 프린트용 주소로 넘기기
function printcheck(){

    //1번째 이미지 선택
    if(printCheckVariable == 1) {
        //1번째 이미지 가져오기
        axios.get('https://'+ipUrl+'/ImageUrl1').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);

            //1번째 이미지를 프린트용 0번재 이미지 주소에 저장
            axios.post('https://'+ipUrl+'/ImageUrl0', {
                'imgUrlList' : imgUrlList0
              }, {
            })
            .then(response => {
              console.log(response);
              console.log('photo'+printCheckVariable+' chosen');
            });
        });
        });
    }

    //2번째 이미지 선택
    else if(printCheckVariable == 2) {
        //2번째 이미지 가져오기
        axios.get('https://'+ipUrl+'/ImageUrl2').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);

            //2번째 이미지를 프린트용 0번재 이미지 주소에 저장
            axios.post('https://'+ipUrl+'/ImageUrl0', {
                'imgUrlList' : imgUrlList0
              }, {
            })
            .then(response => {
              console.log(response);
              console.log('photo'+printCheckVariable+' chosen');
            });
        });
        });
    }

    //3번째 이미지 선택
    else if(printCheckVariable == 3) {
        //3번째 이미지 가져오기
        axios.get('https://'+ipUrl+'/ImageUrl3').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);

            //3번째 이미지를 프린트용 0번재 이미지 주소에 저장
            axios.post('https://'+ipUrl+'/ImageUrl0', {
                'imgUrlList' : imgUrlList0
              }, {
            })
            .then(response => {
              console.log(response);
              console.log('photo'+printCheckVariable+' chosen');
            });
        });
        });
    }

    //4번째 이미지 선택
    else {
        //4번째 이미지 가져오기
        axios.get('https://'+ipUrl+'/ImageUrl4').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);

            //4번째 이미지를 프린트용 0번재 이미지 주소에 저장
            axios.post('https://'+ipUrl+'/ImageUrl0', {
                'imgUrlList' : imgUrlList0
              }, {
            })
            .then(response => {
              console.log(response);
              console.log('photo'+printCheckVariable+' chosen');
            });
        });
        });
    }
}

//프린트 매크로 실행
function yes() {
    let macro_window = window.open("https://trigger.macrodroid.com/a261d86e-69d6-4f9f-b9e9-ecd4af4dcb5c/man","_blank");//매크로 실행 트리거
    setTimeout(()=> {
        macro_window.close();
    },3000);//3초후 매크로 창 종료
    
}

//팝업창
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
        const modal2 = button.closest('.modal2')
        closeModal(modal)
        closeModal2(modal2)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function closeModal2(modal) {
    if (modal == null) return
    modal.classList.remove('active')
}