/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
//
//이미지 프린트용 js

const ipUrl = '10.50.1.229:9000';

window.onload = () => {
    let imgUrlList0;
    //프린트용 0번째 이미지 불러오기
    axios.get('https://'+ipUrl+'/ImageUrl0').then(response =>{
        imgUrlList0 = response.data;
        console.log(imgUrlList0);
        imgUrlList0.forEach(url => {
        const imageSection0 = document.getElementById("image-section0");
        const childElement0 = document.createElement('img');
        childElement0.src = url;
        imageSection0.appendChild(childElement0);
    });
    });
}