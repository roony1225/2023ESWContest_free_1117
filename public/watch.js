/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
//
//2.촬영화면 js

const ipUrl = '10.50.10.50:9000';

//필터 설정------------------------------------------------------
var filterVariable = 0;//필터 변수 선언

function applyFilter(pixels, filterVariable) {
  var d = pixels.data;

  //필터: 반전
  if (filterVariable == 1) {
    for(var i=0; i<d.length; i+=4 ){
      d[i] = 255 - d[i];     // R
      d[i+1] = 255 - d[i+1]; // G
      d[i+2] = 255 - d[i+2]; // B
      d[i+3] = 255;          // Alpha
    }
    return pixels;
  }

  //필터: 흑백
  else if (filterVariable == 2) {
    for(var i=0; i<d.length; i+=4 ){
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];

      var v = 0.2126*r + 0.7152*g + 0.0722*b;  // 보정값
      d[i] = d[i+1] = d[i+2] = v               // RBG 색을 같게 맞추자
    }
    return pixels;
  }

  //필터: 세피아
  else if (filterVariable == 3) {
    for(var i=0; i<d.length; i+=4 ){
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];

      d[i] = r*0.3588 + g*0.7044 + b*0.1368;
      d[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
      d[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
    }
    return pixels;
  }

  //필터: 노말
  else {
    return pixels;
  }
}

//필터 효과 설정
//필터: 노말
function filterNormal() {
  console.log('normal')
  document.getElementById('videostream').style.filter='invert(0%)'; //비디오에 노말 필터 씌움
  filterVariable = 0; //필터 변수 0 설정 -> 필터: 노말
}

//필터: 반전
function filterInvert() {
  console.log('invert')
  document.getElementById('videostream').style.filter='invert(100%)'; //비디오에 반전 필터 씌움
  filterVariable = 1; //필터 변수 1 설정 -> 필터: 반전
}

//필터: 흑백
function filterGrey() {
  console.log('grey')
  document.getElementById('videostream').style.filter='grayscale(100%)'; //비디오에 흑백 필터 씌움
  filterVariable = 2; //필터 변수 2 설정 -> 필터: 흑백
}

//필터: 세피아
function filterSepia() {
  console.log('sepia')
  document.getElementById('videostream').style.filter='sepia(100%)'; //비디오에 세피아 필터 씌움
  filterVariable = 3; //필터 변수 3 설정 -> 필터: 세피아
}


//포즈 설정--------------------------------------------------------
//포즈 이미지 선택
const pose = [, "<img src='image/pose1.png'>", "<img src='image/pose2.png'>", "<img src='image/pose3.png'>", "<img src='image/pose4.png'>"]//예시 이미지, 추후 수정 필요
function person1(){
  document.getElementById("poselist").innerHTML = pose[1]; //1명
}
function person2(){
  document.getElementById("poselist").innerHTML = pose[2]; //2명
}
function person3(){
  document.getElementById("poselist").innerHTML = pose[3]; //3명
}
function person4(){
  document.getElementById("poselist").innerHTML = pose[4]; //4명
}


//---------------------------------------------------------------------------------------------------------------------------
let peerConnection;
const config = {
  iceServers: [
      { 
        "urls": "stun:stun.l.google.com:19302",
      }
  ]
};

// const socket = io.connect(window.location.origin);
const socket = io.connect('https://'+ipUrl);
const video = document.querySelector("video");

socket.on("offer", (id, description) => {
  console.log("1");
  peerConnection = new RTCPeerConnection(config);
  peerConnection
    .setRemoteDescription(description)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("answer", id, peerConnection.localDescription);
    });
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0];
    console.log("2");
  };
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
      console.log("3", event.candidate);
    }
  };
});


socket.on("candidate", (id, candidate) => {
  console.log("4", candidate);
  peerConnection
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch(e => console.error(e));
});

socket.on("connect", () => {
  console.log("5");
  socket.emit("watcher");
});

socket.on("broadcaster", () => {
  console.log("6");
  socket.emit("watcher");
});

window.onunload = window.onbeforeunload = () => {
  console.log("7");
  socket.close();
  peerConnection.close();
};
//---------------------------------------------------------------------------------------------------------------------------




//촬영 이미지 1,2,3,4 변수들
var imgList1 = []; //이미지주소1
var imgUrlList1 = []; //이미지주소1
var imgList2 = []; //이미지주소2
var imgUrlList2 = []; //이미지주소2
var imgList3 = []; //이미지주소3
var imgUrlList3 = []; //이미지주소3
var imgList4 = []; //이미지주소4
var imgUrlList4 = []; //이미지주소4

var photocount = 0; //촬영된 사진 수
var photoDelay = 0; //촬영 딜레이
const timer=["3","2","1",""]; //타이머 텍스트

