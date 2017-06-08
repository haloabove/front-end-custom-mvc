app.model = {
    /*
    Function name: categories
    function args: params(parametars), fn(callback function)
    description: get all categories
    return: callback with response
    developer: Tihomir Jovchevski
    */
    categories: function (param, fn) {
        if (!fn) {
            console.log('please add callback function for categories model');
            return false;
        }
        app.model.send_request(param, app.config.server_configuration.url + 'categories', function (obj) {
            categories = obj;
            return fn(obj);
        });
    },
     /*
    Function name: shipOff
    function args: 
    description: send file
    return:
    developer: Tihomir Jovchevski
    */
    shipOff:function(event) {
            var result = event.target.result;
            var fileName = document.getElementById('fileBox').files[0].name; 
            $.post('http://play.eumobile.mk/backend/api.php?req=new', { 
                data: result, 
                name: fileName 
            });
    },
    /*
    Function name: new_document
    function args: params(parametars), fn(callback function)
    description: create new document
    return: callback with response
    developer: Tihomir Jovchevski
    */
    new_document: function (event,param, fn) {
        if (!fn) {
            console.log('please add callback function for new_document model');
            return false;
        }
            app.model.send_request(param, app.config.server_configuration.url + 'new', function (obj) {
                return fn(obj);
            });
    },
    /*
    Function name: edit_doc
    function args: params(parametars), fn(callback function)
    description: edit document
    return: callback with response
    developer: Tihomir Jovchevski
    */
    edit_doc: function (param, fn) {
        if (!fn) {
            console.log('please add callback function for edit_doc model');
            return false;
        }
        app.model.send_request(param, app.config.server_configuration.url + 'edit', function (obj) {
            return fn(obj);
        });
    },
    /*
    Function name: delete_doc
    function args: params(parametars), fn(callback function)
    description: edit document
    return: callback with response
    developer: Tihomir Jovchevski
    */
    delete_doc: function (param, fn) {
        if (!fn) {
            console.log('please add callback function for delete_doc model');
            return false;
        }
        app.model.send_request(param, app.config.server_configuration.url + 'delete', function (obj) {
            return fn(obj);
        });
    },
    /*
    Function name: get_all_docs
    function args: params(parametars), fn(callback function)
    description: get all documents
    return: callback with response
    developer: Tihomir Jovchevski
    */
    get_all_docs: function (param, fn) {
        if (!fn) {
            console.log('please add callback function for get_all_docs model');
            return false;
        }
        app.model.send_request(param, app.config.server_configuration.url + 'all', function (obj) {
            grid_data = obj;
            return fn(obj);
        });
    },
    /*
     * Function name: send_request function
     * args: fn(callback function)
     * description: Send request to server and
     * return back the response trugh callback function return: callback with
     * response developer: Tihomir Jovcevski
     */
    send_request: function (params, path, fn) {
        if (!fn) {
            console.log('please provide callback function!!!');
            return false;
        } else {
            $.ajax({
                url: path,
                xhrFields: {
                    withCredentials: true
                },
                data: params,
                dataType: "text",
                type: 'GET',
                success: function (data) {
                    var json = data;
                    try {
                        json = JSON.parse(data);
                    } catch (e) {
                        console.log(e);
                    }
                    return fn(json);
                },
                error: function (data) {}
            });
        }
    }

};