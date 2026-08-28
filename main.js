import { PageFlip } from 'page-flip';

document.addEventListener('DOMContentLoaded', function() {
    const bookContainer = document.getElementById('flipbook');
    
    // Initialize PageFlip
    const pageFlip = new PageFlip(bookContainer, {
        width: 550, // base page width
        height: 700, // base page height
        
        size: "stretch",
        // set threshold values:
        minWidth: 350,
        maxWidth: 650,
        minHeight: 500,
        maxHeight: 850,

        maxShadowOpacity: 0.5, // Half shadow intensity
        showCover: true,
        mobileScrollSupport: true,
        
        usePortrait: true, // Will show 1 page on mobile
    });

    // Load pages
    const pages = document.querySelectorAll('.page');
    pageFlip.loadFromHTML(pages);

    // Audio Setup
    // Fallback URL if local file is missing
    const pageTurnAudio = document.getElementById('page-turn-audio');
    const bgMusic = document.getElementById('bg-music');
    const playMusicBtn = document.getElementById('play-music-btn');

    // Setup page turn sound
    pageFlip.on('flip', (e) => {
        if (pageTurnAudio) {
            // reset time to allow rapid flipping
            pageTurnAudio.currentTime = 0;
            // Catch error in case of autoplay restrictions or missing file
            pageTurnAudio.play().catch(e => console.log('Audio play prevented:', e));
        }
    });

    // Setup background music toggle
    let isPlaying = false;
    if (playMusicBtn && bgMusic) {
        playMusicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent page turn when clicking button
            if (isPlaying) {
                bgMusic.pause();
                playMusicBtn.style.opacity = '0.3';
            } else {
                bgMusic.play().catch(e => console.log('Music play prevented:', e));
                playMusicBtn.style.opacity = '1';
            }
            isPlaying = !isPlaying;
        });
    }
});
