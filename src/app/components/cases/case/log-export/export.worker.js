import * as XLSX from 'xlsx'

onmessage = function(event) {
  var categories = event.data.categories
  var allLogs = event.data.categorizedLogs
  var allLogsJson = {}

  for (var cat in categories) {
    if (categories.hasOwnProperty(cat)) {

      var charCount = {
        'who': 4,
        'where': 6,
        'when': 21,
        'what': 5,
        'why': 4,
        'how': 4,
        'with': 5
      }

      for (var obj in allLogs[categories[cat]]) {
        if (allLogs[categories[cat]].hasOwnProperty(obj)) {
          delete allLogs[categories[cat]][obj]['__v']
          delete allLogs[categories[cat]][obj]['_id']
          delete allLogs[categories[cat]][obj]['$$index']
          delete allLogs[categories[cat]][obj]['case']
          delete allLogs[categories[cat]][obj]['error']

          var date = allLogs[categories[cat]][obj]['when']
          allLogs[categories[cat]][obj]['when'] = new Date(date).toLocaleDateString() + ', '+ new Date(date).toLocaleString([], {hour: '2-digit', minute: '2-digit'})

          charCount.who = allLogs[categories[cat]][obj]['who'].length

          var whereLength = allLogs[categories[cat]][obj]['where'].length
          if (whereLength > charCount.where) {
            charCount.where = allLogs[categories[cat]][obj]['where'].length
          }

          var whatLength = allLogs[categories[cat]][obj]['what'].length
          if (whatLength > charCount.what) {
            charCount.what = allLogs[categories[cat]][obj]['what'].length
          }

          var whyLength = allLogs[categories[cat]][obj]['why'].length
          if (whyLength > charCount.why) {
            charCount.why = allLogs[categories[cat]][obj]['why'].length
          }

          var howLength = allLogs[categories[cat]][obj]['how'].length
          if (howLength > charCount.how) {
            charCount.how = allLogs[categories[cat]][obj]['how'].length
          }

          var withLength = allLogs[categories[cat]][obj]['with'].length
          if (withLength > charCount.with) {
            charCount.with = allLogs[categories[cat]][obj]['with'].length
          }
        }
      }

      allLogs[categories[cat]].unshift(
        {
          who: '',
          where: '',
          when: '',
          what: '',
          why: '',
          how: '',
          with: '',
          result: ''
        }
      )

      allLogsJson[categories[cat]] = XLSX.utils.json_to_sheet(
        allLogs[categories[cat]]
      )
      allLogsJson[categories[cat]]['!cols'] = [
        { wch: charCount.who },
        { wch: charCount.where },
        { wch: charCount.when },
        { wch: charCount.what },
        { wch: charCount.why },
        { wch: charCount.how },
        { wch: charCount.with },
        { wch: 75 }
      ]
    }
  }

  var workbook = { Sheets: allLogsJson, SheetNames: categories }
  var excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'buffer' })

  postMessage({
    excelBuffer: excelBuffer
  })
}
