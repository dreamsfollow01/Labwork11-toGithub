import { fetchUsers, getNewUsers } from "./api.js";

function init() {
  const mainBlock = document.getElementById("main");

  // create elements header, main, footer
  const header = document.createElement("header");
  const main = document.createElement("main");
  const footer = document.createElement("footer");

  const headerWrapper = document.createElement("div");
  headerWrapper.className = "header__wrapper";

  // create leftPanel, content, rightPanel
  const leftPanel = document.createElement("div");
  const content = document.createElement("div");
  const rightPanel = document.createElement("div");
  leftPanel.id = "leftPanel";
  content.id = "content";
  rightPanel.id = "rightPanel";

  // create loaders for leftPanel, content, rightPanel
  const leftPanelLoader = document.createElement("div");
  const contentLoader = document.createElement("div");
  const rightPanelLoader = document.createElement("div");
  leftPanelLoader.className = "loader";
  contentLoader.className = "loader";
  rightPanelLoader.className = "loader";

  // create buttons: User Rating, News, Contacts, About
  const userRatingBtn = document.createElement("button");
  const newsBtn = document.createElement("button");
  const contactsBtn = document.createElement("button");
  const aboutBtn = document.createElement("button");
  userRatingBtn.innerText = "User Rating";
  newsBtn.innerText = "News";
  contactsBtn.innerText = "Contacts";
  aboutBtn.innerText = "About";

  // create New users and Current users block
  const currentUsers = document.createElement("div");
  const newUsers = document.createElement("div");
  currentUsers.id = "currentUsers";
  newUsers.id = "newUsers";
  // create DOM elements to update
  const currentUsersCount = document.createElement("p");
  const newUsersList = document.createElement("ul");

  // create Get Users button
  const getUsersBtn = document.createElement("button");
  getUsersBtn.id = "getUsers";
  getUsersBtn.innerText = "Get users";

  // create input and search btn
  const searchWrapper = document.createElement("div");
  const searchInput = document.createElement("input");
  const searchBtn = document.createElement("button");
  searchWrapper.id = "searchWrapper";
  searchInput.id = "searchInput";
  searchBtn.id = "searchBtn";
  searchBtn.innerText = "Search";

  const deleteColumn = document.createElement("th");
  const editCheckbox = document.createElement("input");
  const editLabel = document.createElement("label");
  deleteColumn.innerText = "Delete";
  editCheckbox.type = "checkbox";
  editCheckbox.id = "editTableCheckbox";
  editLabel.innerText = "Edit table";
  editLabel.appendChild(editCheckbox);

  mainBlock.appendChild(header);
  mainBlock.appendChild(main);
  mainBlock.appendChild(footer);

  main.appendChild(leftPanel);
  main.appendChild(content);
  main.appendChild(rightPanel);

  leftPanel.appendChild(leftPanelLoader);
  content.appendChild(contentLoader);
  rightPanel.appendChild(rightPanelLoader);

  header.appendChild(headerWrapper);

  headerWrapper.appendChild(userRatingBtn);
  headerWrapper.appendChild(newsBtn);
  headerWrapper.appendChild(contactsBtn);
  headerWrapper.appendChild(aboutBtn);

  footer.appendChild(currentUsers);
  footer.appendChild(newUsers);

  currentUsers.appendChild(currentUsersCount);
  newUsers.appendChild(newUsersList);

  const contentTitle = document.createElement("h2");
  content.appendChild(contentTitle);

  // display the name of buttons when it's clicked
  userRatingBtn.addEventListener("click", function () {
    contentLoader.style.display = "none";
    contentTitle.innerText = "User Rating";
  })

  newsBtn.addEventListener("click", function () {
    contentLoader.style.display = "none";
    contentTitle.innerText = "News";
  })

  contactsBtn.addEventListener("click", function () {
    contentLoader.style.display = "none";
    contentTitle.innerText = "Contacts";
  })

  aboutBtn.addEventListener("click", function () {
    contentLoader.style.display = "none";
    contentTitle.innerText = "About";
  })

  // hide loader and show title No users and btn Get Users
  setTimeout(() => {
    content.style.display = "block";
    contentLoader.style.display = "none";
    contentTitle.innerText = "No users";
    content.appendChild(getUsersBtn);
  }, 1000);

  // show active users count and list of nicks of the last 5 users
  let activeUsers = 10;
  let newUsersArray = ["User1", "User2", "User3", "User4", "User5"];

  currentUsersCount.innerText = "Current users: " + activeUsers;

  newUsersArray.forEach((user) => {
    let li = document.createElement("li");
    li.innerText = user;
    newUsersList.appendChild(li);
  })

  // handler that call fetchUsers and create a table inside the element content. Handler that sort table by last name on click
  getUsersBtn.addEventListener("click", () => {
    editCheckbox.checked = false;
    fetchUsers().then((users) => {
      contentTitle.style.display = "none";
      const table = document.createElement("table");
      const oldTable = content.querySelector("table");

      if (oldTable)
        content.removeChild(oldTable);

      const renderTable = () => {
        table.innerHTML = `
          <thead>
            <tr>
              <th>Name</th>
              <th id="surname">Surname</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.score}</td>
              </tr>
          `).join("")}
          </tbody>
          `;
      };

      renderTable();
      content.appendChild(table);

      // sort table by last name on click
      const surnameHeader = table.querySelector("#surname");
      surnameHeader.addEventListener("click", () => {
        users.sort((a, b) => a.lastname.localeCompare(b.lastname));
        renderTable();
        editCheckbox.checked = false;
      })
    });
  })

  // show input field and search btn
  setTimeout(() => {
    leftPanelLoader.style.display = "none";
    leftPanel.appendChild(searchWrapper);
    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(searchBtn);
  }, 1000);

  // selection lines of the table that contain the text fragment entered in the search
  searchBtn.addEventListener("click", () => {
    const searchText = searchInput.value.trim().toLowerCase();
    const tableRows = content.querySelectorAll("table tr");

    tableRows.forEach(row => {
      const rowCells = row.querySelectorAll("td");
      let rowFound = false;

      rowCells.forEach(cell => {
        const cellText = cell.textContent.trim().toLowerCase();

        if (cellText.includes(searchText)) {
          rowFound = true;
          cell.classList.add("highlight");
        } else {
          cell.classList.remove("highlight");
        }
      });
      if (rowFound)
        row.classList.add("highlight");
      else
        row.classList.remove("highlight");
    })
  })

  // sum of the points of 10 downloaded users
  setTimeout(() => {
    fetchUsers().then((users) => {
      const totalScore = users.reduce((acc, curr) => acc + curr.score, 0);
      const totalScoreParagraph = document.createElement("p");
      totalScoreParagraph.innerText = `Total score: ${totalScore}`
      rightPanel.appendChild(totalScoreParagraph);
      rightPanelLoader.style.display = "none";
      rightPanel.appendChild(editLabel);
    });
  }, 1000)

  // delete btn click handler
  function deleteButtonClick(event) {
    const row = event.target.closest("tr");
    if (row)
      row.remove();
  }
  // when checkbox is enabled, table include an additional column with a Delete buttons
  editCheckbox.addEventListener("change", function (event) {
    const editMode = event.target.checked;
    const tableRows = document.querySelectorAll("#content tr");

    if (editMode) {
      tableRows.forEach((row, index) => {
        if (index === 0) {
          const th = document.createElement("th");
          row.appendChild(th);
        } else {
          const deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";
          deleteBtn.addEventListener("click", deleteButtonClick);

          const td = document.createElement("td");
          td.appendChild(deleteBtn);
          row.appendChild(td);
        }
      });
    } else {
      tableRows.forEach((row) => {
        row.lastElementChild.remove();
      });
    }
  });
}

init();