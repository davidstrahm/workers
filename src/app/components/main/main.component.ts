/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { animationFrameScheduler, exhaustMap, interval, map, take } from 'rxjs';
import * as Stats from 'stats.js';

@Component({
    selector: 'workers-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements AfterViewInit {
    @ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement> | undefined;

    stats = new Stats();

    size = 150;
    x = 200;
    y = 200;
    z = 100;
    vertices = [
        [this.x - this.size / 2, this.y - this.size / 2, this.z - this.size / 2],
        [this.x + this.size / 2, this.y - this.size / 2, this.z - this.size / 2],
        [this.x + this.size / 2, this.y + this.size / 2, this.z - this.size / 2],
        [this.x - this.size / 2, this.y + this.size / 2, this.z - this.size / 2],
        [this.x - this.size / 2, this.y - this.size / 2, this.z + this.size / 2],
        [this.x + this.size / 2, this.y - this.size / 2, this.z + this.size / 2],
        [this.x + this.size / 2, this.y + this.size / 2, this.z + this.size / 2],
        [this.x - this.size / 2, this.y + this.size / 2, this.z + this.size / 2],
    ];

    // set up rotation parameters
    angleX = Math.PI / 90;
    angleY = Math.PI / 180;

    constructor() {
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);
    }

    ngAfterViewInit(): void {
        const canvas = this.myCanvas?.nativeElement;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        interval(0, animationFrameScheduler)
            .pipe(
                map(() => {
                    this.stats.begin();
                    this.drawCube(ctx, canvas, this.vertices, this.x, this.y, this.z, this.angleX, this.angleY);
                    this.stats.end();
                }),
            )
            .subscribe();

        interval(5000)
            .pipe(
                map(x => {
                    // interval(0).pipe(take(1000
                    // ))
                    console.log('interval', x);

                    // for (let i = 0; i < 10000; i++) {
                    //     console.log('loop');
                    // }
                }),
                take(5),
            )
            .subscribe();
        // console.log('start');
        // this.simulateHighCpuLoad(100, 20000);
        // console.log('end');
    }

    drawCube(
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        vertices: number[][],
        x: number,
        y: number,
        z: number,
        angleX: number,
        angleY: number,
    ) {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // rotate vertices
        for (let i = 0; i < vertices.length; i++) {
            const vertex = vertices[i];
            const dx = vertex[0] - x;
            const dy = vertex[1] - y;
            const dz = vertex[2] - z;

            const dx1 = dx;
            const dy1 = dy * Math.cos(angleX) - dz * Math.sin(angleX);
            const dz1 = dy * Math.sin(angleX) + dz * Math.cos(angleX);

            const dx2 = dx1 * Math.cos(angleY) + dz1 * Math.sin(angleY);
            const dy2 = dy1;
            const dz2 = -dx1 * Math.sin(angleY) + dz1 * Math.cos(angleY);

            vertices[i] = [dx2 + x, dy2 + y, dz2 + z];
        }

        // set canvas background color
        ctx.fillStyle = '#161B22';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // draw edges
        ctx.strokeStyle = 'orange';
        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);
        ctx.lineTo(vertices[1][0], vertices[1][1]);
        ctx.lineTo(vertices[2][0], vertices[2][1]);
        ctx.lineTo(vertices[3][0], vertices[3][1]);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(vertices[4][0], vertices[4][1]);
        ctx.lineTo(vertices[5][0], vertices[5][1]);
        ctx.lineTo(vertices[6][0], vertices[6][1]);
        ctx.lineTo(vertices[7][0], vertices[7][1]);
        ctx.closePath();
        ctx.stroke();

        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(vertices[i][0], vertices[i][1]);
            ctx.lineTo(vertices[i + 4][0], vertices[i + 4][1]);
            ctx.stroke();
        }
    }

    simulateHighCpuLoad(interval: number, duration: number) {
        const startTime = Date.now();
        const endTime = startTime + duration;
        while (Date.now() < endTime) {
            if ((Date.now() - startTime) % interval === 0) {
                for (let i = 0; i < 1e9; i++) {
                    // console.log('loop');
                }
            }
        }
    }
}
