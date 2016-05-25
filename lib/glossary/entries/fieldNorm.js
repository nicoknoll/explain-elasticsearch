GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'fieldNorm',
    keys: ['fieldNorm'],
    description: 'Impact of a hit in this field.',
    implementation: 'lengthNorm * boost(index)',
    implication: '',
    rationale: ''
});
