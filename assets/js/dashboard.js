function toggleSidebar() {
  var sidebar = document.getElementById('sidebar');
  var sidebarWidth = sidebar.offsetWidth;

  if (sidebar.style.left === '0px') {
    sidebar.style.left = -sidebarWidth + 'px'; // Close sidebar
  } else {
    sidebar.style.left = '0px'; // Open sidebar
  }
}

function showPage(pageId) {
  var pages = document.getElementsByClassName('page');
  for (var i = 0; i < pages.length; i++) {
    pages[i].classList.remove('active');
  }
  document.getElementById(pageId).classList.add('active');
}


//profile page functionalities
function toggleEdit(fieldId) {
  var field = document.getElementById(fieldId);
  var editButton = field.nextElementSibling;
  var saveButton = document.getElementById('saveProfileBtn');

  if (field.readOnly) {
    field.readOnly = false;
    editButton.innerText = 'Cancel';
    saveButton.style.display = 'inline-block';
  } else {
    field.readOnly = true;
    editButton.innerText = 'Edit';
    // Check if any field is still in edit mode
    var fields = document.querySelectorAll('.profile-info input, .profile-info textarea');
    var isEditing = Array.from(fields).some(function(field) {
      return !field.readOnly;
    });
    if (!isEditing) {
      saveButton.style.display = 'none';
    }
    // Restore original value if user cancels edit
    if (fieldId === 'firstname') field.value = 'John';
    else if (fieldId === 'lastname') field.value = 'Doe';
    else if (fieldId === 'address') field.value = '123 Main St, Anytown';
    else if (fieldId === 'phone') field.value = '555-123-4567';
  }
}

function saveProfile() {
  var firstname = document.getElementById('firstname').value;
  var lastname = document.getElementById('lastname').value;
  var address = document.getElementById('address').value;
  var phone = document.getElementById('phone').value;

  // Perform save operation here, for example, updating user data on the server

  // After saving, make fields read-only again
  var fields = document.querySelectorAll('.profile-info input, .profile-info textarea');
  fields.forEach(function(field) {
    field.readOnly = true;
  });

  // Hide save button after saving
  var saveButton = document.getElementById('saveProfileBtn');
  saveButton.style.display = 'none';
}
