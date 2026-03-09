const card = document.querySelector('.idol-card');
let isDragging = false;
let startX, startY;
let rotateX = 0;
let rotateY = 0;


document.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
    card.style.transition = 'none'; 
});


document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    
    const deltaX = e.pageX - startX;
    const deltaY = e.pageY - startY;


    const currentY = rotateY + deltaX * 0.2; 
    const currentX = rotateX - deltaY * 0.2;

    card.style.transform = `rotateY(${currentY}deg) rotateX(${currentX}deg)`;
});


document.addEventListener('mouseup', () => {
    isDragging = false;
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

const searchBtn =   document.getElementById('search-btn');
const stickerAlbum = document.getElementById('sticker-album');
const idolInput = document.getElementById('idol-search');

searchBtn.addEventListener('click', async () => {
    const query = idolInput.value;
    if(!query) return;

    const imageUrl = `https://loremflickr.com/300/400/${query},kpop/all`;
    const newCard = document.createElement('div');
    newCard.classList.add('idol-card');
    newCard.innerHTML = `
        <div class="image-container">
            <img src="${imageUrl}" alt="${query}">
        </div>
        <div class="info">
            <span class="group-tag">K-Pop</span>
            <h2>${query}</h2>
        </div>
    `;
    stickerAlbum.appendChild(newCard);
    idolInput.value = "";

    addTiltEffect(newCard);
});

function addTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 10;
        const rotateY = (x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        card.style.transition = "transform 0.5s ease";
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = "none";
    });
}
