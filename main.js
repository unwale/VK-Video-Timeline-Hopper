document.addEventListener('keyup', (event) => {
    const videoPlayer = document.querySelector('.videoplayer');
    if (!videoPlayer || videoPlayer !== document.activeElement) return;

    if (!event.ctrlKey) return;
    if (event.key != 'ArrowRight' && event.key != 'ArrowLeft') return;   

    timecodes = mvcur.player.getTimeCodes();
    currentTime = mvcur.player.curTime();

    if (!timecodes || timecodes.length === 0 || currentTime >= timecodes[timecodes.length - 1].time) return;

    let nextTimeCodeIndex = 1;
    for (i = 0; i < timecodes.length; i++) {
        if (timecodes[i].time > currentTime && (timecodes[i - 1].time || 0) < currentTime) {
            nextTimeCodeIndex = i;
            break;
        }
    }

    switch (event.key) {
        case 'ArrowRight':
            mvcur.player.seekTo(timecodes[nextTimeCodeIndex].time);
            break;
        case 'ArrowLeft':
            mvcur.player.seekTo(timecodes[nextTimeCodeIndex - 1].time);
            break;
        default:
            break;
    }
});

document.addEventListener('keyup', (event) => {
    const videoPlayer = document.querySelector('.videoplayer');
    if (!videoPlayer || videoPlayer !== document.activeElement) return;

    if (event.key >= '0' && event.key <= '9') {
        const duration = mvcur.player.getDuration();
        if (!duration) return;

        mvcur.player.seekTo(duration * parseInt(event.key) / 10);
    }
});
