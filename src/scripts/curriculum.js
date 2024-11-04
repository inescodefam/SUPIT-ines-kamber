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
    subjectsDatalist.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const subjects = await getAllSubjects();
  displaySubjects(subjects);
});
