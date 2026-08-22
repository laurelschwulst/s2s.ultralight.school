const table = document.getElementById('vessel-table');
const toc = document.getElementById('toc');

// entries are in data.js!

entries.forEach(async function (entry) {
  const vessel = await createVessel(entry);

  vessel.addEventListener('click', function () {
    vessel.classList.toggle('active');
  });
});

//VESSELS - loading, styles, fills, etc.

async function createVessel(entry) {
    const shape = document.createElement('div');

    shape.classList.add('vessel');
    shape.dataset.id = entry.id;
    
    // making fills + outlines
    const filled = document.createElement('div');
    filled.classList.add('vessel-fill');
    const fillshape = await fetch(entry.vessel.fill);
    filled.innerHTML = await fillshape.text();
    
    const outline = document.createElement('div');
    outline.classList.add('vessel-outline');
    const outlineshape = await fetch(entry.vessel.outline);
    outline.innerHTML = await outlineshape.text();

    shape.appendChild(filled);
    shape.appendChild(outline);

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

    const img = document.createElement('img');
    img.src = entry.vessel.outline;
    icon.appendChild(img);

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

async function openText(entryId){
    closeText();

    const entry = entries.find(({id}) => id === entryId)
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
        
        const img = document.createElement('img');
        img.src = entry.text.image;
        img.alt = ''; // ADD IN ALT TEXT FIELD IN DATA JS LATER!!

        img.addEventListener('load', function(){
            if(img.naturalWidth >= img.naturalHeight){
                image.classList.add('landscape');
            } else {
                image.classList.add('portrait');
            }
        });

        image.appendChild(img);
        panel.appendChild(image);
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
