const VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
        'gl_Position = a_Position;\n' +
        'gl_PointSize = a_PointSize;\n' +
    '}\n';

const FSHADER_SOURCE = 
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
    'void main() {\n' +
        'gl_FragColor = u_FragColor;' +
    '}\n';

function main() {
    const canvas = document.getElementById('webgl');

    if (!canvas) {
        console.log('not able to find canvas element');
        return;
    }

    const gl = getWebGLContext(canvas);
    
    if (!gl) {
        console.log('not able to retrieve WebGL context');
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Error initializing shaders');
        return;
    }

    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Fail to get attribute position');
        return;
    }

    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_PointSize < 0) {
        console.log('Fail to get attribute point size');
        return;
    }

    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Fail to get u_FragColor');
        return;
    }

    gl.vertexAttrib1f(a_PointSize, 10.0);

    // set listeners
    canvas.addEventListener('mousedown', function(ev) { click(ev, gl, canvas, a_Position, u_FragColor)});

    // set background to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = [];
const g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX;
    let y = ev.clientY;
    const rect = ev.target.getBoundingClientRect();
    const canvasHalfWidth = canvas.width/2;
    const canvasHalfHeight = canvas.height/2;

    x = ((x - rect.left) - canvasHalfWidth) / (canvasHalfWidth);
    y = (canvasHalfHeight - (y - rect.top)) / canvasHalfHeight;

    g_points.push([x, y]);

    setColorPoint(x, y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    for(let i=0;i< g_points.length; i++) {
        const xy = g_points[i];
        const rgb = g_colors[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.uniform4f(u_FragColor, rgb[0], rgb[1], rgb[2], rgb[3]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

function setColorPoint(x, y) {
    if (x > 0.0 && y > 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]); // red
    } else if (x < 0.0 && y > 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0]); // green
    } else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 0.0, 1.0, 1.0]) // blue
    } else {
        g_colors.push([1.0, 0.0, 1.0, 1.0])
    }
}
