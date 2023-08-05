/* 사진 프린트용 창 */

const ipUrl = '192.168.45.210:9000';
window.onload = () => {
    let imgUrlList0;
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