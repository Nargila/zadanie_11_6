
//Tablica Kanban zadanie 11.6 KODILLA BOOTCAMP

$(function(){
	console.log('DOM loaded - you can have fun');

//GENEROWANIE LOSOWEGO ID

	function randomString() {
	    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	    var str = '';
	    for (var i = 0; i < 10; i++) {
	        str += chars[Math.floor(Math.random() * chars.length)];
	    }
	    return str;
	}

// TWORZENIE KLASY COLUMN

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn(){
			// ELEMENTY KOLUMNY
			var $column = $('<div>').addClass('column ');
			var $columnTitle = $('<h2>').addClass('column-title ').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete label label-primary').text('x');
			var $columnAddCard = $('<button>').addClass('add-card btn btn-default').text('Add a card');	
			var $columnHr = $('<hr>').addClass('breakline');
			// DODANIE EVENTÓW (USUŃ KOLUMNĘ, DODAJ KARTĘ)
			$columnDelete.click(function() {
				self.removeColumn();
			});
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt("Enter the name of the card")));
			});
			//KONSTRUKCJA KOLUMNY
			$column.append($columnDelete)
			.append($columnTitle)
	        .append($columnAddCard)
	        .append($columnHr)
	        .append($columnCardList);
			return $column;
		}
	}
		Column.prototype = {
    		addCard: function(card) {
      			this.$element.children('ul').append(card.$element);
   			 },
    		removeColumn: function() {
      			this.$element.remove();
   			 }
		};
	

// TWORZENIE KLASY KARTY 
	function Card (description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
		//ELEMENTY KARTY
			var $card = $('<li>').addClass('list-group-item');
		    var $cardDescription = $('<p>').addClass('card-description').text(self.description);
		    var $cardDelete = $('<button>').addClass('btn-delete').text('x');
		    //DODANIE EVENTU - USUWANIE KARTY
		    $cardDelete.click(function() {
		    	self.removeCard();
		    });
		    //STRUKTURA KARTY
		    $card.append($cardDelete)
				 .append($cardDescription);
			return $card;
		}
	}
		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
		}
		}
	
//TABLICA
	var board = {
		name: 'Kanban Board',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	}
//SORTOWANIE, PRZECIĄGANIE ELEMENTÓW
	function initSortable() {
	   $('.column-card-list').sortable({
	     connectWith: '.column-card-list',
	     placeholder: 'card-placeholder'
	   }).disableSelection();
	 };
	 $('.create-column').click(function(){
		var name = prompt('Enter a column name');
		var column = new Column(name);
	    	board.addColumn(column);
  	});
// TWORZENIE KOLUMN
	var todoColumn = new Column('To do');
	var doingColumn = new Column('Doing');
	var doneColumn = new Column('Done');

// DODANIE KOLUMN NA TABLICĘ
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

// TWORZENIE KART
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards');

// DODANIE KART DO KOLUMN
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);	 

});