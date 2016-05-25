GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Term Frequency',
    keys: ['termFreq','freq'],
    description: 'Amount of times the term occurs in the field for this document.',
    implementation: '',
    implication: '',
    rationale: ''
});
