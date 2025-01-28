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
    const previousData = document.getElementsByClassName(tableName)[1].getElementsByTagName("tbody")
    if(previousData.length != 0) {
      document.getElementsByClassName(tableName)[1].removeChild(previousData[0])

    }
    const rows =  await getData(tableName);
    document.getElementsByClassName(tableName)[1].innerHTML += rows["list"];
    storeQuery(rows["calledQuery"])
    console.log(`table: ${tableName} loaded`);
}

window.onload = () => {
  document.getElementsByClassName("customers")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("employees")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("devices")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("orders")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("invoices")[0].addEventListener("click", populateTable);
  document.getElementsByClassName("customers")[0].click();
  document.getElementsByClassName("orders")[0].click();
}

