document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordionHeader');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle active class på headeren
            this.classList.toggle('active');
            
            // Find det tilhørende content
            const content = this.nextElementSibling;
            
            // Toggle visning af content
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
});