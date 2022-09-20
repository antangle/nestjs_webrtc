var localVideo = document.getElementById('local-video');
var remoteVideo = document.getElementById('remote-video');

//init socket & peer
let host = 'localhost';
let url = `http://${host}:3000`;
let socket = io(url, {
    transports: ['websocket'],
    path: '/socket.io'
});
let peer;

let audioConstraints;
if (window.chrome) {
    audioConstraints = {
        mandatory: {
            echoCancellation: true
        }
    }
} else {
    audioConstraints = {
        echoCancellation: true
    }
}

let mediaStream;
async function getLocalStream(){
    try {
        return await navigator.mediaDevices
        .getUserMedia({
            audioConstraints: audioConstraints,
            video: true, 
            audio: true
        });
    } catch(err) {
        console.log(err);
    }
}

async function initStream(){
    
    if(!mediaStream) mediaStream = await getLocalStream();

    const myVideo = document.createElement('video');
    addVideoStream(myVideo, mediaStream, localVideo);
    
    peer = new Peer();
    
    peer.on('open', userId => {
        console.log('peer open');
        const data = {
            roomId: roomId,
            userId: userId
        }
        socket.emit('join-room', data);
    });
    
    //after join-room, server responses with 'user-connected'
    socket.on('user-connected', (newUserId) => {
        console.log('user-connected!', newUserId);
        const video = document.createElement('video');
        
        //if new user connects, call that user with peerjs with userId.
        const dataConnection = peer.call(newUserId, mediaStream, {
            metadata: {"type": "host!"}
        });
        //when newUser answers with newUserVideoStream, add that video. 
        dataConnection.on('stream', userVideoStream => {
            console.log('is stream here?')
            addVideoStream(video, userVideoStream, remoteVideo);
        });
    });
    
    //peerjs answering call from original user
    peer.on('call', dataConnection => {
        console.log('get call!');
        console.log(dataConnection.metadata.type)
//        dataConnection.answer(mediaStream);
        dataConnection.answer();
        
        dataConnection.on('stream', userVideoStream => {
            const video = document.createElement('video');
            addVideoStream(video, userVideoStream, remoteVideo);
        });
    });
} 

initStream();

//peerjs setting userid when connection opens

//functions
const connectToNewUser = (newUserId, stream) => {
    console.log('connectToNewUser');

    const dataConnection = peer.call(newUserId, stream);
    const video = document.createElement('video');

    dataConnection.on('stream', userVideoStream => {
        console.log('here!!');
        console.log(userVideoStream.metadata.type)
        addVideoStream(video, userVideoStream, remoteVideo);
    });
}

const addVideoStream = (video, stream, position) => {

    /*let audio = new Audio();
    audio.muted = true;
    audio.srcObject = stream;
    audio.addEventListener('canplaythrough', () => {
        audio.play();
    });

    // var audioContext = new AudioContext();
    // let audioStream = audioContext.createMediaStreamSource(stream);
    // audioStream.connect(audioContext.destination);
    console.log(stream);
    position.append(video);*/
    let audio = new Audio();
    audio.muted = true;
    audio.srcObject = stream;
    audio.addEventListener('canplaythrough', () => {
        audio = null;
    });

    console.log(stream);
    
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    position.append(video);
}

function toggleMic() {
    console.log(mediaStream)
    mediaStream.getVideoTracks().forEach(track => track.enabled = false);
}

//chat

socket.on('createMessage', message => {
    console.log('message coming from server', message);
});

let msg = $('input');

$('html').keydown((e) => {
    if(e.which == 13 && msg.val().length !== 0) {
        const data = {
            roomId: roomId,
            msg: msg.val()
        }        
        socket.emit('message', data);
        msg.val('');
        toggleMic();
    }
})