function toggleActive(event) {
    var links = document.querySelectorAll('.sidebar-link');
    links.forEach(function(link) {
      link.classList.remove('active');
    });
    event.target.classList.add('active');
  }
  
  function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var isOpen = sidebar.style.left === '0px';
    sidebar.style.left = isOpen ? '-180px' : '0';
  }
  