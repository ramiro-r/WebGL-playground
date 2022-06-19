const VSHADER_SOURCE = 
    'void main() {\n' +
        'gl_Position = vec4(0.0, 0.5, 0.0, 1.0);\n' +
        'gl_PointSize = 10.0;\n' +
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

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}
