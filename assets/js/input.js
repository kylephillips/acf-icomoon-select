(function($){


	function initialize_field( $el ) {

		//$el.doStuff();

	}

    // user opens iconlist
	$(document).on('click', '[data-acf-icomoon-select-choose-button]', function(e){
		e.preventDefault();
		toggleSelectionList(e, true);
	});

    // user closes iconlist
	$(document).on('click', '[data-acf-icomoon-select-cancel-button]', function(e){
		e.preventDefault();
		toggleSelectionList(e, false);
	});

    // user chooses icon from open list
    $(document).on('click', '[data-acf-icomoon-choice]', function(e){
        e.preventDefault();
        populateField(e, $(this));
    });

    // user removes previously choosen icon
	$(document).on('click', '[data-acf-icomoon-remove-choice]', function(e){
		e.preventDefault();
		clearField($(this));
	});

	function populateField(e, element)
	{
		var value = $(element).attr('data-acf-icomoon-choice');
		var choiceField = $(element).closest('.acf-input').find('[data-acf-icomoon-choice-field]');
		choiceField.val(value);
		console.log('choiceField:', choiceField[0],'value: ' + choiceField.val());

		populatePreview(e, value);
	}

	function toggleSelectionList(e, visible)
	{
		console.log(e.target);
		var fieldgroup = $(e.target).closest('.acf-input');

		if ( visible ){
			fieldgroup.find('.acf-icomoon_select-icon-list').show();
			fieldgroup.find('[data-acf-icomoon-select-choose-button]').hide();
			fieldgroup.find('[data-acf-icomoon-select-cancel-button]').show();
			return;
		}
		fieldgroup.find('[data-acf-icomoon-select-cancel-button]').hide();
		fieldgroup.find('[data-acf-icomoon-select-choose-button]').show();
		fieldgroup.find('.acf-icomoon_select-icon-list').hide();
	}

	function populatePreview(e, choice)
	{
		var svg;
		var html;
		var fieldgroup = $(e.target).closest('.acf-input');

		$.each(fieldgroup.find('[data-acf-icomoon-choice]'), function(){
			if ( $(this).attr('data-acf-icomoon-choice') == choice ){
				$(this).addClass('active');
				svg = $(this).find('.svg');
			}
		});
		html = $(svg).html();
		html += '<p>' + choice + '<br><a href="#" data-acf-icomoon-remove-choice>Remove</a></p>';
		fieldgroup.find('[data-icomoon-icon-preview]').html(html).show();
		fieldgroup.find('.acf-icomoon_select-icon-list').hide();
		fieldgroup.find('[data-acf-icomoon-select-cancel-button]').hide();
	}

	function clearField(target)
	{
        var fieldgroup = $(target).closest('.acf-input');
		console.log('clearField:', fieldgroup, target);

		fieldgroup.find('[data-acf-icomoon-choice]').removeClass('active');
		fieldgroup.find('[data-icomoon-icon-preview]').empty().hide();
		fieldgroup.find('[data-acf-icomoon-choice-field]').val('');
		fieldgroup.find('[data-acf-icomoon-select-choose-button]').show();
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			/**
			* Loop through the type settings and hide/show choices
			*/
			var types = $('[data-name="selection_json_type"]');
			$.each(types, function(){
				var selection = $(this).find('select').val();
				toggleSettings(this, selection);
			});

			$(document).on('change', '[data-name="selection_json_type"] select', function(){
				var selection = $(this).val();
				toggleSettings(this, selection);
			});

			function toggleSettings(element, selection)
			{
				var path_choice = $(element).parents('table').find('[data-name="selection_json_path"]');
				var file_choice = $(element).parents('table').find('[data-name="selection_json_file"]');
				if ( selection === 'selection_json_file' ){
					$(path_choice).hide();
					$(file_choice).show();
					return;
				}
				$(file_choice).hide();
				$(path_choice).show();
			}

			// search $el for fields of type 'FIELD_NAME'
			acf.get_fields({ type : 'icomoon_select'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field[data-field_type="icomoon_select"]').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
