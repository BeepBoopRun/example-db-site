import Router from 'express-promise-router';
var router = new Router();

async function fetchAll(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

async function getTableData() {
  const schema = await fetchAll(db, 'SELECT * FROM sqlite_master')
  let tables = schema
              .filter((o) => (o.type == 'table' && !o.tbl_name.includes("sqlite")))
              .map((o) => o.tbl_name);
  let columns = []
  for(const t of tables) {
    const res = (await fetchAll(db, `PRAGMA table_info(${t})`))
                .map((o) => o.name);
    columns.push(res);
  }
  return tables.map((v,i) => [v, columns[i]]);
}

async function generateBeltHTML(tableData) {
  tableData = await tableData;
  let html = tableData.map((o) => `<li class="${o[0]}">${o[0]}</li>`).join(`\n`);
  console.log(html)
}

async function generateTableHTML(tableData) {
  tableData = await tableData;
  
}


async function print(p) {
  console.log(await p);
}

const tableData = getTableData();
print(tableData);
generateBeltHTML(tableData);
generateTableHTML(tableData);


/* GET values from a table. */
router.get('/:tableName', function(req, res, next) {
  const {tableName} = req.params;
  const calledQuery = `SELECT * FROM ${tableName}`;
  var list = ``
  db.serialize(() => {
    db.each(calledQuery, (err, row) => {
      list += `<tr>`
      for(const column of Object.keys(row)) {
        list += `<td>${row[column]}</td>`
      }
      list += `</tr>`
    }, (err, rowCount) => res.send({list, calledQuery}))
  })
});

export default router;
