var view = (function() {
	var renderBook = function(book) {
		var div = $('<div />');
		div
			.data('id', book.objectId)
			.text(book.title + ' (by ' + book.author + ') - ' + book.isbn)
			.append(
				$('<span>').addClass('edit')
			)
			.append(
				$('<span>').addClass('delete')
			)

		return $(div);
	}

	var renderForm = function renderForm(data) {
		var form = $('<form>');
		form
			.attr('action', '#/add-book')
			.attr('method', 'post');

		var titleLabel = $('<label />'),
			authorLabel = $('<label />'),
			isbnLabel = $('<label />'),
			button = $('<button />');
		titleLabel
			.text('Book title')
			.append(
				$('<input/>')
					.attr('type', 'text')
					.attr('placeholder', 'Book title')
					.attr('id', 'title')
			)
		authorLabel
			.text('Book author')
			.append(
				$('<input/>')
					.attr('type', 'text')
					.attr('placeholder', 'Book author')
					.attr('id', 'author')
			)
		isbnLabel
			.text('Book ISBN')
			.append(
				$('<input/>')
					.attr('type', 'text')
					.attr('placeholder', 'Book isbn')
					.attr('id', 'isbn')
			)

		if(data !== undefined) {
			// $('input', $(titleLabel)).val(data.title);
			// $('input', $(authorLabel)).val(data.author);
			// $('input', $(isbnLabel)).val(data.isbn);
		}

		button.text('Add book');

		titleLabel.appendTo(form);
		authorLabel.appendTo(form);
		isbnLabel.appendTo(form);
		button.appendTo(form);
		return $(form);
	}

	return {
		renderBook: renderBook,
		renderAddForm: renderForm,
		renderEditForm: renderForm
	}
}());