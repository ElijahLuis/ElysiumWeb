import fs from 'fs'
import path from 'path'

// Load the compiled overlayData from the TypeScript build
const { overlayData } = await import('../build/src/data/overlayData.js')

const outputPath = path.join('client', 'scripts', 'overlayData.js')

// Pretty-print the overlay data as JSON
const json = JSON.stringify(overlayData, null, 2)

const content = `// Generated from src/data/overlayData.ts\nexport const overlayData = ${json};\n\nwindow.overlayData = overlayData;\n`

fs.writeFileSync(outputPath, content)
console.log('Wrote', outputPath)
