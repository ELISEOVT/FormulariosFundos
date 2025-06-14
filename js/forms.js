// Manejo de la lista de formularios y carga de embed

document.addEventListener('DOMContentLoaded', function() {
    const forms = [
        {
            id: 'for1',
            title: 'FOR1',
            embed: 'https://tally.so/embed/nrbv8o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
        },
        {
            id: 'for2',
            title: 'FOR2',
            embed: ''
        },
        {
            id: 'for3',
            title: 'FOR3',
            embed: ''
        }
    ];

    const tabsContainer = document.getElementById('tabs-container');
    const formContainer = document.getElementById('form-container');

    if (!tabsContainer || !formContainer) return;

    forms.forEach((form, index) => {
        const button = document.createElement('button');
        button.className = 'tab-button';
        button.textContent = form.title;
        button.addEventListener('click', () => loadForm(form, button));
        tabsContainer.appendChild(button);
        if (index === 0) {
            loadForm(form, button);
        }
    });

    function loadForm(form, button) {
        const active = tabsContainer.querySelector('.tab-button.active');
        if (active) {
            active.classList.remove('active');
        }
        button.classList.add('active');

        formContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.setAttribute('data-tally-src', form.embed);
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '500');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('marginheight', '0');
        iframe.setAttribute('marginwidth', '0');
        iframe.setAttribute('title', form.title);
        formContainer.appendChild(iframe);
        if (window.Tally) {
            Tally.loadEmbeds();
        }
    }
});
