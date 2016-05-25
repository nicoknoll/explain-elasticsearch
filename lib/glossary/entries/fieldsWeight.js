GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'FieldWeight',
    keys: ['fieldWeight', 'weight'],
    description: 'The score of a term matching the field.',
    implementation: 'tf * idf * fieldNorm',
    implication: '',
    rationale: ''
});
