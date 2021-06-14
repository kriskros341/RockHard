const config = {
  verbose: true,
};


module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    '*/tests/*{.tsx}',
    '*/**/tests/*{.tsx}'
  ],
  transform: {

  }
}