export function downloadResume() {
  const resumeContent = `================================================================================
SUJITH KUMAR CHINTHAGINJALA
Java Full Stack Developer
Location: Hyderabad, Telangana, 500071, India
Email: chinthaginjalasujithkumar@gmail.com
LinkedIn: https://www.linkedin.com/in/sujithkumarchinthaginjala
GitHub: https://github.com/sujithkumarchinthaginjala/
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
Passionate Java Full Stack Developer specializing in designing and implementing
scalable, production-grade enterprise web applications. Proficient in Java,
Spring Boot, RESTful Web Services, Angular 21, Vue 3, MySQL, and PostgreSQL.
Strong foundation in OOP principles, data structures, and database optimization.

CORE TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Backend:          Java (SE/EE), Spring Boot, Spring Data JPA, REST APIs, Microservices, JUnit
• Frontend:         Angular 21, Vue 3, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• Databases:        MySQL, PostgreSQL, Oracle SQL, Relational DB Design, Query Tuning
• Tools & DevOps:   Git, GitHub, Apache Maven, Postman, Docker, Agile/Scrum, VS Code, IntelliJ IDEA

PROFESSIONAL EXPERIENCE & TRAINEESHIP
--------------------------------------------------------------------------------
Java Full Stack Trainee / Software Engineer
INU Tech Solutions | 2024 – Present | Hyderabad, IN
• Developed end-to-end full stack web applications using Spring Boot and Angular 21 / Vue 3.
• Built secure, RESTful API endpoints handling complex business logic, CRUD operations, and pagination.
• Designed relational database schemas in MySQL/PostgreSQL with optimized indexes and foreign key constraints.
• Implemented client-side state management, responsive UI layouts, and reactive forms.
• Conducted unit testing with JUnit and API validation using Postman.

AI & Machine Learning Intern
Coincent | 2021 | Remote
• Developed computer vision models using Python, TensorFlow, and OpenCV.
• Preprocessed image data matrices and built Convolutional Neural Network (CNN) architectures.
• Documented model performance metrics and automated dataset pipelines.

EDUCATION
--------------------------------------------------------------------------------
Bachelor of Technology (B.Tech)
Annamacharya Institute of Technology and Sciences (AITS) | Graduated 2024
• CGPA: 8.5 / 10 (Academic Distinction)
• Focus: Computer Science Fundamentals, Data Structures, Java Programming, DBMS

CERTIFICATIONS & HONORS
--------------------------------------------------------------------------------
1. Certified Java Full Stack Engineer – INU Tech Solutions
2. Artificial Intelligence with Python Certificate – Coincent
3. B.Tech Engineering Degree with Distinction – AITS Rajampet
4. Oracle Java & Database Foundations Certificate
5. Agile Development & DevOps Workflows Certificate

================================================================================
`;

  // Create a Blob containing the text/plain or formatted resume
  const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Sujith_Kumar_Chinthaginjala_Resume.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function openPrintableResume() {
  const win = window.open('', '_blank');
  if (!win) {
    downloadResume();
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Sujith Kumar Chinthaginjala - Resume</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #1a1a1a;
          line-height: 1.6;
          margin: 0;
          padding: 40px;
          background-color: #fff;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        header {
          border-bottom: 2px solid #f05228;
          padding-bottom: 20px;
          margin-bottom: 25px;
        }
        h1 {
          font-size: 28px;
          margin: 0 0 5px 0;
          color: #111;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .subtitle {
          font-size: 16px;
          font-weight: 700;
          color: #f05228;
          margin-bottom: 10px;
        }
        .contact-info {
          font-size: 13px;
          color: #444;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        .contact-info a {
          color: #111;
          text-decoration: none;
          font-weight: 600;
        }
        h2 {
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #111;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
          margin-top: 25px;
          margin-bottom: 12px;
        }
        ul {
          margin: 5px 0 15px 20px;
          padding: 0;
        }
        li {
          margin-bottom: 6px;
          font-size: 13.5px;
        }
        .job-title {
          font-weight: 700;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }
        .company {
          color: #f05228;
          font-weight: 600;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 8px;
          font-size: 13px;
        }
        .skills-label {
          font-weight: 700;
          color: #333;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
        .actions {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
        }
        .btn {
          background: #f05228;
          color: #fff;
          border: none;
          padding: 10px 18px;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
        }
        .btn-sec {
          background: #222;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="actions no-print">
          <button class="btn" onclick="window.print()">Print / Save as PDF</button>
          <button class="btn btn-sec" onclick="window.close()">Close Window</button>
        </div>

        <header>
          <h1>SUJITH KUMAR CHINTHAGINJALA</h1>
          <div class="subtitle">Java Full Stack Developer</div>
          <div class="contact-info">
            <span>📍 Hyderabad, Telangana, 500071, India</span>
            <span>✉️ <a href="mailto:chinthaginjalasujithkumar@gmail.com">chinthaginjalasujithkumar@gmail.com</a></span>
            <span>🔗 <a href="https://www.linkedin.com/in/sujithkumarchinthaginjala" target="_blank">LinkedIn Profile</a></span>
            <span>💻 <a href="https://github.com/sujithkumarchinthaginjala/" target="_blank">GitHub Profile</a></span>
          </div>
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p style="font-size: 13.5px;">
            Passionate Java Full Stack Developer specializing in designing and implementing scalable, production-grade enterprise web applications. Proficient in Java, Spring Boot, RESTful Web Services, Angular 21, Vue 3, MySQL, and PostgreSQL. Strong foundation in object-oriented programming, clean code architecture, and database optimization.
          </p>
        </section>

        <section>
          <h2>Core Technical Skills</h2>
          <div class="skills-grid">
            <div class="skills-label">Backend:</div>
            <div>Java (SE/EE), Spring Boot, Spring Data JPA, REST APIs, Microservices, JUnit</div>
            <div class="skills-label">Frontend:</div>
            <div>Angular 21, Vue 3, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS</div>
            <div class="skills-label">Databases:</div>
            <div>MySQL, PostgreSQL, Oracle SQL, Relational DB Schema Design, Query Tuning</div>
            <div class="skills-label">Tools & DevOps:</div>
            <div>Git, GitHub, Apache Maven, Postman, Docker, Agile/Scrum, IntelliJ IDEA</div>
          </div>
        </section>

        <section>
          <h2>Experience & Traineeship</h2>
          <div style="margin-bottom: 15px;">
            <div class="job-title">
              <span>Java Full Stack Trainee / Software Developer</span>
              <span>2024 – Present</span>
            </div>
            <div class="company">INU Tech Solutions — Hyderabad, IN</div>
            <ul>
              <li>Engineered full stack web applications using Java 17, Spring Boot, Angular 21, and Vue 3.</li>
              <li>Architected secure RESTful APIs with validation, pagination, and structured error responses.</li>
              <li>Optimized MySQL and PostgreSQL database queries, indexing, and transactional integrity.</li>
              <li>Built responsive, accessible UI components with reactive form handling and clean state management.</li>
              <li>Executed comprehensive unit test suites using JUnit and tested endpoints with Postman.</li>
            </ul>
          </div>

          <div>
            <div class="job-title">
              <span>AI & Machine Learning Intern</span>
              <span>2021</span>
            </div>
            <div class="company">Coincent — Remote</div>
            <ul>
              <li>Developed computer vision and neural network pipelines using Python, TensorFlow, and OpenCV.</li>
              <li>Preprocessed multi-dimensional image arrays and trained CNN models for object classification.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Education</h2>
          <div class="job-title">
            <span>Bachelor of Technology (B.Tech) — ECE</span>
            <span>Graduated 2024</span>
          </div>
          <div style="font-size: 13.5px; color: #444;">Annamacharya Institute of Technology and Sciences (AITS) | CGPA: 8.5 / 10</div>
        </section>

        <section>
          <h2>Certifications</h2>
          <ul>
            <li><strong>Java Full Stack Engineering Certification</strong> — INU Tech Solutions</li>
            <li><strong>Artificial Intelligence with Python</strong> — Coincent</li>
            <li><strong>Oracle Java & Database Foundations</strong> — Oracle Academy</li>
            <li><strong>Agile Development & DevOps Workflows</strong> — Certified Practitioner</li>
          </ul>
        </section>
      </div>
    </body>
    </html>
  `);
  win.document.close();
}
