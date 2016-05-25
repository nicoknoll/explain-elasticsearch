GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: '',
    keys: ['queryBoost','boostQuery'],
    description: 'Boost(query) is the boost of the field at query-time.',
    implementation: '',
    implication: 'Hits in fields with higher boost get a higher score.',
    rationale: 'A term in field A could be more relevant than the same term in field B.'
});
