module.exports = {
  "Page title is correct": function (test) {
      test
          .open('http://google.com')
          .assert.title().is('Google', 'Hooray!')
          .done();
  }
};
