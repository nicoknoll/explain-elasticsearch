GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Boost (index)',
    keys: ['maxBoost','boost'],
    description: 'Boost of the field at index-time.',
    implementation: '',
    implication: 'Hits in fields with higher boost get a higher score.',
    rationale: 'A term in field A could be more relevant than the same term in field B.'
});
