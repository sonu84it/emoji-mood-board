const emojis = document.querySelectorAll('.emoji');
const canvas = document.getElementById('canvas');
const clearButton = document.getElementById('clear-button');

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
        canvas.appendChild(span);
    }
});

clearButton.addEventListener('click', () => {
    canvas.innerHTML = '';
});
