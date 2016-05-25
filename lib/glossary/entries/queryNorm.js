GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'QueryNorm',
    keys: ['queryNorm'],
    description: 'Normalization factor so that queries can be compared.',
    implementation: '1/sqrt(sumOfSquaredWeights)',
    implication: 'Doesn\'t impact the relevancy of this result',
    rationale: 'queryNorm is not related to the relevance of the document, but rather tries to make scores between different queries comparable. This value is (almost) equal for all results of the query.'
});
