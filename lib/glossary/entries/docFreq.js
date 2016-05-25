GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'DocFreq',
    keys: ['docFreq'],
    description: 'The number of documents in the index which contain the term in this field. This is a constant (the same value for all documents in the index containing this field).',
    implementation: '',
    implication: '',
    rationale: ''
});
