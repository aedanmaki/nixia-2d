// THIS COMPONENT IS AI GENERATED
import { Base } from "./Base";
import { RenderBuffer, RenderBuffer_Type } from "./RenderBuffer";

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_uv;
uniform vec2 u_resolution;
uniform vec2 u_position;
uniform vec2 u_size;
uniform float u_rotation;
varying vec2 v_uv;
varying vec2 v_local;

void main() {
    vec2 local = (a_position - vec2(0.5)) * u_size;
    float c = cos(u_rotation);
    float s = sin(u_rotation);
    vec2 rotated = vec2(local.x * c - local.y * s, local.x * s + local.y * c);
    vec2 pixel = u_position + u_size * 0.5 + rotated;
    vec2 clip = pixel / u_resolution * 2.0 - 1.0;
    gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
    v_uv = a_uv;
    v_local = a_position;
}`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec4 u_color;
uniform int u_shape;
uniform sampler2D u_texture;
varying vec2 v_uv;
varying vec2 v_local;

void main() {
    if (u_shape == 1 && distance(v_local, vec2(0.5, 0.5)) > 0.5) {
        discard;
    }

    if (u_shape == 2) {
        gl_FragColor = texture2D(u_texture, v_uv) * u_color;
    } else {
        gl_FragColor = u_color;
    }
}`;

const QUAD_VERTICES = new Float32Array([
    0, 0, 0, 0,
    1, 0, 1, 0,
    0, 1, 0, 1,
    0, 1, 0, 1,
    1, 0, 1, 0,
    1, 1, 1, 1
]);

/**
 * Draws render buffers to a WebGL canvas.
 */
export class Renderer extends Base {
    private readonly canvas: HTMLCanvasElement;
    private readonly gl: WebGLRenderingContext;
    private readonly program: WebGLProgram;
    private readonly vertexBuffer: WebGLBuffer;
    private readonly whiteTexture: WebGLTexture;
    private readonly positionAttribute: number;
    private readonly uvAttribute: number;
    private readonly resolutionUniform: WebGLUniformLocation;
    private readonly positionUniform: WebGLUniformLocation;
    private readonly sizeUniform: WebGLUniformLocation;
    private readonly rotationUniform: WebGLUniformLocation;
    private readonly colorUniform: WebGLUniformLocation;
    private readonly shapeUniform: WebGLUniformLocation;
    private readonly textureUniform: WebGLUniformLocation;
    private readonly imageTextures = new Map<string, WebGLTexture | null>();

    public buffers: RenderBuffer[] = [];

