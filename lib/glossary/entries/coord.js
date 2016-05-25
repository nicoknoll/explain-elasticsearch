GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Coord',
    keys: ['coord'],
    description: 'The number of terms in the query that were found in the document (omitted if equal to 1).',
    implementation: 'overlap/maxOverlap',
    implication: 'Of the terms in the query, a document that contains more terms will have a higher score.',
    rationale: 'Documents that match the most optional terms score highest.'
});
