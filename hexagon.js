function line_render(){
    $("#grid_svg-grid").attr("fill", "url(#pattern_line)");
    var pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = "";
    
    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_line");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", sizes[config.format][0]);
    pattern.setAttribute("height", sizes[config.format][1]);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

    var hexagonWidth = parseInt(config.grid.dim);
    var hexagonHeight = Math.sqrt(3) * hexagonWidth / 2;
    var numRows = Math.ceil((sizes[config.format][1] - parseInt(config.margin.t) - parseInt(config.margin.b)) / hexagonHeight);
    var numCols = Math.ceil((sizes[config.format][0] - parseInt(config.margin.l) - parseInt(config.margin.r)) / hexagonWidth);

    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            var hexagon = document.createElementNS(svgns, "polygon");
            var x = parseInt(config.margin.l) + col * hexagonWidth + (row % 2) * hexagonWidth / 2;
            var y = parseInt(config.margin.t) + row * hexagonHeight;
            var points = [
                [x, y + hexagonHeight / 2],
                [x + hexagonWidth / 4, y],
                [x + 3 * hexagonWidth / 4, y],
                [x + hexagonWidth, y + hexagonHeight / 2],
                [x + 3 * hexagonWidth / 4, y + hexagonHeight],
                [x + hexagonWidth / 4, y + hexagonHeight]
            ];
            var pointsString = points.map(function(point) {
                return point.join(",");
            }).join(" ");
            hexagon.setAttribute("points", pointsString);
            hexagon.setAttribute("fill", config.grid_color);
            pattern.appendChild(hexagon);
        }
    }
}

function line_export(pdfdoc){
    var hexagonWidth = parseInt(config.grid.dim);
    var hexagonHeight = Math.sqrt(3) * hexagonWidth / 2;
    var numRows = Math.ceil((sizes[config.format][1] - parseInt(config.margin.t) - parseInt(config.margin.b)) / hexagonHeight);
    var numCols = Math.ceil((sizes[config.format][0] - parseInt(config.margin.l) - parseInt(config.margin.r)) / hexagonWidth);

    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            var x = parseInt(config.margin.l) + col * hexagonWidth + (row % 2) * hexagonWidth / 2;
            var y = parseInt(config.margin.t) + row * hexagonHeight;
            var lineWidth = config.grid.thickness * 0.75;
            var lineLength = hexagonWidth * 0.75;
            var lineOffsetX = config.margin.l * 0.75;
            var lineOffsetY = y * 0.75;

            pdfdoc.setLineWidth(lineWidth);
            pdfdoc.line(
                lineOffsetX, lineOffsetY + hexagonHeight / 2, 
                lineOffsetX + lineLength / 4, lineOffsetY, 
                "S"
            );
            pdfdoc.line(
                lineOffsetX + lineLength / 4, lineOffsetY, 
                lineOffsetX + 3 * lineLength / 4, lineOffsetY, 
                "S"
            );
            pdfdoc.line(
                lineOffsetX + 3 * lineLength / 4, lineOffsetY, 
                lineOffsetX + lineLength, lineOffsetY + hexagonHeight / 2, 
                "S"
            );
            pdfdoc.line(
                lineOffsetX + lineLength, lineOffsetY + hexagonHeight / 2, 
                lineOffsetX + 3 * lineLength / 4, lineOffsetY + hexagonHeight, 
                "S"
            );
            pdfdoc.line(
                lineOffsetX + 3 * lineLength / 4, lineOffsetY + hexagonHeight, 
                lineOffsetX + lineLength / 4, lineOffsetY + hexagonHeight, 
                "S"
            );
            pdfdoc.line(
                lineOffsetX + lineLength / 4, lineOffsetY + hexagonHeight, 
                lineOffsetX, lineOffsetY + hexagonHeight / 2, 
                "S"
            );
        }
    }
}