    constructor() {
        super();

        this.canvas = document.createElement("canvas");
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.canvas.style.border = "1px solid black";
        document.body.appendChild(this.canvas);

        const gl = this.canvas.getContext("webgl", { alpha: true, antialias: true });
        if (!gl) {
            throw new Error("WebGL is not available in this browser.");
        }
        this.gl = gl;

        this.program = this.createProgram(VERTEX_SHADER, FRAGMENT_SHADER);
        const vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
            throw new Error("Unable to create the WebGL vertex buffer.");
        }
        this.vertexBuffer = vertexBuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, QUAD_VERTICES, gl.STATIC_DRAW);

        this.positionAttribute = this.getAttributeLocation("a_position");
        this.uvAttribute = this.getAttributeLocation("a_uv");
        this.resolutionUniform = this.getUniformLocation("u_resolution");
        this.positionUniform = this.getUniformLocation("u_position");
        this.sizeUniform = this.getUniformLocation("u_size");
        this.rotationUniform = this.getUniformLocation("u_rotation");
        this.colorUniform = this.getUniformLocation("u_color");
        this.shapeUniform = this.getUniformLocation("u_shape");
        this.textureUniform = this.getUniformLocation("u_texture");

        const whiteTexture = gl.createTexture();
        if (!whiteTexture) {
            throw new Error("Unable to create the WebGL fallback texture.");
        }
        this.whiteTexture = whiteTexture;
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255, 255])
        );
        this.setTextureParameters();

        gl.useProgram(this.program);
        gl.uniform1i(this.textureUniform, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    public clear(): void {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    public draw(): void {
        const gl = this.gl;
        gl.useProgram(this.program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.enableVertexAttribArray(this.positionAttribute);
        gl.vertexAttribPointer(this.positionAttribute, 2, gl.FLOAT, false, 16, 0);
        gl.enableVertexAttribArray(this.uvAttribute);
        gl.vertexAttribPointer(this.uvAttribute, 2, gl.FLOAT, false, 16, 8);
        gl.uniform2f(this.resolutionUniform, this.canvas.width, this.canvas.height);

        for (const buffer of this.buffers) {
            const shape = this.getShape(buffer);
            let texture = this.whiteTexture;

            if (shape === 2) {
                if (!buffer.imageSource) {
                    throw new Error("Image render buffers require an image source.");
                }
                const imageTexture = this.getImageTexture(buffer.imageSource);
                if (!imageTexture) {
                    continue;
                }
                texture = imageTexture;
            }

            const { position, rotation, scale } = buffer.transform;
            gl.uniform2f(this.positionUniform, position.x, position.y);
            gl.uniform2f(this.sizeUniform, scale.x, scale.y);
            gl.uniform1f(this.rotationUniform, rotation.deg * Math.PI / 180);
            gl.uniform4fv(this.colorUniform, buffer.color);
            gl.uniform1i(this.shapeUniform, shape);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }

    private getShape(buffer: RenderBuffer): number {
        switch (buffer.bufferType) {
            case RenderBuffer_Type.Rectangle:
                return 0;
            case RenderBuffer_Type.Circle:
                return 1;
            case RenderBuffer_Type.Image:
                return 2;
        }
    }

    private getImageTexture(source: string): WebGLTexture | undefined {
        if (this.imageTextures.has(source)) {
            return this.imageTextures.get(source) ?? undefined;
        }

        this.imageTextures.set(source, null);
        const image = new Image();
        if (!source.startsWith("data:") && !source.startsWith("blob:")) {
            image.crossOrigin = "anonymous";
        }
        image.onload = () => {
            const texture = this.gl.createTexture();
            if (!texture) {
                console.error(`Unable to create a texture for image "${source}".`);
                return;
            }
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                image
            );
            this.setTextureParameters();
            this.imageTextures.set(source, texture);
        };
        image.onerror = () => {
            console.error(`Failed to load render image "${source}".`);
        };
        image.src = source;

        return undefined;
    }

    private setTextureParameters(): void {
        const gl = this.gl;
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    private createProgram(vertexSource: string, fragmentSource: string): WebGLProgram {
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);
        const program = this.gl.createProgram();
        if (!program) {
            throw new Error("Unable to create the WebGL shader program.");
        }

        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        this.gl.deleteShader(vertexShader);
        this.gl.deleteShader(fragmentShader);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const log = this.gl.getProgramInfoLog(program);
            this.gl.deleteProgram(program);
            throw new Error(`Unable to link the WebGL shader program: ${log ?? "unknown error"}`);
        }
        return program;
    }

    private createShader(type: number, source: string): WebGLShader {
        const shader = this.gl.createShader(type);
        if (!shader) {
            throw new Error("Unable to create a WebGL shader.");
        }

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const log = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);
            throw new Error(`Unable to compile a WebGL shader: ${log ?? "unknown error"}`);
        }
        return shader;
    }

    private getAttributeLocation(name: string): number {
        const location = this.gl.getAttribLocation(this.program, name);
        if (location < 0) {
            throw new Error(`WebGL shader attribute "${name}" was not found.`);
        }
        return location;
    }

    private getUniformLocation(name: string): WebGLUniformLocation {
        const location = this.gl.getUniformLocation(this.program, name);
        if (!location) {
            throw new Error(`WebGL shader uniform "${name}" was not found.`);
        }
        return location;
    }
}
