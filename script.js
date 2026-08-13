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
        row.style.paddingBottom = 'calc(4.3rem + 100px)';
        row.style.marginBottom = '-100px'
    })
    shape.addEventListener('mouseleave', function() {
        row.classList.remove('highlighted');
        row.style.paddingBottom = '';
        row.style.marginBottom = '';
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
    const row = document.createElement('button');
    row.type = 'button';
    row.classList.add('toc-entry');
    row.dataset.id = entry.id;

    const icon = document.createElement('div');
    icon.classList.add('vessel-icon');

    const img = document.createElement('img');
    img.src = entry.vessel.outline;
    icon.appendChild(img);

    const title = document.createElement('div');
    title.classList.add('entry-title');
    title.textContent = entry.text.title + ' by ' + entry.text.author;

    row.appendChild(icon);
    row.appendChild(title);

    //css
    row.style.backgroundColor = entry.text.bgColor;
    row.style.zIndex = String(index + 1);
    row.style.setProperty('--toc-tilt', entry.text.tilt + 'deg');
    row.style.setProperty('--toc-translate', entry.text.transform + '%');

    row.addEventListener('click', function() {
        openText(entry);
    });

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

async function openText(entry){
    closeText();

    const overlay = document.createElement('div');
    overlay.classList.add('panel-overlay');

    const panel = document.createElement('div');
    panel.classList.add('text-panel');
    panel.dataset.id = entry.id;
    panel.style.backgroundColor = entry.text.bgColor;

    const header = document.createElement('div');
    header.classList.add('text-header');

    const heading = document.createElement('h2');
    const title = entry.text.title;
    heading.textContent = title + ' by ' + entry.text.author;
    header.appendChild(heading);

    //x out
    const close = document.createElement('button');
    close.type = 'button';
    close.classList.add('close-button');
    close.setAttribute('aria-label', 'Close');

    const icon = document.createElement('img');
    icon.src = '/x.svg';
    close.appendChild(icon);
    
    close.addEventListener('click', closeText);
    panel.appendChild(close);

    const body = document.createElement('div');
    body.classList.add('text-body');
    body.innerHTML = await (await fetch(entry.text.body)).text();
    
    panel.appendChild(header);
    panel.appendChild(body);

    overlay.appendChild(panel);

    document.body.appendChild(overlay);
    document.body.classList.add('panel-open');

    openPanel = overlay;
}

function closeText(){
    if (openPanel) {
        openPanel.remove();
        openPanel = null;
        document.body.classList.remove('panel-open');
    }
}