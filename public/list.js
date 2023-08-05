function decorate() {
    alert("WOO Filter")
}

var printCheckVariable = 1;
let imgUrlList0;
function photochoice1(self) {
    printCheckVariable = 1;
    console.log(printCheckVariable);
}
function photochoice2(self) {
    printCheckVariable = 2;
    console.log(printCheckVariable);
}
function photochoice3(self) {
    printCheckVariable = 3;
    console.log(printCheckVariable);
}
function photochoice4(self) {
    printCheckVariable = 4;
    console.log(printCheckVariable);
}


function printcheck(){
    if(printCheckVariable == 1) {
        axios.get('https://'+ipUrl+'/ImageUrl1').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);
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
    else if(printCheckVariable == 2) {
        axios.get('https://'+ipUrl+'/ImageUrl2').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);
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
    else if(printCheckVariable == 3) {
        axios.get('https://'+ipUrl+'/ImageUrl3').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);
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
    else {
        axios.get('https://'+ipUrl+'/ImageUrl4').then(response =>{
            imgUrlList0 = response.data;
            console.log(imgUrlList0);
            imgUrlList0.forEach(url => {
            const imageSection0 = document.getElementById("image-section0");
            const childElement0 = document.createElement('img');
            childElement0.src = url;
            imageSection0.appendChild(childElement0);
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


function yes() {
    let macro_window = window.open("https://trigger.macrodroid.com/a261d86e-69d6-4f9f-b9e9-ecd4af4dcb5c/man","_blank");
    //https://trigger.macrodroid.com/a261d86e-69d6-4f9f-b9e9-ecd4af4dcb5c/man
    setTimeout(()=> {
        macro_window.close();
    },3000);
    
}


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

