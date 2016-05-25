GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'lengthNorm',
    keys: ['lengthNorm'],
    description: 'Measure of the importance of a term according to the total number of terms in the field.',
    implementation: '1/sqrt(numTerms)',
    implication: 'A term matched in fields with less terms have a higher score.',
    rationale: 'A term in a field with less terms is more important than one with more.'
});
