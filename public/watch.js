const ipUrl = '10.50.100.192:9000';

//필터 함수
var filterVariable = 0;
function applyFilter(pixels, filterVariable) {
  var d = pixels.data;
  //invert filter
  if (filterVariable == 1) {
    for(var i=0; i<d.length; i+=4 ){
      d[i] = 255 - d[i];     // R
      d[i+1] = 255 - d[i+1]; // G
      d[i+2] = 255 - d[i+2]; // B
      d[i+3] = 255;          // Alpha
    }
    return pixels;
  }
  //greyscale filter
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
  //normal
  else {
    return pixels;
  }
}


//filter Effect
function filterNormal() {
  console.log('normal')
  document.getElementById('videostream').style.filter='invert(0%)';
  filterVariable = 0;
}

function filterInvert() {
  console.log('invert')
  document.getElementById('videostream').style.filter='invert(100%)';
  filterVariable = 1;
}

function filterGrey() {
  console.log('grey')
  document.getElementById('videostream').style.filter='grayscale(100%)';
  filterVariable = 2;
}

function filterSepia() {
  console.log('sepia')
  document.getElementById('videostream').style.filter='sepia(100%)';
  filterVariable = 3;
}





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





//촬영 버튼 동작
var imgList1 = [];
var imgUrlList1 = [];
var imgList2 = [];
var imgUrlList2 = [];
var imgList3 = [];
var imgUrlList3 = [];
var imgList4 = [];
var imgUrlList4 = [];
var photocount = 0;
var photoDelay = 0;
const timer=["3","2","1",""];
function imgCapture(self){
  if(photoDelay == 0) {
    photoDelay = 1;
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[0];
    },0);
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[1];
    },1000);
    setTimeout(()=> {
      document.getElementById("timer").innerHTML = timer[2];
    },2000);
    setTimeout(()=> {
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
        var filteredData = applyFilter(pixels,filterVariable);
        context.putImageData(filteredData, 0 , 0);
        //---------------------


        imgUrlList1.push(childElement.toDataURL('image1/png'));
        
        console.log(640+'x'+480);

        imageGrid.appendChild(childElement);

        console.log(imgUrlList1);

        imgList1.push(imageData);
        axios.post('https://'+ipUrl+'/ImageUrl1', {
            'imgUrlList' : imgUrlList1
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3];
        photoDelay = 0;
        photocount ++;
      }
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
        var filteredData = applyFilter(pixels,filterVariable);
        context.putImageData(filteredData, 0 , 0);
        //---------------------

        imgUrlList2.push(childElement.toDataURL('image2/png'));

        console.log(640+'x'+480);

        console.log(imgUrlList2);
        imgList2.push(imageData);
        axios.post('https://'+ipUrl+'/ImageUrl2', {
            'imgUrlList' : imgUrlList2
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3];
        photoDelay = 0;
        photocount ++;
      }
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
        var filteredData = applyFilter(pixels,filterVariable);
        context.putImageData(filteredData, 0 , 0);
        //---------------------

        imgUrlList3.push(childElement.toDataURL('image3/png'));

        console.log(640+'x'+480);

        console.log(imgUrlList3);
        imgList3.push(imageData);
        axios.post('https://'+ipUrl+'/ImageUrl3', {
            'imgUrlList' : imgUrlList3
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3];
        photoDelay = 0;
        photocount ++;
      }

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
        var filteredData = applyFilter(pixels,filterVariable);
        context.putImageData(filteredData, 0 , 0);
        //---------------------

        imgUrlList4.push(childElement.toDataURL('image4/png'));

        console.log(640+'x'+480);

        console.log(imgUrlList4);
        imgList4.push(imageData);
        axios.post('https://'+ipUrl+'/ImageUrl4', {
            'imgUrlList' : imgUrlList4
          }, {
        })
        .then(response => {
          console.log(response);
        });
        document.getElementById("timer").innerHTML = timer[3];
        photoDelay = 0;

        photocount = 0;
        window.open("list.html","_self");
      }
    },0);
  }
  else{
    alert("Y U SO RUSH MAN?");
  }
}


//포즈 이미지 선택
const pose = [, "<img src='image/sticker-icon.png'>", "<img src='image/capture.png'>", "<img src='image/filter-icon.png'>", "<img src='Lens-removebg-preview.png'>"]//예시 이미지, 추후 수정 필요
function person1(){
  document.getElementById("poselist").innerHTML = pose[1];
}
function person2(){
  document.getElementById("poselist").innerHTML = pose[2];
}
function person3(){
  document.getElementById("poselist").innerHTML = pose[3];
}
function person4(){
  document.getElementById("poselist").innerHTML = pose[4];
}




/*팝업창 열기/닫기*/
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')

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
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
}

function closeModal2(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  document.getElementById("poselist").innerHTML = '';
}