Impact = require(__dirname + "/impact.js");


function Explanation(entry) {
    this.level = 0;
    this.impact = 0;
    this.entry = entry;
    this.score = entry.value;
    this.value = entry.value;
    this.description = entry.description;

    this.children = [];
    this.attributes = {
        shortDescription: ''
    };
    this.capabilities = {};
}

Explanation.prototype.addAttribute = function(attribute, value) {
    this.attributes[attribute] = value;
};

Explanation.prototype.addCapability = function(capability) {
    this.capabilities[capability] = true;
};

Explanation.prototype.addChild = function(child) {
    this.children.push(child);
};

Explanation.prototype.getAttribute = function(attribute) {
    return this.attributes[attribute];
};

Explanation.prototype.hasCapability = function(capability) {
    return this.capabilities[capability];
};

Explanation.prototype.removeCapability = function(capability) {
    this.capabilities[capability] = false;
};


Explanation.prototype.setImpact = function(impact) {
    this.addCapability('hasImpact');
    this.impact = impact;
};

Explanation.prototype.setImpactForChildren = function(impact) {
    Impact.sum(impact, this.children);
    //throw 'setImpactForChildren has to be implmented.';
};


Explanation.prototype.children = function(cap) {
    return this.children;
};

module.exports = Explanation;
