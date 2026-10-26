console.log("skills.js is connected");

const skills = [
    {
        id: 1,
        name: "Threat & Vulnerability Analysis",
        category: "Cybersecurity",
        proficiency: 4,
        yearsExperience: 2,
        description: "Built through the Cisco CCNA CyberOps, Google Cybersecurity and CompTIA CySA+ certifications, Masters in Cybersecurity and work experience."
    },
    {
        id: 2,
        name: "Security Monitoring & SIEM (Splunk)",
        category: "Cybersecurity",
        proficiency: 3,
        yearsExperience: 2,
        description: "Learned through self-study with Splunk, including SPL queries and dashboards and work experience."
    },
    {
        id: 3,
        name: "Agile Project Delivery (Scrum/SAFe)",
        category: "Project Delivery",
        proficiency: 5,
        yearsExperience: 8,
        description: "PSM I certified, with hands-on experience as a Scrum Master and Project Manager."
    },
    {
        id: 4,
        name: "Software Testing",
        category: "Development & Testing",
        proficiency: 4,
        yearsExperience: 3,
        description: "ISTQB certified, with functional, regression and UAT testing experience."
    },
    {
        id: 5,
        name: "Fullstack Development",
        category: "Development & Testing",
        proficiency: 4,
        yearsExperience: 2,
        description: "Self-taught through Codecademy and real projects, now working as a fullstack engineer."
    },
        {
        id: 6,
        name: "IT Project Management",
        category: "Project Delivery",
        proficiency: 5,
        yearsExperience: 9,
        description: "Managed technology project delivery in a regulated banking environment for nearly a decade."
    },
    {
        id: 7,
        name: "Test Automation with Selenium",
        category: "Development & Testing",
        proficiency: 3,
        yearsExperience: 2,
        description: "Ran regression and UAT test cases with Selenium and tracked defects in Jira."
    },
    {
        id: 8,
        name: "Frontend Development (HTML, CSS, JavaScript)",
        category: "Development & Testing",
        proficiency: 4,
        yearsExperience: 2,
        description: "Built and published real websites with semantic HTML, CSS and vanilla JavaScript."
    }
];


const skillsContainer = document.getElementById("skills-container");

function renderSkills(list) {
    skillsContainer.innerHTML = "";

    list.forEach(function (skill) {
        const card = document.createElement("article");
        card.className = "skill-card";
        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p class="skill-category">${skill.category}</p>
            <p>Proficiency: ${skill.proficiency} / 5</p>
            <p>Experience: ${skill.yearsExperience} years</p>
            <p>${skill.description}</p>
        `;
        skillsContainer.appendChild(card);
    });
}

const filterButtons = document.querySelectorAll("#skills-filters button");
const sortSelect = document.getElementById("sort-select");
const skillsCount = document.getElementById("skills-count");

let currentCategory = "all";

function updateSkills() {
    const filtered = skills.filter(function (skill) {
        return currentCategory === "all" || skill.category === currentCategory;
    });

    const sortBy = sortSelect.value;

    filtered.sort(function (a, b) {
        if (sortBy === "proficiency") {
            return b.proficiency - a.proficiency;
        }
        if (sortBy === "years") {
            return b.yearsExperience - a.yearsExperience;
        }
        return a.name.localeCompare(b.name);
    });

    renderSkills(filtered);
    skillsCount.textContent = "Showing " + filtered.length + " of " + skills.length + " skills";
}

function handleFilterClick(event) {
    currentCategory = event.target.dataset.category;

    filterButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button === event.target ? "true" : "false");
    });

    updateSkills();
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", handleFilterClick);
});

sortSelect.addEventListener("change", updateSkills);

updateSkills();