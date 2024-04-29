// File: assets/js/main.js
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});



// Sample course data
const courses = [
    { title: "Introduction to Programming", description: "Learn the basics of programming through easy to follow lessons and examples.", image: "course-image.jpg" },
    { title: "Advanced JavaScript", description: "Dive deep into JavaScript with advanced concepts and frameworks.", image: "course-image.jpg" },
    { title: "Web Development", description: "Learn to build and deploy websites from scratch.", image: "course-image.jpg" },
    { title: "Data Analysis with Python", description: "Analyze data effectively using Python and libraries like Pandas.", image: "course-image.jpg" },
    { title: "Machine Learning Essentials", description: "Start your journey into the world of AI and machine learning.", image: "course-image.jpg" },
    { title: "UI/UX Design Fundamentals", description: "Master the basics of designing engaging user interfaces and experiences.", image: "course-image.jpg" },
    { title: "Project Management", description: "Skills for managing projects efficiently.", image: "course-image.jpg" },
    { title: "Digital Marketing", description: "Strategies and tools for effective digital marketing.", image: "course-image.jpg" },
    { title: "Blockchain Basics", description: "Understand blockchain technology and its applications.", image: "course-image.jpg" },
    { title: "Cybersecurity Principles", description: "Protect systems and data from cyber threats.", image: "course-image.jpg" }
];
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
            <img src="${course.image}" alt="Course Image" class="course-image">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button class="btn">Enroll Now</button>
            </div>
        `;
        container.appendChild(courseCard);
    });
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

window.onload = function() {
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

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <img src="${course.image}" alt="Course Image" class="course-image">
            <div class="course-info">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <button class="btn">Enroll Now</button>
            </div>
        `;
        container.appendChild(courseCard);
    });

    // Update pagination visibility and info based on search results
    document.querySelector('.pagination').style.display = coursesToRender.length > 0 ? 'flex' : 'none';
    document.getElementById('totalPages').textContent = Math.ceil(coursesToRender.length / perPage);
    document.getElementById('currentPage').textContent = 1;
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').disabled = coursesToRender.length <= perPage;
}
