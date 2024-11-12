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

function deleteSubjectButton(tableRow) {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("btn", "btn-danger", "btn-close", "mt-1");
  deleteButton.addEventListener("click", function () {
    tableRow.remove();
    updateSubjectList();
  });

  return deleteButton;
}

function calculateSumOfAllSubjects(subjects, key) {
  let sum = 0;
  subjects.forEach((subject) => {
    sum += subject[key];
  });
  return sum;
}

function displaySumOfAllSubjects(subjectList) {
  const fields = ["ects", "sati", "predavanja", "vjezbe"];
  fields.forEach((field) => {
    document.getElementById(field).innerText = calculateSumOfAllSubjects(
      subjectList,
      field
    );
  });
}

function updateSubjectList() {
  const tableBody = document.querySelector("tbody");
  if (!tableBody) return;

  const subjectList = [];
  const subjectRows = tableBody.querySelectorAll("tr");
  subjectRows.forEach((subjectRow) => {
    const subject = {
      kolegij: subjectRow.children[0].innerText,
      ects: parseInt(subjectRow.children[1].innerText),
      sati: parseInt(subjectRow.children[2].innerText),
      predavanja: parseInt(subjectRow.children[3].innerText),
      vjezbe: parseInt(subjectRow.children[4].innerText),
    };
    subjectList.push(subject);
  });

  displaySumOfAllSubjects(subjectList);

  if (subjectList.length === 0) {
    document.getElementById("subject-details-table").classList.add("invisible");
  }
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

  const tableBody = subjectDetailsTable.querySelector("tbody");
  const tableRow = document.createElement("tr");

  subjectDetailsData.forEach((columnData) => {
    const tableData = document.createElement("td");
    tableData.innerText = columnData;
    tableRow.appendChild(tableData);
  });
  tableRow.appendChild(deleteSubjectButton(tableRow));
  tableBody.appendChild(tableRow);

  subjectDetailsTable.classList.remove("invisible");
  updateSubjectList();
}

document.addEventListener("DOMContentLoaded", async function () {
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
