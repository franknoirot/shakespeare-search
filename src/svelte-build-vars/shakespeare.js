require('isomorphic-fetch')

const plays = {
    "All's Well That Ends Well": {
        uri: 'allswell',
        genre: 'comedy',
    },
    "As You Like It":  {
        uri: 'asyoulikeit',
        genre: 'comedy',
    },
    "The Comedy of Errors": {
        uri: 'comedy_errors',
        genre: 'comedy',
    },
    "Cymbeline": {
        uri: 'cymbeline',
        genre: 'comedy',
    },
    "Love's Labours Lost": {
        uri: 'lll',
        genre: 'comedy',
    },
    "Measure for Measure": {
        uri: 'measure',
        genre: 'comedy',
    },
    "The Merry Wives of Windsor": {
        uri: 'merry_wives',
        genre: 'comedy',
    },
    "The Merchant of Venice": {
        uri: 'merchant',
        genre: 'comedy',
    },
    "A Midsummer Night's Dream": {
        uri: 'midsummer',
        genre: 'comedy',
    },
    "Much Ado About Nothing": {
        uri: 'much_ado',
        genre: 'comedy',
    },
    "Pericles, Prince of Tyre": {
        uri: 'pericles',
        genre: 'comedy',
    },
    "Taming of the Shrew": {
        uri: 'taming_shrew',
        genre: 'comedy',
    },
    "The Tempest": {
        uri: 'tempest',
        genre: 'comedy',
    },
    "Troilus and Cressida": {
        uri: 'troilus_cressida',
        genre: 'comedy',
    },
    "Twelfth Night": {
        uri: 'twelfth_night',
        genre: 'comedy',
    },
    "Two Gentlemen of Verona": {
        uri: 'two_gentlemen',
        genre: 'comedy',
    },
    "Winter's Tale": {
        uri: 'winters_tale',
        genre: 'comedy',
    },
    "Henry IV, part 1": {
        uri: '1henryiv',
        genre: 'history',
    },
    "Henry IV, part 2": {
        uri: '2henryiv',
        genre: 'history',
    },
    "Henry V": {
        uri: 'henryv',
        genre: 'history',
    },
    "Henry VI, part 1": {
        uri: '1henryvi',
        genre: 'history',
    },
    "Henry VI, part 2": {
        uri: '2henryvi',
        genre: 'history',
    },
    "Henry VI, part 3": {
        uri: '3henryvi',
        genre: 'history',
    },
    "Henry VIII": {
        uri: 'henryviii',
        genre: 'history',
    },
    "King John": {
        uri: 'john',
        genre: 'history',
    },
    "Richard II": {
        uri: 'richardii',
        genre: 'history',
    },
    "Richard III": {
        uri: 'richardiii',
        genre: 'history',
    },
    "Antony and Cleopatra": {
        uri: 'cleopatra',
        genre: 'tragedy',
    },
    "Coriolanus": {
        uri: 'coriolanus',
        genre: 'tragedy',
    },
    "Hamlet": {
        uri: 'hamlet',
        genre: 'tragedy',
    },
    "Julius Caesar": {
        uri: 'julius_caesar',
        genre: 'tragedy',
    },
    "King Lear": {
        uri: 'lear',
        genre: 'tragedy',
    },
    "Macbeth": {
        uri: 'macbeth',
        genre: 'tragedy',
    },
    "Othello": {
        uri: 'othello',
        genre: 'tragedy',
    },
    "Romeo and Juliet": {
        uri: 'romeo_juliet',
        genre: 'tragedy',
    },
    "Timon of Athens": {
        uri: 'timon',
        genre: 'tragedy',
    },
    "Titus Andronicus": {
        uri: 'titus',
        genre: 'tragedy',
    },
}

const fullPlayURL = uri => `http://shakespeare.mit.edu/${ uri }/full.html`

const playPromises = Object.entries(plays).map(([name, obj]) => fetch(fullPlayURL(obj.uri)).then(res => res.text()))

module.exports = Promise.all(playPromises).then(htmlArr => {
    const data = Object.assign({}, plays)

    Object.keys(data).forEach((key, i) => {
        data[key] = {
            ...plays[key],
            text: htmlArr[i],
        }
    })

    return data
})