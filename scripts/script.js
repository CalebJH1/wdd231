const courses = [
  {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
      technology: [
          'Python'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
      technology: [
          'HTML',
          'CSS'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
      technology: [
          'Python'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
      technology: [
          'C#'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: true
  },
]

const filterButtons = document.querySelectorAll('.filter');
const courseContainer = document.querySelector('.courses');
const creditDisplay = document.querySelector('.number-of-credits');

filterButtons.forEach(filterButton => {
  filterButton.addEventListener('click', () => {
    filterCourses(filterButton.textContent);
  })
});



function displayCourseButtons(courses) {
  courseContainer.innerHTML = '';
  courses.forEach(course => {
    if (course.completed) {
      courseContainer.innerHTML += `<button class="course completed">${course.subject} ${course.number}</button>`
    } else {
      courseContainer.innerHTML += `<button class="course">${course.subject} ${course.number}</button>`;
    }
  });

  const courseButtonList = document.getElementsByClassName('course');
  
  for (let i = 0; i < courseButtonList.length; i++) {
    courseButtonList[i].addEventListener('click', () => {
      displayModal(courses[i]);
    });
  }
}

function displayTotalCredits(courses) {
    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
}
  

function filterCourses(category) {
  if (category === 'All') {
    displayCourseButtons(courses);
    displayTotalCredits(courses);
  } else {
    const filteredCourses = courses.filter(course => course.subject === category);
    displayCourseButtons(filteredCourses);
    displayTotalCredits(filteredCourses);
  }
}

function displayModal(course) {
  const modal = document.querySelector('dialog');
  modal.innerHTML = '';
  modal.innerHTML = `
    <button id="closeModal">&#x2715;</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  modal.showModal();

  document.getElementById('closeModal').addEventListener('click', () => {
    modal.close();
  });
  // creditDisplay.textContent = `Credits for ${subject}${number} ${title}: ${credits}.`;
}

displayCourseButtons(courses);
displayTotalCredits(courses);

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;



navButton = document.querySelector('.navigation-button');
navContainer = document.getElementById('mobile-view');
navButton.innerHTML = `&#9776;`
navButton.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  navButton.classList.toggle('active');
  if (navButton.classList.contains('active')) {
    navButton.textContent = 'X';
  } else {
    navButton.innerHTML = `&#9776;`;
  }
});

  
  
  
  
