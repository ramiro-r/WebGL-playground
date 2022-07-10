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

    const setColorErr = setFragColor(gl, 'u_FragColor', [1.0, 0.0, 0.0, 1.0]);
    if (setColorErr) {
        console.log('Error setting point color');
    }

    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Fail to init the buffers');
        return;
    }

    // set background to black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5 
    ]);
    const n = 4;

    // 1 - create a buffer object
    const vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
        console.log('Fail to create buffer');
        return -1;
    }

    // 2 - bind buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 3 - write data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 4 - assign the buffer object to a_Position variable
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Fail to get attribute position');
        return -1;
    }

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 5 - enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    return n;
}
