// Smooth scroll to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
}

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  alert('Thank you for reaching out! I will get back to you soon.');
});
