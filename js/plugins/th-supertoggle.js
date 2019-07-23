// TH SuperToggle
// Manipulate Dropdowns, Mobile submenus, Accordions & Tabs
// For tabs: Enclose all tab toggle buttons in .tab-nav
// Based on https://codepen.io/anon/pen/qGOxBG
document.addEventListener('click', function (event) {

    // Exit if clicked element isn't a dropdown or panel toggle button
    if ( !event.target.classList.contains('dropdown-toggle') && !event.target.classList.contains('panel-toggle') ) return;

    // Set up variables
    var toggle = event.target;
    var content, panels, selected;

    // Get parent element
    var parent = toggle.parentElement.parentElement;

    // Get the target content
    if ( toggle.classList.contains('dropdown-toggle') ) {
        content = toggle.nextElementSibling;
        if (!content) return;
    } else if ( toggle.classList.contains('panel-toggle') ) {
        content = document.querySelector(toggle.hash);
        if (!content) return;
    } else { return; }

    // Prevent default link behavior
    event.preventDefault();

    // If the content is already visible, close it and quit (unless it's a tab)
    if (content.classList.contains('active')) {
        if (!parent.classList.contains('tabs')) {
            content.classList.remove('active');
            toggle.classList.remove('selected');
        }
        return;
    }

    // Get all open content for the active group, loop through it, and close it
    if ( toggle.classList.contains('dropdown-toggle') ) {
        panels = parent.querySelectorAll('.dropdown.active');
        selected = parent.querySelectorAll('.dropdown-toggle.selected');
    } else if ( toggle.classList.contains('panel-toggle') ) {
        panels = parent.querySelectorAll('.panel-content.active');
        selected = parent.querySelectorAll('.panel-toggle.selected');
    }

    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.remove('active');
        selected[i].classList.remove('selected');
    }

    // Toggle our content
    content.classList.toggle('active');

    // Highlight selected section
    toggle.classList.toggle('selected');
});


// test
// This is the important part!

function collapseSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    
    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
  }
  
  function expandSection(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';
  
    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
      // remove this event listener so it only gets triggered once
      element.removeEventListener('transitionend', arguments.callee);
      
      // remove "height" from the element's inline styles, so it can return to its initial value
      element.style.height = null;
    });
    
    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
  }
  
  document.querySelector('#toggle-button').addEventListener('click', function(e) {
    var section = document.querySelector('.section.collapsible');
    var isCollapsed = section.getAttribute('data-collapsed') === 'true';
      
    if(isCollapsed) {
      expandSection(section)
      section.setAttribute('data-collapsed', 'false')
    } else {
      collapseSection(section)
    }
  });