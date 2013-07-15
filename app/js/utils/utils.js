O5.utils = O5.utils || {};
_.extend(O5.utils, {
	nlToBR: function(txt) {
		return _.escape(txt).replace(/\n/g, '<br>');
	},

	notify: function(message, tag, opts) {
		tag = tag || 'warning';
		opts = _.extend({
			'animateIn': true,
			'allowHTML': false,
			'hideAfter': (tag == 'error' ? 10000 : 5000) // # of milliseconds after which to hide the message, 0 to require manual close
		}, opts || {});

		var $container = $('#o5notifications');
		if (!$container.length) {
			$container = $('<div id="o5notifications" />');
			$('.o5 .mainpane').append($container);
			$container.on('click', '.close', function(e) {
				e.preventDefault();
				var $notification = $(e.target).closest('.o5notification');
				$notification.slideUp(400, function() { $notification.remove(); });
			});
		}
		if (!opts.allowHTML) {
			message = _.escape(message);
		}

		var html = '<div class="o5notification ' + tag + '"><a href="#" class="close">&times;</a>'
			+ message + '</div>';
		var $el = $(html);

		if (opts.animateIn) {
			$el.hide();
		}
		$container.append($el);
		if (opts.animateIn) {
			$el.slideDown();
		}

		var close = function() {
			$el.find('a.close').click();
		};

		if (opts.hideAfter) {
			setTimeout(close, opts.hideAfter);
		}
		return { close: close};
	},

	GhostSelect: O5.views.BaseView.extend({
		// A select box that hovers invisibly in front of another item,
		// capturing its clicks and popping up when the target item is
		// clicked.

		tagName: 'select',

		className: 'ghost-select',

		initialize: function() {
			O5.views.BaseView.prototype.initialize.call(this);

			_.bindAll(this, 'update');

			this.$target = this.options.$target;
			this.choices = this.options.choices;

			this.$el.css({
				'-webkit-appearance': 'menulist-button',
				position: 'absolute',
				opacity: 0
			});

			var self = this;
			_.each(this.choices, function(text, val) {
				self.$el.append(
					$(document.createElement('option')).attr('value', val).text(text)
				);
			});

			this.update();

			this.$target.one('mousedown focus mouseover keypress', this.update);

			// The constructor inserts the element into the DOM
			this.$target.before(this.$el);
		},

		update: function() {
			this.$el.css({
				fontSize: this.$target.css('font-size'),
				width: this.$target.outerWidth(),
				height: this.$target.outerHeight()
			});
			this.$el.offset(this.$target.offset());
		}



	})

});