fs.unlink(destinationGroupe1, function (err) {
    if (err) throw err;
}); 

fs.unlink(destinationGroupe2, function (err) {
    if (err) throw err;
    console.log('Deleted: EDT1.ics and EDT2.ics');
});