GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Document (an entity)',
    keys: ['document','doc'],
    description: 'The top-level, or root object that is serialized into JSON and stored in Elasticsearch under a unique ID.',
    implementation: '',
    implication: '',
    rationale: ''
});
