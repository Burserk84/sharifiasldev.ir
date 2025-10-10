module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.purpose === "project") {
      if (!data.proposedBudget || !data.techStack) {
        throw new Error(
          "For project purpose, proposedBudget and techStack are required."
        );
      }
    }
  },
};
