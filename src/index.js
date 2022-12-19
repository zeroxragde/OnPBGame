class BoardGame {
  constructor(obj) {
    var defaultprop = {
      viewport: {
        width: 600,
        height: 400,
      },
      map: {
        tiles: 15,
        size: 32,
      },
    };
    this.props = Object.assign(defaultprop, obj);
    var prop = this.extend(defaultprop, obj);
    console.log("jax", prop);

    if (!this.props.hasOwnProperty("id")) {
      throw new BoardGameExceptions("Falta el id del elemento del HTML...");
    } else {
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas_" + this.props.id);

      var width = this.props.map.tiles * this.props.map.size;
      var height = this.props.map.tiles * this.props.map.size;

      //console.log("hjax", this.props.map.tiles);

      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);

      this.el = document.getElementById(this.props.id);
      this.el.style.width = this.props.viewport.width + "px";
      this.el.style.height = this.props.viewport.height + "px";
      this.el.style.backgroundColor = "rgb(60, 0, 255)";
      this.el.style.overflow = "auto";
      this.el.appendChild(canvas);
      this.renderMap(canvas);
    }
  }
  renderMap(canvas) {
    var app = this;

    app.canvas = new fabric.Canvas(canvas, {
      selection: false,
    });
    var sizeGrid = (this.props.map.tiles - 1) * this.props.map.size;
    var realzise = this.props.map.tiles;

    for (var i = 0; i <= realzise; i++) {
      var linea1Op = [
        Math.round(i * this.props.map.size),
        0,
        Math.round(i * this.props.map.size),
        sizeGrid,
      ];

      var lineaH = new fabric.Line(linea1Op, {
        stroke: "#ccc",
        selectable: false,
      });
      app.canvas.add(lineaH);

      var linea2p = [
        0,
        Math.round(i * this.props.map.size),
        sizeGrid,
        Math.round(i * this.props.map.size),
      ];

      var lineaV = new fabric.Line(linea2p, {
        stroke: "#ccc",
        selectable: false,
      });
      app.canvas.add(lineaV);
    }
  }
  extend(a, b) {
    for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
  }
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  regularPolygonPoints(sideCount, radius) {
    var sweep = (Math.PI * 2) / sideCount;
    var cx = radius;
    var cy = radius;
    var points = [];
    for (var i = 0; i < sideCount; i++) {
      var x = cx + radius * Math.cos(i * sweep);
      var y = cy + radius * Math.sin(i * sweep);
      points.push({ x: x, y: y });
    }
    return points;
  }
}

class BoardGameExceptions {
  constructor(message) {
    const error = new Error(message);
    return error;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

var tablero = new BoardGame({
  id: "game",
  map: {
    tiles: 65,
  },
});
