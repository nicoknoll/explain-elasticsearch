Explanation = require(__dirname + "/explanation.js");


module.exports = {
    parse: function parse(entry) {
        var explanation = new Explanation({
            description: entry.description,
            value: entry.value
        });

        if(entry.details && entry.details.length) {
            entry.details.forEach(function (detail) {
                explanation.addChild(parse(detail));
            });
        }

        return explanation;

    },

    calculateImpact: function calculateImpact(explanation) {

        if(!explanation.children.length) return;

        explanation.setImpactForChildren(explanation.impact, explanation.children);

        explanation.children.forEach(function(child) {
            calculateImpact(child);
        });


    }
};
