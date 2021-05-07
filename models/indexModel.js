const indexModel = (name, value, change, percent, max, min) => {
    return {
        name: name,
        value: value,
        change: change,
        percentage_of_changes: percent,
        max: max,
        min: min
      }
}

module.exports = indexModel