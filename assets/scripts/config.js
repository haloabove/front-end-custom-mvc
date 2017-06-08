if (typeof app == 'undefined') {
    var app = {};
}
app.config = {
    server_configuration: {
        url: 'http://play.eumobile.mk/backend/api.php?req='
    },
    filters: {
        name: true,
        category: true,
        date: true
    }

}