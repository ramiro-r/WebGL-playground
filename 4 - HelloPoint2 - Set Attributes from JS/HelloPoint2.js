const VSHADER_SOURCE = 
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
        'gl_Position = a_Position;\n' +
        'gl_PointSize = a_PointSize;\n' +
    '}\n';

const FSHADER_SOURCE = 
    'void main() {\n' +
        'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);' +
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

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 10.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}
