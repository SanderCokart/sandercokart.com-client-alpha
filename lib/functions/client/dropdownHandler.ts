export const dropdownHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isDropdownButton = target.matches('[data-dropdown-button]');

    if (!isDropdownButton && target.closest('[data-dropdown]') !== null) return;
    let currentDropdown: HTMLElement | null = null;
    if (isDropdownButton) {
        currentDropdown = target.closest('[data-dropdown]');
        //toggle width to data-expanded-width attribute if current style is auto with ternary
        if (currentDropdown) {
            currentDropdown.classList.toggle('revealDropdown');
            console.log([
                target.getAttribute('data-expanded-width'),
                target.getAttribute('data-default-width'),
                target.style.width,
            ]);
            target.style.width = (target.style.width === target.getAttribute('data-default-width')) ?
                                 (target.getAttribute('data-default-width') as string)
                                                                                                    :
                                 (target.getAttribute('data-expanded-width') as string);
        }
    }

    document.querySelectorAll('[data-dropdown].revealDropdown').forEach(dropdown => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('revealDropdown');
    });
};