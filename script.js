const url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';

const searchBox = document.getElementById('search-box')
const infoWrapper = document.getElementById('info-wrapper')
const tableBody = document.querySelector('.tablebody')
const dataRow = document.querySelector('.data-row')
const userList = []

let searchInput = '';

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log("data------------------",data)
    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchData().then((data) => {
  console.log("data=======================",data);

  const infoContent = document.createElement("div");
  infoContent.setAttribute("id","info-content")

  const tableRows = data.map((user) => {
    const tRow = document.createElement("tr");
    tRow.setAttribute("class","data-row")
    userList.push(tRow);
    tRow.innerHTML = 
      ` 
        <td class="column1">${user.id}</td>
        <td class="column2">${user.firstName}</td>
        <td class="column3">${user.lastName}</td>
        <td class="column4">${user.email}</td>
        <td class="column5">${user.phone}</td>
      `;
    
     
     
    tRow.addEventListener("click", function(e) {
      infoContent.innerHTML=
      `<div><b>User selected:</b>${user.firstName} ${user.lastName}</div>
      <div>
          <b>Description: </b>
          <textarea cols="50" rows="5" readonly >
              ${user.description}
          </textarea>
      </div>
      <div><b>Address:</b> ${user.address.streetAddress}</div>
      <div><b>City:</b>   ${user.address.city}</div>
      <div><b>State:</b>   ${user.address.state}</div>
      <div><b>Zip:</b>  ${user.address.zip}</div>`
      /* infoWrapper.innerHTML = ''; */
      infoWrapper.append(infoContent);
    });
    tableBody.append(tRow);
    tRow.style.color="black"
    return tRow;
    });
});
function filterUserData(searchInput) {
  console.log("searchInput---", searchInput);
  console.log("userList------", userList);
  const tableRows = document.querySelectorAll('.data-row');
  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const rowText = row.innerText.toLowerCase();
    if (rowText.includes(searchInput.toLowerCase())) {
      // row.classList.remove("hide");
      row.style.backgroundColor = "lightseagreen";
      row.style.border = "2px solid #808080";
      row.style.color ="yellow";
    } else {
      // row.classList.add("hide");
      row.style.backgroundColor = "transparent";
      row.style.border = "none";
      row.style.color ="black";
    }
  }
}



searchBox.addEventListener("input", function(e) {
  console.log("sangavi", e);
  filterUserData(e.target.value);
});

document.addEventListener("DOMContentLoaded", function() {
  var searchInput = document.getElementById("search-box");
  searchInput.addEventListener("search", function() {
    location.reload();
  });
});