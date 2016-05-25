GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'NumDocs',
    keys: ['numDocs'],
    description: 'The total number of documents in the index, not including those that are marked as deleted but have not yet been purged. This is a constant (the same value for all documents in the index).',
    implementation: '',
    implication: '',
    rationale: ''
});
