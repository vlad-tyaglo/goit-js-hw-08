import Player from '@vimeo/player'; 
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(setLocalStorageTime, 1000));

player.setCurrentTime(getLocalStorageTime())
    .catch(error => {
        console.log(`Error: ${error.name}`)
    });

function setLocalStorageTime(event) {
    localStorage.setItem("videoplayer-current-time", `${event.seconds}`);
}

function getLocalStorageTime() {
    return localStorage.getItem("videoplayer-current-time");
}
