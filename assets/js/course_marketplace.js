document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const enrollButtons = document.querySelectorAll('.course-card .enroll');
    console.log(enrollButtons);

    enrollButtons.forEach(button => {
        button.addEventListener('click', () => {
          
            window.location.href = 'enroll_page.html';
        });
    });
});

let courses = null;
async function getCourses(){
    const accessToken = localStorage.getItem('accessToken');
    return await fetch('https://api.learnnet.africa/api/v1/listing/courses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })
      .then(response => {

        if(!response.ok){
            
        }
        return response.json();
      })
      .then(data =>{
        console.log(data.data.results);
         return data.data.results;
         
      })
      .catch(error => console.error('Error:', error));
      
}

let currentPage = 1;
const perPage = 6;

function renderCourses(page) {
    const startIndex = (page - 1) * perPage;
    const selectedCourses = courses.slice(startIndex, startIndex + perPage);

    const container = document.getElementById('courseContainer');
    container.innerHTML = ""; // Clear previous content

    selectedCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
        
       <img src="${course.banner}" class="course-image"></img>
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <h1 style="display:none">${course.price}</h1>
                <p>${course.description}</p>

                <button class="enroll btn">Enroll Now</button>
                <hr>
                <button data-title="${course.title}" name="share-btn" class="share btn" style="display:none">Share</button>
                <hr>
                <div class="card-footer d-flex justify-content-between align-items-center">
                <h4>GHS ${course.price}</h4>
                <h5 style="display: none;">${course.id}</h5>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                <h5>Commission: 50%</h6>
                </div>
            </div>
        
        `;
        container.appendChild(courseCard);
    });
    addEnrollListeners(); // Add event listeners after rendering
}

function changePage(direction) {
    currentPage += direction;
    const totalPages = Math.ceil(courses.length / perPage);
    currentPage = Math.max(1, Math.min(currentPage, totalPages)); // Keep within bounds
    document.getElementById('currentPage').textContent = currentPage;

    // Enable/disable buttons
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;

    renderCourses(currentPage);
}

window.onload =  async function() {
    courses = await getCourses();
    document.getElementById('totalPages').textContent = Math.ceil(courses.length / perPage);
    changePage(0); // Load initial page
};

//Search functionality
function searchCourses() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchInput) ||
        course.description.toLowerCase().includes(searchInput)
    );

    renderCoursesSpecific(filteredCourses);
}

function renderCoursesSpecific(coursesToRender) {
    const container = document.getElementById('courseContainer');
    container.innerHTML = ""; // Clear previous content

     // Check if there are no courses matching the search
    if (coursesToRender.length === 0) {
        document.getElementById('noResultsMessage').style.display = 'block';
        // Hide pagination
        document.querySelector('.pagination').style.display = 'none';
        return; // Exit the function
    } else {
        document.getElementById('noResultsMessage').style.display = 'none'; // Hide message if there are results
    }

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.image}" class="course-image"></img>
            <div class="course-info">
                <h3>${course.title}</h3>
                <h1 style="display=none">${course.price}</h1>
                <p>${course.description}</p>
                <button class="btn">Enroll Now</button>
            </div>
        `;
        container.appendChild(courseCard);
    });

    addEnrollListeners(); // Add event listeners after rendering

    // Update pagination visibility and info based on search results
    document.querySelector('.pagination').style.display = coursesToRender.length > 0 ? 'flex' : 'none';
    document.getElementById('totalPages').textContent = Math.ceil(coursesToRender.length / perPage);
    document.getElementById('currentPage').textContent = 1;
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = coursesToRender.length <= perPage;
}

function addEnrollListeners() {
    const enrollButtons = document.querySelectorAll('.course-card .enroll');

    enrollButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseCard = button.closest('.course-card');
            const course = {
                title: courseCard.querySelector('h3').textContent,
                description: courseCard.querySelector('p').textContent,
                image: courseCard.querySelector('img').src,
                price: courseCard.querySelector('h1').textContent,
                id: courseCard.querySelector('h5').textContent
            };
            localStorage.setItem('course', JSON.stringify(course));
            window.location.href = 'enroll_page.html';

        });
    });
}
