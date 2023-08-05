/* pagevariable */
var pg = 0

const ipUrl = '10.50.100.192:9000';



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


/*text content change*/
const text =["Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum at blanditiis eligendi sit veritatis soluta porro itaque! Eum totam veritatis alias consequuntur aliquid facilis, magnam porro mollitia accusamus eligendi dicta esse libero sed omnis vero error, explicabo vel. Ut autem et in voluptatum quis delectus molestiae dolor quaerat consectetur, quidem, harum iste sed perspiciatis ad pariatur molestias praesentium sequi repellat tenetur aperiam eaque eum? Laboriosam sint, asperiores fuga ducimus, perferendis, tenetur minima ut consequatur optio dolores a inventore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum at blanditiis eligendi sit veritatis soluta porro itaque! Eum totam veritatis alias consequuntur aliquid facilis, magnam porro mollitia accusamus eligendi dicta esse libero sed omnis vero error, explicabo vel. Ut autem et in voluptatum quis delectus molestiae dolor quaerat consectetur, quidem, harum iste sed perspiciatis ad pariatur molestias praesentium sequi repellat tenetur aperiam eaque eum? Laboriosam sint, asperiores fuga ducimus, perferendis, tenetur minima ut consequatur optio dolores a inventore.Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam reprehenderit illum at blanditiis eligendi sit veritatis soluta porro itaque! Eum totam veritatis alias consequuntur aliquid facilis, magnam porro mollitia accusamus eligendi dicta esse libero sed omnis vero error, explicabo vel. Ut autem et in voluptatum quis delectus molestiae dolor quaerat consectetur, quidem, harum iste sed perspiciatis ad pariatur molestias praesentium sequi repellat tenetur aperiam eaque eum? Laboriosam sint, asperiores fuga ducimus, perferendis, tenetur minima ut consequatur optio dolores a inventore.","text2","text3","text4"]
function page(i) {
    document.getElementById("page").innerHTML = text[i]
}

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