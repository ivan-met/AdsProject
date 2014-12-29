var application = (function() {
	'use strict'
	var baseUrl = 'https://api.parse.com/1/classes/Book';

	var loadAllBooks = function() {
		var container = $('main');
		container.html('');
		$('header ul li').removeClass('active');
		$('header ul li:eq(0)').addClass('active');

		var booksPromise = ajaxRequester.get(baseUrl, function (data) {
			$.each(data.results, function (_, book) {
				var $bookElem = view.renderBook(book);
				$bookElem.appendTo(container);
			});
		}, function (err) {
			console.log(err);
		});
	}

	function renderAddBookForm() {
		var container = $('main');
		container.html('');
		$('header ul li').removeClass('active');
		$('header ul li:eq(1)').addClass('active');

		var $form = view.renderAddForm();
		$form.appendTo(container);
	}

	function renderEditBookForm(id) {
		var container = $('main');
		container.html('');
		$('header ul li').removeClass('active');

		var $form = view.renderAddForm();
		$form.appendTo(container);
		ajaxRequester.get(baseUrl + '/' + id, function (data) {
			$('form #title').val(data.title);
			$('form #isbn').val(data.isbn);
			$('form #author').val(data.author);
			$('form')
				.data('id', data.objectId);
		}, function (err) {
			console.log(err);
		});
		$('form')
			.data('id', id)
			.attr('method', 'put')
			.attr('action', 'javascript:;');
		$('form button').text('Edit book');
	}

	$(document).on('click', 'form button', addBookButtonClicked);
	$(document).on('click', '.delete', deleteButtonClicked);
	$(document).on('click', '.edit', editButtonClicked);

	function addBookButtonClicked() {
		var method = $('form').attr('method');
		var book = {
			title: $('form #title').val(),
			author: $('form #author').val(),
			isbn: $('form #isbn').val()
		}
		if (book.title.length > 0 && book.author.length > 0){
			switch (method) {
				case 'post':
					var addPromise = ajaxRequester.post(baseUrl, book, function (data) {
						var n = noty({
							text: 'NOTY - a jquery notification library!',
							animation: {
								open: {height: 'toggle'}, // jQuery animate function property object
								close: {height: 'toggle'}, // jQuery animate function property object
								easing: 'swing', // easing
								speed: 500 // opening & closing animation speed
							}
						});
						// alert('Book added!');
						location.href = "#/";
					}, function (err) {
						console.log('Error occured');
						console.log(err);
					});
					break;
				case 'put':
					var id = $('form').data('id');
					var addPromise = ajaxRequester.put(baseUrl + '/' + id, book, function (data) {
						// TODO: add success msg
						alert('Book edited!');
						location.href = '#/';	
					}, function (err) {
						console.log('Error occured');
						console.log(err);
					});
					break;
				default:
					alert('Error');
					console.log('Not implemented!');
			}
		} else {
			alert('Fill all fields');
			//TODO: add noty
			console.log(book);
		}
	}

	function deleteButtonClicked(e) {
		var conf = confirm("Are you sure you want to delete the book?");
		if (conf) {
			var id = $(this).parent().data('id');
			ajaxRequester.delete(baseUrl + '/' + id, function (data) {
				alert('Book deleted!');
				$(e.target).parent().remove();
			}, function (err) {
				console.log(err);
			});
		}
	}

	function editButtonClicked() {
		var id = $(this).parent().data('id');
		location.href = "#/edit/" + id;
	}

	return {
		loadAllBooks: loadAllBooks,
		renderAddBookForm: renderAddBookForm,
		renderEditBookForm: renderEditBookForm
	}
}());