//v4 setup

window.addEventListener('load', setTop);
window.addEventListener('resize', setTop);
window.addEventListener('load', superToggle);
document.addEventListener('scroll', stickyHead);

// Push content down by height of header
function setTop() {
    let header = document.getElementById('header');
    document.getElementById('template-wrap').style.paddingTop = header.offsetHeight + 'px';
}

// Stick header to top
function stickyHead() {
    let header = document.getElementById('header');
    if (window.pageYOffset > header.offsetHeight) {
        header.classList.add('fixed-head');
    } else {
        header.classList.remove('fixed-head');
    }
}

// Manipulate Dropdowns, Mobile submenus, Accordions & Tabs
// For tabs: Enclose all tab toggle buttons in .tab-nav
// Based on https://codepen.io/anon/pen/qGOxBG
function superToggle() {
    var supertoggles = document.querySelectorAll('.super-toggle');
    for (var i = 0; i < supertoggles.length; i++) {
        supertoggles[i].addEventListener('click', function (event) {
            // Set up variables
            var toggle = event.target;
            var content, panels, selected;

            // Get parent element
            var parent = toggle.parentElement.parentElement;

            // Get the target content
            if (parent.classList.contains('tabs')) {
                content = document.querySelector(toggle.hash);
            } else {
                content = toggle.nextElementSibling;
            }
            if (!content) return;

            // Prevent default link behavior
            event.preventDefault();

            // Functions
            function openPanel() {
                content.classList.toggle('active');
                toggle.classList.toggle('selected');
            }
            function closePanel() {
                content.classList.remove('active');
                toggle.classList.remove('selected');
            }
            function closeOthers() {
                panels = parent.querySelectorAll('.super-content.active');
                selected = parent.querySelectorAll('.super-toggle.selected');

                for (var n = 0; n < panels.length; n++) {
                    panels[n].classList.remove('active');
                    selected[n].classList.remove('selected');
                }
            }

            var isOpen = content.classList.contains('active') === true;
            var isTab = parent.classList.contains('tabs') === true;
            console.log('isOpen: ' + isOpen);
            console.log('isTab: ' + isTab);

            if (isOpen) {
                if (!isTab) {
                    closePanel();
                }
                return;
            }

            // Get all open content
            closeOthers();

            // Toggle our content
            openPanel();
        });
    }

}