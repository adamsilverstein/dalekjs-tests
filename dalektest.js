module.exports = {
    "Page title is correct": function(test){
         test.open("http://localhost:8080")
         .assert.title().is("Title", "it has title")
         .done()
    }
}
