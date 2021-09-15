var outputElement = document.getElementById('output-list')

const splitLines = str => str.split(/\r?\n/)

function updateList(str) {
  var ptsMatch = str.match(/Total Points: (\d+)/)
  var ptsMaxMatch = str.match(/Points Limit: (\d+)/)
  var officialApp = str.match(/Created with Warhammer Age of Sigmar: The App/)

  var lines = splitLines(str).reduce((accum, line) => {
    if (line.match(/^ *(Battlefield Role|Battalion Slot Filled|Total Points|Points Limit|Valid|Invalid).*$/)) return accum

    accum.push(line)
    return accum
  }, [])
 
  ptsMatch && ptsMaxMatch && lines.push(`${ptsMatch[1]}/${ptsMaxMatch[1]} pts`)
  ptsMatch && !ptsMaxMatch && lines.push(`${ptsMatch[1]}`)

  officialApp && lines.push(`Created with the official app, cleaned up at michaelblatherwick.co.uk/list-cleaner`)

  var output = lines.join('\n')
  outputElement.innerText = output
}

new ClipboardJS('.btn')
