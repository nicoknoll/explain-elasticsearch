module.exports = {
    sum: function(imp, children) {

        var sum = children.map(function(child){
            return child.score;
        }).reduce(function(result, child){
            return parseFloat(result) + parseFloat(child)
        });

        var factor = imp / sum;

        console.log(factor, imp, sum);

        children.forEach(function(child){
            child.impact = child.score * factor;
        });
    },

    max: function(imp, tie, children) {
        if(!tie) tie = 0;

        var childrenScores = children.map(function(child){
            return child.score;
        });

        var max = Math.max(childrenScores);

        var sum = childrenScores.reduce(function(result, child){
            if(child.score == max) {
                return result + child.score;
            } else {
                return result + child.score * tie;
            }
        });

        var factor = imp / sum;

        children.forEach(function(child){
            if(child.score == max) {
                child.impact = child.score * factor;
            } else {
                child.impact = child.score * factor * tie;
            }
        });

    },

    none: function(item, children) {
        item.leaf = true;
    }
};
