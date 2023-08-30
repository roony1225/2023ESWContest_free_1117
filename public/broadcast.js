/* 페이지 순서
HTML: main > index > list > printphoto
CSS: main > index > list
JS: main > watch > list > printphoto */
const peerConnections = {};
const config = {
  iceServers: [
    { 
      "urls": "stun:stun.l.google.com:19302",
    },
  ]
};

const ipUrl = '10.50.8.244:9000';

// setting video
// const socket = io.connect(window.location.origin);
const socket = io.connect(ipUrl);
const video = document.querySelector("#myVideo");

navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true
/*   video: { facingMode: 'user', mirror: false } */
}).then(gotStream).catch(function(e) {
  alert('getUserMedia() error ' + e.name);
});

function gotStream(stream) {
  console.log('local stream');
  video.srcObject = stream;
  socket.emit("broadcaster"); // set the broadcaster
}


// rtc peer connection
// when broadcaster and watcher exist
socket.on("watcher", id => {
  console.log("a");
  const peerConnection = new RTCPeerConnection(config);
  peerConnections[id] = peerConnection;

  let stream = video.srcObject;
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream)); // add each track of the stream to peerConnection
  
  console.log("a");
  peerConnection.onicecandidate = event => {
    console.log("c");

    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
      console.log("d");
    }
  };

  peerConnection
    .createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, peerConnection.localDescription);
      console.log("e");
    });
});

socket.on("answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
  console.log("f");
});

socket.on("candidate", (id, candidate) => {
  console.log('candidate', candidate)
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
  console.log("g");
});

socket.on("disconnectPeer", id => {
  peerConnections[id].close();
  delete peerConnections[id];
  console.log("h");
});

window.onunload = window.onbeforeunload = () => {
  socket.close();
};
