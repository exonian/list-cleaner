var outputElement = document.getElementById('output-list')

const splitLines = str => str.split(/\r?\n/)

function updateList() {
  var str = document.getElementById('input-list').value
  var includeWargear = document.getElementById('wargear').checked

  var lines = splitLines(str).reduce((accum, line) => {
    var optionsMatch = line.match(/^ {4}(?<cleaned>[^• ].*$)/)
    if (optionsMatch) {
      accum[accum.length - 1].push(optionsMatch.groups.cleaned)
      return accum
    }
    
    var nestedOptionsMatch = line.match(/^( {4}• | {6})(?<cleaned>.*$)/)
    if (nestedOptionsMatch) {
      if (includeWargear) accum[accum.length - 1].push(nestedOptionsMatch.groups.cleaned)
      return accum
    }

    accum.push([line])

    return accum
  }, [])

  lines.push([`\nCleaned up at michaelblatherwick.co.uk/list-cleaner`])

  var output = lines.map((line) => line.join(', ')).join('\n')
  outputElement.innerText = output
}

new ClipboardJS('.btn')
