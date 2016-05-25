GlossaryEntry = require(__dirname + "/../entry.js");

module.exports = new GlossaryEntry({
    title: 'Score(query,doc)',
    keys: ['score'],
    description: 'Practical scoring function.',
    implementation: 'queryNorm(q) &middot; coord(q,d) &middot; &sum; (tf(t in d) &middot; idf(t)&sup2; &middot; t.getBoost() &middot; norm(t,d)) (t in q)',
    implication: '',
    rationale: ''
});
