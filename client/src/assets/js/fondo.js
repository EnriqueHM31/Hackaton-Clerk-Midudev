window.addEventListener('load', () => {
    const fondo = document.querySelector('#fondo');

    const COLORES = ['#3357FF', '#FF33A1', '#A133FF', '#3357FF', '#3357FF', '#FF33A1', '#A133FF'];
    const posiciones = [
        { top: '15%', left: '5%' },
        { top: '45%', left: '30%' },
        { top: '75%', left: '12%' },
        { top: '88%', left: '42%' },
        { top: '32%', left: '50%' },
        { top: '69%', left: '85%' },
        { top: '12%', left: '80%' },
    ];

    for (let i = 0; i < 7; i++) {
        const circulo = document.createElement('div');
        circulo.classList.add('circulo');
        circulo.style.backgroundColor = COLORES[i];
        circulo.style.position = 'absolute';
        circulo.style.top = posiciones[i].top;
        circulo.style.left = posiciones[i].left;
        circulo.setAttribute('data-aos', 'fade-in');
        circulo.setAttribute('data-aos-delay', `${i * 100 + 100}`);
        circulo.setAttribute('data-aos-duration', '1000');
        circulo.setAttribute('data-aos-easing', 'ease-in-out');
        fondo.appendChild(circulo);
    }
});