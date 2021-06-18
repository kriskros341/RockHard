module.exports = {
  env: {
    mapboxToken: "pk.eyJ1Ijoia3Jpc2tyb3MiLCJhIjoiY2twcGdqN2FzMDF0ZDJwbzFra2YyanExdyJ9.DctM0LixwkUClUrd_iQJbA",
    test: {
        presets: ["next/babel"]
    }
  },
  alias: {
    react: path.resolve('./node_modules/react')
  }
}
