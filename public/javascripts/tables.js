function storeQuery(query) {
  document.getElementsByClassName('queries')[0].insertAdjacentHTML("afterbegin", `<li>${query}</li>`)
}

async function getData(tableName) {
    const url = "/tables/" + tableName;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const text = await response.json();
      return text;
    } catch (error) {
      console.error(error.message);
    }
}

async function populateTable(tableName) {
  tableName = this.className
  const tables = document.getElementsByClassName("tables")[0]
  const belt = document.getElementsByClassName("belt")[0]
  if(tables.getElementsByClassName(tableName).length > 0) {
    belt.getElementsByClassName(tableName)[0].style.backgroundColor = '';
    tables.getElementsByClassName(tableName)[0].remove()
    return
  }
  belt.getElementsByClassName(tableName)[0].style.backgroundColor = 'wheat';
  const rows = await getData(tableName)
  const tb = document.createElement("table")
  tb.classList.add(tableName)
  tb.innerHTML = rows["outHTML"]
  tables.prepend(tb)
  storeQuery(rows["calledQuery"])
  console.log(`table: ${tableName} loaded`);
}

function handleForm(event) { 
  event.preventDefault();
    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target))
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((body) => {
      storeQuery(body["final_message"])
      console.log(body)
    }).catch((error) => {
    });
} 

function handleButtonPress(event) {
  if(event.target.id == "add-button") {
    document.getElementsByClassName("client-adder")[0].style.display = "";
    document.getElementsByClassName("client-modifier")[0].style.display = "none";
    document.getElementsByClassName("client-remover")[0].style.display = "none";
  } if(event.target.id == "modify-button") {
    document.getElementsByClassName("client-adder")[0].style.display = "none";
    document.getElementsByClassName("client-modifier")[0].style.display = "";
    document.getElementsByClassName("client-remover")[0].style.display = "none";
  } if(event.target.id == "remove-button") {
    document.getElementsByClassName("client-adder")[0].style.display = "none";
    document.getElementsByClassName("client-modifier")[0].style.display = "none";
    document.getElementsByClassName("client-remover")[0].style.display = "";
  }
}

window.onload = () => {
  document.getElementsByClassName("customers")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("employees")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("devices")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("orders")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("order_details")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("addresses")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("customers")[0].click();
  document.getElementsByClassName("orders")[0].click();

  document.getElementById("add_client").addEventListener('submit', handleForm);
  document.getElementById("modify_client").addEventListener('submit', handleForm);
  document.getElementById("remove_client").addEventListener('submit', handleForm);

  document.getElementById("add-button").addEventListener('click', handleButtonPress);
  document.getElementById("modify-button").addEventListener('click', handleButtonPress);
  document.getElementById("remove-button").addEventListener('click', handleButtonPress);

}

