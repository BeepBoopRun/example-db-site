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

function htmlToNodes(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

async function populateTable(tableName) {
    console.log(this.className)
    tableName = this.className
    const rows =  await getData(tableName);
    const previousData = document.getElementsByClassName(tableName)[1].getElementsByTagName("tbody")
    if(document.getElementsByClassName(tableName)[1].style.display == "none") {
      document.getElementsByClassName(tableName)[1].style.display = ""
      document.getElementsByClassName(tableName)[1].style.display = ""
      document.getElementsByClassName(tableName)[0].style.backgroundColor = "wheat"
      const root = document.getElementsByClassName("tables")[0].children
      for(const c of root) {
        c.style.order  = +c.style.order + 1 
      }
      document.getElementsByClassName(tableName)[1].style.order = 1
    } else {
      document.getElementsByClassName(tableName)[1].style.display = "none"
      document.getElementsByClassName(tableName)[0].style.backgroundColor = ""
      return
    }
    if(previousData.length != 0) {
      document.getElementsByClassName(tableName)[1].removeChild(previousData[0])

    }
    document.getElementsByClassName(tableName)[1].innerHTML += rows["list"];
    storeQuery(rows["calledQuery"])
    console.log(`table: ${tableName} loaded`);
}

window.onload = () => {
  document.getElementsByClassName("Customers")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("Employees")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("Devices")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("Orders")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("Invoices")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("Customers")[0].click();
  document.getElementsByClassName("Orders")[0].click();
}

