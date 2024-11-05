const CURRICULUM_API = API_BASE + "/supit";

async function getAllSubjects() {
  const userToken = getUserFromLocalStorage()?.token;

  try {
    const response = await fetch(CURRICULUM_API + "/curriculum-list/hr", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { isSuccess, data } = await response.json();

    return isSuccess ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

function displaySubjects(subjects) {
  const subjectsDatalist = document.getElementById("subjects-datalist");

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.kolegij;
    option.id = subject.id;
    subjectsDatalist.appendChild(option);
  });
}

function displaySubjectDetailsInTable(subject) {
  const subjectDetailsTable = document.getElementById("subject-details-table");
  const subjectDetailsData = [
    subject.kolegij,
    subject.ects,
    subject.sati,
    subject.predavanja,
    subject.vjezbe,
    subject.tip,
  ];

  const tableRow = document.createElement("tr");

  subjectDetailsData.forEach((columnData) => {
    const tableData = document.createElement("td");
    tableData.innerText = columnData;
    tableRow.appendChild(tableData);
  });
  subjectDetailsTable.appendChild(tableRow);
  subjectDetailsTable.setAttribute("class", "visible");
}

document.addEventListener("DOMContentLoaded", async function () {
  const subjectDetailsTable = document.getElementById("subject-details-table");
  subjectDetailsTable.setAttribute("class", "invisible");
  const subjects = await getAllSubjects();
  displaySubjects(subjects);

  const subjectForm = document.getElementById("subject-form");
  subjectForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const subjectInput = document.getElementById("subject-input");
    const subjectInputValue = subjectInput?.value;

    const selectedSubject = subjects.find(
      (subject) => subject.kolegij === subjectInputValue
    );
    displaySubjectDetailsInTable(selectedSubject);
    subjectInput.value = "";
    subjectForm.reset();
  });
});
