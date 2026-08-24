const table = document.getElementById('vessel-table');
const toc = document.getElementById('toc');
const icons = {
    play: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><polygon points="6,4 20,12 6,20"></polygon></svg>',
    pause: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><rect x="5" y="4" width="5" height="16"></rect><rect x="14" y="4" width="5" height="16"></rect></svg>'
};

// adding a global audio controller so all UI syncs
function syncAudio(entryId) {
    const audio = document.getElementById(
        entries.find(({id}) => id === entryId).audio.src
    );
    if (!audio) return;

    const playing = !audio.paused;

    const vessel = document.querySelector(`.vessel[data-id="${entryId}"]`);
    if (vessel) {
        vessel.classList.toggle('active', playing);
    };

    // set play/pause icon in panel
    if (openPanel) {
        const openIcon = openPanel.querySelector(`.text-panel[data-id="${entryId}"] .panel-play-pause`);
        if(openIcon){
            if (playing) {
                openIcon.innerHTML = icons.pause;
            } else {
                openIcon.innerHTML = icons.play;
            }
        }
    }

    // play/pause all
    const allAudio = document.querySelectorAll('audio');
    const anyPlaying = [...allAudio].some(a => !a.paused);
    if (anyPlaying) {
        button.textContent = 'pause all';
    } else {
        button.textContent = 'play all';
    }
}

// entries are in data.js!

entries.forEach(async function (entry) {
  const vessel = await createVessel(entry);

  vessel.addEventListener('click', function () {
    const audio = document.getElementById(vessel.dataset.audio);

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
  });
});

//moved preloading images up here
const loaded = new Map();

entries.forEach(function(entry) {
    if(!entry.text.image) return;

    const preload = new Image();
    const promise = new Promise(function(resolve) {
        preload.onload = function() {
            let orientation;
            if (preload.naturalWidth >= preload.naturalHeight) {
                orientation = 'landscape';
            } else {
                orientation = 'portrait';
            }

            resolve({
                src: entry.text.image,
                orientation: orientation
            })
        }
    })
    preload.src = entry.text.image;
    loaded.set(entry.id, promise);
})

//VESSELS - loading, styles, fills, etc.

async function createVessel(entry) {
    const shape = document.createElement('div');

    shape.classList.add('vessel');
    shape.dataset.id = entry.id;
    shape.dataset.audio = entry.audio.src;
    
    const pause = document.createElement('div');
    pause.classList.add('pauseLabel');
    pause.innerHTML = icons.pause;

    shape.appendChild(pause);

    // making fills + outlines
    const filled = document.createElement('div');
    filled.classList.add('vessel-fill');
    const fillshape = await fetch(entry.vessel.fill);
    filled.innerHTML = await fillshape.text();
    
    const outline = document.createElement('div');
    outline.classList.add('vessel-outline');
    const outlineshape = await fetch(entry.vessel.outline);
    outline.innerHTML = await outlineshape.text();

    const audio = document.createElement('audio');
    audio.src = entry.audio.src;
    audio.id = entry.audio.src;
    audio.classList.add('audio');
    shape.dataset.audio = entry.audio.src;

    audio.addEventListener('play', () => syncAudio(entry.id));
    audio.addEventListener('pause', () => syncAudio(entry.id));

    shape.appendChild(filled);
    shape.appendChild(outline);
    shape.appendChild(audio);

    //styles
    shape.style.left = entry.vessel.x + '%';
    shape.style.top = entry.vessel.y + '%';
    shape.style.width = entry.vessel.width + 'px';
    shape.style.setProperty('--vessel-color', entry.vessel.fillColor);
    shape.style.setProperty('--tilt', entry.vessel.tilt + 'deg');

    //hover labels
    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = entry.text.label;

    shape.appendChild(label);

    table.appendChild(shape);

    //optional?? respective rows popping up when highlighted
    const row = document.querySelector(`.toc-entry[data-id="${entry.id}"]`)
    shape.addEventListener('mouseenter', function() {
        row.classList.add('highlighted');
        /*row.style.paddingBottom = 'calc(4.3rem + 100px)';
        row.style.marginBottom = '-100px'*/
    })
    shape.addEventListener('mouseleave', function() {
        row.classList.remove('highlighted');
        /*row.style.paddingBottom = '';
        row.style.marginBottom = '';*/
    })

    return shape;
}

let openPanel = null;

//fetching PLAY and PAUSE all button
const button = document.getElementById('play-pause-button');

button.addEventListener('click', () => {
    const audios = document.querySelectorAll('audio');
    const anyPlaying = [...audios].some(audio => !audio.paused);

    if(anyPlaying) {
        audios.forEach(audio => audio.pause());
    } else {
        audios.forEach(audio => audio.play());
    }
  });

