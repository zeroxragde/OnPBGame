class BoardGame {
  constructor(obj) {
    var defaultprop = {
      viewport: {
        width: 800,
        height: 800
      },
      map: {
        width: 500,
        height: 500,
        size: 32
      }
    };
    this.props = Object.assign(defaultprop, obj);

    if (!this.props.hasOwnProperty("id")) {
      throw new BoardGameExceptions("Falta el id del elemento del HTML...");
    } else {
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas_" + this.props.id);
      canvas.setAttribute("width", this.props.map.width);
      canvas.setAttribute("height", this.props.map.height);

      this.renderMap(canvas);
      this.el = document.getElementById(this.props.id);

      this.el.style.width = this.props.viewport.width + "px";
      this.el.style.height = this.props.viewport.height + "px";
      this.el.style.backgroundColor = "#00078c";
      this.el.style.overflow = "auto";

      this.el.appendChild(canvas);
    }
  }
  renderMap(canvas) {
    var app = this;

    app.canvas = new fabric.Canvas(canvas, {
      selection: false
    });

    for (
      var i = 0;
      i < Math.round(this.props.map.width / this.props.map.size);
      i++
    ) {
      var linea1Op = [
        Math.round(i * this.props.map.size),
        0,
        Math.round(i * this.props.map.size),
        this.props.map.width
      ];

      var lineaH = new fabric.Line(linea1Op, {
        stroke: "#ccc",
        selectable: false
      });
      app.canvas.add(lineaH);

      var linea2p = [
        0,
        Math.round(i * this.props.map.size),
        this.props.map.width,
        Math.round(i * this.props.map.size)
      ];

      var lineaV = new fabric.Line(linea2p, {
        stroke: "#ccc",
        selectable: false
      });
      app.canvas.add(lineaV);
    }
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
  id: "game"
});
