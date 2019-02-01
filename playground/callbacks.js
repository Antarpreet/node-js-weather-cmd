var getUser = (id, callback) => {
    var user = {
        id,
        name: 'Antar'
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
}

getUser(31, (user) => {
    console.log(user);
});