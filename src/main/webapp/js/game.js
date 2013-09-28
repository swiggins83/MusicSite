Game = {
	// grid size
	map_grid: {
		width: $(document).width,
		height: $(document).height,
		tile: {
			width: $(document).width / 16,
			height: $(document).height / 8
		}
	},

	width: function() {
		return this.map_grid.width * this.map_grid.tile.width;
	},

	height: function() {
		return this.map_grid.height * this.map_grid.tile.height;
	}, 

	start: function() {
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(0, 0, 0)');

		for (var x=0; x < Game.map_grid.width; x++) {
			for (var y=0; y < Game.map_grid.height; y++) {
				var at_edge = x == 0 ||
					x == Game.map_grid.width -1 ||
					y == 0 ||
					y == Game.map_grid.height - 1;

				if (at_edge) {
					Craft.e('Tree').at(x, y);
				} else if (Math.random() < 0.06) {
					Crafty.e('Tree').at(x, y).flip();
				}
			}
		}
	}
};
