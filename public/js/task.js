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

    // Vis filnavne når filer vælges

    const fileInputs = document.querySelectorAll('.imageInput');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileNameSpan = this.parentElement.querySelector('.fileName');
            
            if (this.files.length > 0) {
                if (this.files.length === 1) {
                    fileNameSpan.textContent = this.files[0].name;
                } else {
                    fileNameSpan.textContent = `${this.files.length} filer valgt`;
                }
            } else {
                fileNameSpan.textContent = 'Ingen filer valgt';
            }
        });
    });

});