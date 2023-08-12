var outputElement = document.getElementById('output-list')

const splitLines = str => str.split(/\r?\n/)

function updateList(str, mode) {

  var lines = splitLines(str).reduce((accum, line) => {
    var match = line.match(/^( {4}• | {6})(?<cleaned>.*$)/)
    if (match) accum[accum.length - 1].push(match.groups.cleaned)
    else accum.push([line])
    return accum
  }, [])
 
  lines.push(`\nCleaned up at michaelblatherwick.co.uk/list-cleaner`)

  var output = lines.join('\n')
  outputElement.innerText = output
}

new ClipboardJS('.btn')
