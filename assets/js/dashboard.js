function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var sidebarWidth = sidebar.offsetWidth;
  
    if (sidebar.style.left === '0px') {
      sidebar.style.left = -sidebarWidth + 'px'; // Close sidebar
    } else {
      sidebar.style.left = '0px'; // Open sidebar
    }
  }
  
  function selectLink(link) {
    var links = document.getElementsByClassName('sidebar-link');
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    link.classList.add('active');
  }
  