GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Inverse Document Frequency',
    keys: ['idf'],
    description: 'Inverse document frequency is a measure of how often the term appears across the index for this field.',
    implementation: 'log(maxDocs/(docFreq+1))+1',
    implication: 'The greater the occurrence of a term in different documents, the lower its score.',
    rationale: 'Common terms are less important than uncommon ones.'
});
