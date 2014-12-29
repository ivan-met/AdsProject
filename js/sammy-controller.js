$(function () {
    Sammy('main', function () {
        this.get('#/', function () {
            application.loadAllBooks();
        });
        
        this.get('#/add-book/', function () {
            application.renderAddBookForm();
        });
        
        this.get('#/delete-book/:id', function (context) {
            application.getAndVisualizeSingleCategory(this.params['id']);
        });

        this.get('#/edit/:id', function (context) {
            application.renderEditBookForm(this.params['id']);
        });
    }).run('#/');
});