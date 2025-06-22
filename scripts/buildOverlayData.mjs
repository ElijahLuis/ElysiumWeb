import fs from 'fs'
import path from 'path'
import util from 'util'

// Load the compiled overlayData from the TypeScript build
const { overlayData } = await import('../build/src/data/overlayData.js')

const outputPath = path.join('client', 'scripts', 'overlayData.js')

// Pretty-print using util.inspect to mirror our hand-written style
const objectLiteral = util.inspect(overlayData, { depth: null, compact: false })

const content = `// Generated from src/data/overlayData.ts\nexport const overlayData = ${objectLiteral};\n\nwindow.overlayData = overlayData;\n`

fs.writeFileSync(outputPath, content)
console.log('Wrote', outputPath)