//촬영 기능
function imgCapture(self){
  if(photoDelay == 0) { //변수photoDelay가 0일때만 촬영가능
    photoDelay = 1; 

    //타이머 출력
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[0];
    },0); //바로 3출력
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[1];
    },1000); //1초후 2출력
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[2];
    },2000); //2초후 1출력

    setTimeout(()=> {

      //1번째 촬영
      if(photocount == 0) {
        console.log(video.srcObject.getVideoTracks());
        const imageGrid = document.getElementById("image-grid");
        const childElement = document.createElement('canvas');
        childElement.width = video.videoWidth;
        childElement.height = video.videoHeight;
        const context = childElement.getContext('2d');
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, 640*-1, 480);

        // Get the image data from the canvas
        const imageData = context.getImageData(0, 0, 640, 480);

        //필터 적용-------------
        var pixels = context.getImageData(0,0, 640, 480);
        var filteredData = applyFilter(pixels,filterVariable); //filterVariable 변수 값에 따라 필터 효과 적용
        context.putImageData(filteredData, 0 , 0); //이미지에 필터 적용
        //---------------------

        imgUrlList1.push(childElement.toDataURL('image1/png')); //1번째 이미지
        console.log(640+'x'+480);
        imageGrid.appendChild(childElement);
        console.log(imgUrlList1);
        imgList1.push(imageData);

        //1번째 이미지를 1번째 이미지주소에 저장
        axios.post('https://'+ipUrl+'/ImageUrl1', {
            'imgUrlList' : imgUrlList1
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3]; //타이머 숨김
        photoDelay = 0; //다시 촬영 가능
        photocount ++; //촬영횟수 1증가
      }

      //2번째 촬영
      else if (photocount == 1) {
        console.log(video.srcObject.getVideoTracks());
        const imageGrid = document.getElementById("image-grid");
        const childElement = document.createElement('canvas');
        childElement.width = video.videoWidth;
        childElement.height = video.videoHeight;
        const context = childElement.getContext('2d');
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, 640*-1, 480);
      
        imageGrid.appendChild(childElement);
      
        // Get the image data from the canvas
        const imageData = context.getImageData(0, 0, 640, 480);

        //필터 적용-------------
        var pixels = context.getImageData(0,0, 640, 480);
        var filteredData = applyFilter(pixels,filterVariable); //filterVariable 변수 값에 따라 필터 효과 적용
        context.putImageData(filteredData, 0 , 0); //이미지에 필터 적용
        //---------------------

        imgUrlList2.push(childElement.toDataURL('image2/png')); //2번째 이미지
        console.log(640+'x'+480);
        console.log(imgUrlList2);
        imgList2.push(imageData);

        //2번째 이미지를 2번째 이미지주소에 저장
        axios.post('https://'+ipUrl+'/ImageUrl2', {
            'imgUrlList' : imgUrlList2
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3]; //타이머 숨김
        photoDelay = 0; //다시 촬영 가능
        photocount ++; //촬영횟수 1증가
      }

      //3번째 촬영
      else if (photocount == 2) {
        console.log(video.srcObject.getVideoTracks());
        const imageGrid = document.getElementById("image-grid");
        const childElement = document.createElement('canvas');
        childElement.width = video.videoWidth;
        childElement.height = video.videoHeight;
        const context = childElement.getContext('2d');
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, 640*-1, 480);
      
        imageGrid.appendChild(childElement);
      
        // Get the image data from the canvas
        const imageData = context.getImageData(0, 0, 640, 480);

        //필터 적용-------------
        var pixels = context.getImageData(0,0, 640, 480);
        var filteredData = applyFilter(pixels,filterVariable); //filterVariable 변수 값에 따라 필터 효과 적용
        context.putImageData(filteredData, 0 , 0); //이미지에 필터 적용
        //---------------------

        imgUrlList3.push(childElement.toDataURL('image3/png'));
        console.log(640+'x'+480);
        console.log(imgUrlList3);
        imgList3.push(imageData);

        //3번째 이미지를 3번째 이미지주소에 저장
        axios.post('https://'+ipUrl+'/ImageUrl3', {
            'imgUrlList' : imgUrlList3
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3]; //타이머 숨김
        photoDelay = 0; //다시 촬영 가능
        photocount ++; //촬영횟수 1증가
      }

      //4번째 촬영
      else {
        console.log(video.srcObject.getVideoTracks());
        const imageGrid = document.getElementById("image-grid");
        const childElement = document.createElement('canvas');
        childElement.width = video.videoWidth;
        childElement.height = video.videoHeight;
        const context = childElement.getContext('2d');
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, 640*-1, 480);
      
        imageGrid.appendChild(childElement);
      
        // Get the image data from the canvas
        const imageData = context.getImageData(0, 0, 640, 480);

        //필터 적용-------------
        var pixels = context.getImageData(0,0, 640, 480);
        var filteredData = applyFilter(pixels,filterVariable); //filterVariable 변수 값에 따라 필터 효과 적용
        context.putImageData(filteredData, 0 , 0); //이미지에 필터 적용
        //---------------------

        imgUrlList4.push(childElement.toDataURL('image4/png'));
        console.log(640+'x'+480);
        console.log(imgUrlList4);
        imgList4.push(imageData);

        //4번째 이미지를 4번째 이미지주소에 저장
        axios.post('https://'+ipUrl+'/ImageUrl4', {
            'imgUrlList' : imgUrlList4
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3]; //타이머 숨김
        photoDelay = 0; //다시 촬영 가능
        photocount = 0; //촬영횟수 1증가
        window.open("list.html","_self"); //4번째 촬영 후 바로 list.html로 이동
      }
    },3000); //타이머 3초
  }
  else{
    alert("WAIT"); //촬영중에 캡처버튼 누르면 경고장 출력
  }
}


//팝업창 열기/닫기
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal) //팝업창 출력
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        const modal2 = button.closest('.modal2')
        closeModal(modal) //필터 팝업창 종료
        closeModal2(modal2) //포즈 팝업창 종료
    })
})

//팝업창 출력 함수
function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
}

//필터 팝업창 종료 함수
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
}

//포즈 팝업창 종료 함수
function closeModal2(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  document.getElementById("poselist").innerHTML = '';
}