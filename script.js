// Script to manage sticky header, smooth scrolling, and scroll animations
const overview = document.getElementById("overview");
const footer = document.querySelector('footer'); // Select the footer element

// Initial styles to ensure visibility
overview.classList.add("expanded");


// Handle scroll event for overview
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { // Adjust this value based on when you want the transition to occur
        overview.classList.add("collapsed");
        overview.classList.remove("expanded");
    } else {
        overview.classList.remove("collapsed");
        overview.classList.add("expanded");
    }
});


// Smooth scroll for overview links
document.querySelectorAll('nav.overview a').forEach(anchor => {
    // Only apply smooth scrolling to specific links, exclude home link
    if (anchor.getAttribute('href') !== "index.html") {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('nav.overview').offsetHeight;

            // Calculate the target position minus the navbar height
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

            // Scroll to the target element smoothly with an offset
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    }
});

// Animation on scroll
const features = document.querySelectorAll('.feature');
const about = document.querySelector('.about');
const cta = document.querySelector('.cta');

// IntersectionObserver for triggering animations when sections appear in view
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add("fade-in"); // Add fade-in class for CSS animations
            observer.unobserve(entry.target); // Unobserve after it's visible
        }
    });
}, {
    threshold: 0.2
});

// Observe all feature sections, about, cta sections, and the footer
features.forEach(feature => {
    observer.observe(feature);
});
observer.observe(about);
observer.observe(cta);
observer.observe(footer); // Add footer to the observer


// Function to open the modal
function openModal() {
    document.getElementById("registerModal").style.display = "block";
    document.body.style.overflow = 'hidden'; // Disable scrolling
}

// Function to close the modal
function closeModal() {
    document.getElementById("registerModal").style.display = "none";
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modal = document.getElementById("registerModal");
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}
