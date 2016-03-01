(function(global) {
    var currClientWidth, fontValue, originWidth = 320;
    __resize();

    function __resize() {
        currClientWidth = document.documentElement.clientWidth;
        currClientWidth = (currClientWidth > 640) ? 640 : currClientWidth;
        currClientWidth = (currClientWidth < 320) ? 320 : currClientWidth;
        fontValue = ((62.5 * currClientWidth) / originWidth).toFixed(2);
        document.documentElement.style.fontSize = fontValue + '%';
    }

    var drawingBoardState = {
        color: 'rgb(91,48,11)',
        mode: 'pencil',
        lineWidth: 5
    };
    var drawingBoard = new DrawingBoard.Board('drawing-board', {
        controls: false,
        color: drawingBoardState.color,
        size: drawingBoardState.lineWidth
    });

    function __setBoardState(state) {
        var color = (state.mode === 'eraser') ? '#fff' : state.color;
        drawingBoard.setColor(color);
        drawingBoard.ctx.lineWidth = state.lineWidth;
    }

    $('.colors').on('click', function(e) {
        var color = e.target.getAttribute('data-color');
        if (drawingBoardState.mode === 'brush') {
            color = color.replace(')', ',0.3)').replace('rgb', 'rgba');
        }
        drawingBoardState.color = color;
        __setBoardState(drawingBoardState);
    });
    $('.pencil').on('click', function(e) {
        drawingBoardState.mode = 'pencil';
        var color = drawingBoardState.color.replace(',0.3)', ')').replace('rgba', 'rgb');
        drawingBoardState.lineWidth = 5;
        drawingBoardState.color = color;
        __setBoardState(drawingBoardState);
    });
    $('.brush').on('click', function(e) {
        drawingBoardState.mode = 'brush';
        var color = drawingBoardState.color.replace(')', ',0.3)').replace('rgb', 'rgba');
        drawingBoardState.lineWidth = 10;
        drawingBoardState.color = color;
        __setBoardState(drawingBoardState);
    });
    $('.eraser').on('click', function(e) {
        drawingBoardState.mode = 'eraser';
        drawingBoardState.lineWidth = 20;
        __setBoardState(drawingBoardState);
    });
    $('.bin').on('click', function(e) {
        drawingBoard.reset({ background: true });
    });
    $('.finish-btn').on('click', function(e) {
        alert('finished!')
    });
})(window);
