btn_menu = document.querySelector('.btn_menu');
menu_anims = document.querySelectorAll('.menu_anim');
let menu_aberto = false

btn_menu.addEventListener('click', () => {
    menu = document.querySelector('.menu');

    if (menu_aberto == true) {
        menu.style.display = 'none';
        menu_aberto = false;
        fechaMenu();
    } else {
        menu.style.display = 'block';
        menu_aberto = true;
        mostrarMenu();
    }

});

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let mostrarMenu = async () => {
    for (i = 0; i < menu_anims.length; i++) {
        await sleep(50)
        menu_anims[i].style.transform = 'translateX(0px)';
        menu_anims[i].style.backgroundColor = 'var(--white)';
        menu_anims[i].style.color = 'var(--blue2)';
    }
}

let fechaMenu = () => {
    for (i = 0; i < menu_anims.length; i++) {
        menu_anims[i].style.transform = 'translateX(-300px)';
        menu_anims[i].style.backgroundColor = 'transparent';
        menu_anims[i].style.color = 'transparent';
    }
}