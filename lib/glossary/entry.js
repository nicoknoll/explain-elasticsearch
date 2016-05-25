function GlossaryEntry(entry) {
    this.title = entry.title;
    this.keys = entry.keys;
    this.description = entry.description;
    this.implementation = entry.implementation;
    this.implication = entry.implication;
    this.rationale = entry.rationale;
}

module.exports = GlossaryEntry;
