GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Term Frequency',
    keys: ['termFreq','tf'],
    description: 'Term frequency in a field is a measure of how often a term appears in the field.',
    implementation: 'sqrt(freq)',
    implication: 'The more frequent a term occurs in a field, the greater its score.',
    rationale: 'Fields which contains more of a term are generally more relevant.'
});
