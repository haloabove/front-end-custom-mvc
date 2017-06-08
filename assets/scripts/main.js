if (typeof app == 'undefined') {
    var app = {};
}
app.main = {
    selected_doc_id: null,
    /*
     Function name: init
     function args: /
     description: First called method when application is ready
     return: /
     developer: Tihomir Jovchevski
     */
    init: function () {
        app.main.init_btns();
        app.model.get_all_docs('', function (obj) {
            app.main.init_grid(obj);
        });
        app.model.categories('', function (obj) {});
    },
    /*
    Function name: init_btns
    function args: initiliaze all buttons
    description: Init all buttons off the index page
    return: /
    developer: Tihomir Jovchevski
    */
    init_btns: function () {
        $('.wrapper').on('keyup', '#search_bar', function () {
            app.main.search($(this).val());
        });
        $('.filter_by').on('change', '#date', function (e) {
            if (this.checked) {
                app.config.filters.date = true;
            } else {
                app.config.filters.date = false;
            }
            $('.date_picker').toggle();
            $('tr').css('background-color', 'transparent');
            app.main.search($('#search_bar').val());
        });
        $('.filter_by').on('change', '#category', function () {
            if (this.checked) {
                app.config.filters.category = true;
            } else {
                app.config.filters.category = false;
            }
            $('tr').css('background-color', 'transparent');
            app.main.search($('#search_bar').val());
        });
        $('.filter_by').on('change', '#name', function () {
            if (this.checked) {
                app.config.filters.name = true;
            } else {
                app.config.filters.name = false;
            }
            $('tr').css('background-color', 'transparent');
            app.main.search($('#search_bar').val());
        });
        $('#date_picker').change(function (event) {
            $('tr').css('background-color', 'transparent');
            app.main.search(this.value);
            $('#search_bar').val(this.value)
        });
        $('.tablesorter').on('click', '.edit_doc', function () {
            app.main.edit_document($(this).parent().parent());
        });
        $('.tablesorter').on('click', '.delete_doc', function () {
            app.main.delete_document($(this).parent().parent());
        });
        $('.right').on('click', '.new_doc', function () {
            app.main.create_new_doc();
        });

    },
    /*
     Function name: init
     function args: obj(documents data response from server)
     description: When request recieved fill all data to the grid
     return: /
     developer: Tihomir Jovchevski
     */
    init_grid: function (obj) {
        $('.tablesorter').find('tbody').html('');
        $.each(obj, function (k, v) {
            $('.tablesorter').find('tbody').append('<tr><td class="documentID">' + v.document_id + '</td><td class="category">' + v.category + '</td><td class="name">' + v.name + '</td><td class="doc_description">' + v.description + '</td><td class="creation_date date">' + v.creation_date + '</td><td class="date">' + v.last_modified_date + '</td><td><a href="' + v.link + '"><i class="fa fa-download"></i></a></td><td><i class="fa fa-pencil edit_doc"></i></td><td><i class="fa fa-trash delete_doc"></i></td></tr>');
        });
        $(".tablesorter").tablesorter({
            headers: {
                '.description': {
                    sorter: false
                }
            }
        });
    },
    /*
    Function name: search
    function args: search_text(string to be searched)
    description: Search trough table
    return: /
    developer: Tihomir Jovchevski
    */
    search: function (search_text) {
        if (app.config.filters.date) {
            if (search_text != '') {
                $('tr').css('background-color', 'transparent');
                var filter = new RegExp('\\b' + search_text.toLowerCase() + '\\b', 'gi');
                $.each($('td'), function (key, value) {
                    if ($(value).hasClass("date")) {
                        if ($(value).text().toLowerCase().match(filter)) {
                            $(value).parent().css('background-color', 'red')
                        }
                    }
                });

            } else {
                $('tr').css('background-color', 'transparent');
            }
        } else {
            $('tr').css('background-color', 'transparent');
        }
        if (app.config.filters.name) {
            if (search_text != '') {
                $('tr').css('background-color', 'transparent');
                var filter = new RegExp('\\b' + search_text.toLowerCase() + '\\b', 'gi');
                $.each($('td'), function (key, value) {
                    if ($(value).hasClass("name")) {
                        if ($(value).text().toLowerCase().match(filter)) {
                            $(value).parent().css('background-color', 'red')
                        }
                    }
                });

            } else {
                $('tr').css('background-color', 'transparent');
            }
        }
        if (app.config.filters.category) {
            if (search_text != '') {
                $('tr').css('background-color', 'transparent');
                var filter = new RegExp('\\b' + search_text.toLowerCase() + '\\b', 'gi');
                $.each($('td'), function (key, value) {
                    if ($(value).hasClass("category")) {
                        if ($(value).text().toLowerCase().match(filter)) {
                            $(value).parent().css('background-color', 'red')
                        }
                    }
                });

            } else {
                $('tr').css('background-color', 'transparent');
            }
        }
        if (app.config.filters.category && app.config.filters.name && app.config.filters.date) {
            if (search_text != '') {
                $('tr').css('background-color', 'transparent');
                var filter = new RegExp('\\b' + search_text.toLowerCase() + '\\b', 'gi');
                $.each($('td'), function (key, value) {
                    if ($(value).text().toLowerCase().match(filter)) {
                        $(value).parent().css('background-color', 'red')
                    }
                });

            } else {
                $('tr').css('background-color', 'transparent');
            }
        }
    },
    /*
    Function name: edit_document
    function args: dom(clicked dom element)
    description: Edit info for the clicked document
    return: /
    developer: Tihomir Jovchevski
    */
    edit_document: function (dom) {
  
        $.each(categories, function (key, value) {
            $('.categories').append('<option value="' + value.category_id + '">' + value.category_name + '</option>');
        });
        $('.edit_name').val($(dom).find('.name').html());
        $('.edit_desc').text($(dom).find('.doc_description').html());
        app.main.selected_doc_id = $(dom).find('.documentID').html();
        $('.edit_popup').fadeIn();
    },
    /*
    Function name: close_edit
    function args: /
    description: Close edit document popup
    return: /
    developer: Tihomir Jovchevski
    */
    close_edit: function () {
        $('.edit_popup').fadeOut();
    },
    /*
    Function name: save_popup
    function args: /
    description: Save edited document
    return: /
    developer: Tihomir Jovchevski
    */
    save_edit_popup: function () {
        var name = $('.edit_popup').find('.edit_name').val();
        var category = $('.edit_popup').find('.categories').val();
        var description = $('.edit_popup').find('.edit_desc').text();
        var docID = app.main.selected_doc_id;
        var obj = {
            'name': name,
            'cat': category,
            'description': description,
            'doc': docID
        };
        app.model.edit_doc(obj, function () {
            alert('document succesfully saved');
            app.main.close_edit();
        });
    },
    /*
    Function name: delete_document
    function args: dom(clicked dom element)
    description: delete clicked document
    return: /
    developer: Tihomir Jovchevski
    */
    delete_document: function (dom) {
        var documentID = {
            doc_id: $(dom).find('.documentID').html()
        };
        app.model.delete_doc(documentID, function () {
            $(dom).remove();
        });
    },
    /*
    Function name: create_new_doc
    function args: /
    description: Create new document
    return: /
    developer: Tihomir Jovchevski
    */
    create_new_doc: function () {
        $.each(categories, function (key, value) {
            $('.new_categories').append('<option value="' + value.category_id + '">' + value.category_name + '</option>');
        });
        $('.new_doc_popup').fadeIn();
    },
    /*
    Function name: save_new_doc
    function args: /
    description: save new document
    return: /
    developer: Tihomir Jovchevski
    */
    save_new_doc: function () {
        
        var file = document.getElementById('fileBox').files[0];
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = app.model.shipOff(event);
       
        var obj = {
            name: $('.new_doc_popup').find('.new_name').val(),
            description: $('.new_doc_popup').find('.new_desc').val(),
            category: $('.new_doc_popup').find('.new_categories').val()
        }
        app.model.new_document(event,obj, function () {
            alert('document was succesfully created');
            app.model.get_all_docs('', function (obj) {
                app.main.init_grid(obj);
                app.main.close_new_doc();
            });

        });
        
    },
        
    /*
    Function name: close_new_doc
    function args: /
    description: close new document popup
    return: /
    developer: Tihomir Jovchevski
    */
    close_new_doc: function () {
        $('.new_doc_popup').fadeOut();
    }

};