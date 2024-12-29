async function getData(tableName) {
    const url = "/tables/" + tableName;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const text = await response.text();
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
    const rows =  await getData(tableName);
    document.getElementById(tableName).innerHTML += rows;
    console.log(`table: ${tableName} loaded`);
}

console.log('loading tables...')
populateTable("Employees");