//creating TABLE OF CONTENTS
const t = [...entries].sort((a, b) => a.order - b.order);

t.forEach(function (entry, i) {
    const row = createRow(entry, i);
    toc.appendChild(row);
})

function createRow(entry, index){
    const row = document.createElement('a');
    row.href = `#${entry.id}`;
    row.classList.add('toc-entry');
    row.dataset.id = entry.id;

    const icon = document.createElement('div');
    icon.classList.add('vessel-icon');

    fetch(entry.vessel.outline)
        .then(response => response.text())
        .then(svgText => {
            icon.innerHTML = svgText;
        });

    /*const img = document.createElement('img');
    img.src = entry.vessel.outline;
    icon.appendChild(img);*/

    const title = document.createElement('div');
    title.classList.add('entry-title');
    title.textContent = entry.text.title;

    row.appendChild(icon);
    row.appendChild(title);

    //css
    row.style.backgroundColor = entry.text.bgColor;
    row.style.zIndex = String(index + 1);
    row.style.setProperty('--toc-tilt', entry.text.tilt + 'deg');
    row.style.setProperty('--toc-translate', entry.text.transform + '%');

    //combined with .toc-entry:hover in style.css

    row.addEventListener('mouseenter', function() {
        row.style.paddingBottom = 'calc(4.3rem + 100px)';
        row.style.marginBottom = '-100px'
    })
    
    row.addEventListener('mouseleave', function() {
        row.style.paddingBottom = '';
        row.style.marginBottom = '';
    })

    return row;

}

//opening text panels

async function openText(entryId){
    closeText();

    const entry = entries.find(({id}) => id === entryId)

    //controls hookup to audio
    const audio = document.getElementById(entry.audio.src);
    if(audio && audio.paused) {
        audio.play();
    }

    const overlay = document.createElement('div');
    overlay.classList.add('panel-overlay');

    const panel = document.createElement('div');
    panel.classList.add('text-panel');
    panel.dataset.id = entry.id;
    // panel.style.backgroundColor = entry.text.bgColor;
    panel.style.setProperty('--bgColor', entry.text.bgColor);
    panel.style.setProperty('--toc-tilt', entry.text.tilt + 'deg');

    const header = document.createElement('div');
    header.classList.add('text-header');

    const playPauseIcon = document.createElement('button');
    playPauseIcon.classList.add('panel-play-pause');
    playPauseIcon.setAttribute('aria-label', 'Play/pause audio');
    if (audio && !audio.paused) {
        playPauseIcon.innerHTML = icons.pause;
    } else {
        playPauseIcon.innerHTML = icons.play;
    }

    playPauseIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!audio) return;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    header.appendChild(playPauseIcon);

    const heading = document.createElement('h2');
    heading.textContent = entry.text.title;
    header.appendChild(heading);

    const byline = document.createElement('h3');
    byline.textContent = entry.text.author;
    header.appendChild(byline);

    //x out
    const close = document.createElement('a');
    close.href = '#';
    close.classList.add('close-button');
    close.setAttribute('aria-label', 'Close');

    const icon = document.createElement('img');
    icon.src = '/x.svg';
    close.appendChild(icon);
    
    panel.appendChild(close);
    panel.appendChild(header);

    if(entry.text.image){
        const image = document.createElement('div');
        image.classList.add('header-image');
        panel.appendChild(image);

        loaded.get(entry.id).then(function(result){
            image.classList.add(result.orientation);
            
            const img = document.createElement('img');
            img.src = result.src;
            img.alt = ''; // ADD IN ALT TEXT HERE FROM DATA JS LATER
            image.appendChild(img);
        })
    }

    const body = document.createElement('div');
    body.classList.add('text-body');
    body.innerHTML = await (await fetch(entry.text.body)).text();
    
    panel.appendChild(body);

    overlay.appendChild(panel);

    document.body.appendChild(overlay);
    document.body.classList.add('panel-open');

    if (window.matchMedia('(min-width:769px)').matches){
        overlay.addEventListener('click', function(e){
            if (e.target !== overlay) return;
            location.hash = '';
        });
    }

    openPanel = overlay;
}

function closeText(){
    if (openPanel) {

        const mobile = window.matchMedia('(max-width: 768px)').matches;

        if (mobile) {
            const panelId = openPanel.querySelector('.text-panel').dataset.id;
            const entry = entries.find(({id}) => id === panelId);
            const audio = document.getElementById(entry.audio.src);
            if(audio && !audio.paused){
                audio.pause();
            }
        }

        openPanel.remove();
        openPanel = null;
        document.body.classList.remove('panel-open');
    }
}

addEventListener("hashchange", toggle)

addEventListener("load", toggle)

function toggle() {
    const match = document.URL.match(/#(.*)/)
    const entryId = match && match[1];
    if (entryId) openText(entryId);
    else closeText();
}
