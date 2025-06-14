// Manejo de la lista de formularios y carga de embed

document.addEventListener('DOMContentLoaded', function() {
    const forms = [
        {
            id: 'inspeccion',
            title: 'INSPECCIÓN',
            embed: 'https://tally.so/embed/nrbv8o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
        },
        {
            id: 'for2',
            title: 'FOR2',
            embed: 'https://tally.so/embed/nrbv8o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
        },
        {
            id: 'for3',
            title: 'FOR3',
            embed: 'https://tally.so/embed/nrbv8o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
        }
    ];

    const listContainer = document.getElementById('form-list');
    const formContainer = document.getElementById('form-container');

    if (!listContainer || !formContainer) return;

    forms.forEach((form, index) => {
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.textContent = form.title;
        button.addEventListener('click', () => loadForm(form, button));
        listContainer.appendChild(button);
        if (index === 0) {
            loadForm(form, button);
        }
    });

    function loadForm(form, button) {
        const active = listContainer.querySelector('.tab-button.active');
        if (active) {
            active.classList.remove('active');
        }
        button.classList.add('active');

        formContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.setAttribute('data-tally-src', form.embed);
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '499');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('marginheight', '0');
        iframe.setAttribute('marginwidth', '0');
        iframe.setAttribute('title', form.title);
        formContainer.appendChild(iframe);

        if (typeof Tally !== 'undefined') {
            Tally.loadEmbeds();
        }
    }
});
