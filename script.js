const emojis = document.querySelectorAll('.emoji');
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clear-button');
const downloadButton = document.getElementById('download-button');

emojis.forEach(emoji => {
    emoji.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.textContent);
    });
});

canvas.addEventListener('dragover', e => {
    e.preventDefault();
});

canvas.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (data) {
        const span = document.createElement('span');
        span.className = 'dropped-emoji';
        span.textContent = data;
        span.style.left = e.offsetX + 'px';
        span.style.top = e.offsetY + 'px';
        span.addEventListener('dblclick', () => {
            const size = parseFloat(window.getComputedStyle(span).fontSize);
            span.style.fontSize = size + 10 + 'px';
        });
        span.addEventListener('wheel', e => {
            e.preventDefault();
            const size = parseFloat(window.getComputedStyle(span).fontSize);
            const newSize = size + (e.deltaY < 0 ? 2 : -2);
            span.style.fontSize = Math.max(10, newSize) + 'px';
        });
        canvas.appendChild(span);
    }
});

clearButton.addEventListener('click', () => {
    canvas.innerHTML = '';
});

downloadButton.addEventListener('click', () => {
    if (typeof html2canvas === 'undefined') return;
    html2canvas(canvas).then(c => {
        const link = document.createElement('a');
        link.download = 'emoji-mood-board.png';
        link.href = c.toDataURL('image/png');
        link.click();
    });
});
