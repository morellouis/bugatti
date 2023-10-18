import {Cursor, show_nav, load} from "./functions.js"

load()
new Cursor();

const music = new Audio('assets/music/music.mp3');
    music.loop = true;

    const audio_btn = document.getElementById("audio_btn")

    audio_btn.addEventListener("click", () => {
        if (audio_btn.classList.contains("on")) {
            music.pause();
            music.currentTime = 0;
            audio_btn.classList.remove("on")
            audio_btn.textContent = "audio off";
        } else {
            audio_btn.classList.add("on")
            music.play();
            audio_btn.textContent = "audio on";
        }
    })

var inputRange = document.getElementById("change_volume");

inputRange.addEventListener("input", function() {
    changeVolume(inputRange.value);
});

function changeVolume(volume) {
    var volumeFloat = parseFloat(volume) / 100;
    volumeFloat = Math.min(1, Math.max(0, volumeFloat));
    music.volume = volumeFloat;
}


const loader = document.getElementById("#loader")
const btn_nav = document.getElementById("btn_nav")
const nav = document.getElementById("navigation")
show_nav(nav, btn_nav);
