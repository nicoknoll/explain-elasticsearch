GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'QueryWeight',
    keys: ['queryWeight'],
    description: 'The impact of the query against the field.',
    implementation: 'boost(query)*idf*queryNorm',
    implication: '',
    rationale: ''
});
