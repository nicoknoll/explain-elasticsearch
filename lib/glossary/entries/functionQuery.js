GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'FunctionQuery',
    keys: ['functionQuery','function'],
    description: 'Could be any kind of custom ranking function, which outcome is added to, or multiplied with the default rank score.',
    implementation: '',
    implication: 'various',
    rationale: ''
});
