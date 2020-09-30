#!/usr/bin/env node
const fs = require('fs')

function getConfig() {
    const now = new Date()
    const month = (now.getMonth()+1).toString().padStart(2,'0')
    const day = now.getDate().toString().padStart(2,'0')

    return {
        "name": "Shakespeare Searcher",
        "lastUpdated": `${now.getFullYear()}-${month}-${day}`,
        "lastUpdatedMMDD": month+"/"+day,
        "isLocal": true,
        "isPublic": true,
        "path": "/shakespeare-search",
        "themeColor": "hsl(210deg, 50%, 70%)",
        "tools": "Svelte.js, MIT Shakespeare",
        "image": '/img/work-screenshots/shakespeare-search.jpg',
    }
}

fs.writeFile('portfolio-config.json', JSON.stringify(getConfig(),null,2), err => {
    if (err) console.error(err)
    else console.log('Portfolio file written successfully')
})