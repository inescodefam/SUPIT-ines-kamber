const CURRICULUM_API = API_BASE + "/supit";

/*  Data  */

function getAllSubjects() {
  const userToken = getUserFromLocalStorage()?.token;

  try {
    return $.ajax({
      url: CURRICULUM_API + "/curriculum-list/hr",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      dataType: "json",
    }).then((response) => {
      const { isSuccess, data } = response;
      return isSuccess ? data : [];
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

function displaySubjects(subjects) {
  const $subjectsDatalist = $("#subjects-datalist");

  if (!Array.isArray(subjects)) {
    console.error("Expected an array but got:", subjects);
    return;
  }

  subjects.forEach((subject) => {
    const option = $("<option></option>")
      .val(subject.kolegij)
      .attr("id", subject.id);

    findSubjectInTable(subject.kolegij)
      ? $subjectsDatalist.children().first().remove()
      : $subjectsDatalist.append(option);
  });
}

/*    Table     */

function findSubjectInTable(subjectName) {
  const tableBody = document.querySelector("tbody");
  if (!tableBody) return false;

  const tableRows = tableBody.querySelectorAll("tr");
  return Array.from(tableRows).some(
    (tableRow) => tableRow.children[0].innerText === subjectName
  );
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
  if (!findSubjectInTable(subject.kolegij)) {
    const subjectDetailsTable = $("#subject-details-table");
    const subjectDetailsData = [
      subject.kolegij,
      subject.ects,
      subject.sati,
      subject.predavanja,
      subject.vjezbe,
      subject.tip,
    ];

    const tableBody = subjectDetailsTable.find("tbody");
    const tableRow = $("<tr></tr>");

    subjectDetailsData.forEach((columnData) => {
      const tableData = $("<td></td>").text(columnData);
      tableRow.append(tableData);
    });
    tableRow.append(deleteSubjectButton(tableRow));
    tableBody.append(tableRow);

    subjectDetailsTable.removeClass("invisible");
    updateSubjectList();
  }
}

$().ready(async function () {
  const subjects = await getAllSubjects();
  displaySubjects(subjects);

  $("#subject-input").on("change", function () {
    handleSubjectSelection();
  });

  function handleSubjectSelection() {
    const subjectInputValue = $("#subject-input").val();

    const selectedSubject = subjects.find(
      (subject) => subject.kolegij === subjectInputValue
    );

    if (selectedSubject) {
      displaySubjectDetailsInTable(selectedSubject);
      $("#subject-input").val("");
      $("#curriculum-form")[0].reset();
    }
  }
});
