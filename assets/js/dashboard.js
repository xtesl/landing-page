function toggleActive(event) {
    var links = document.querySelectorAll('.sidebar-link');
    links.forEach(function(link) {
      link.classList.remove('active');
    });
    event.target.classList.add('active');
  }
  