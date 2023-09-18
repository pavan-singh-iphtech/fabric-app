import { Component, AfterViewInit } from '@angular/core';
import { fabric } from 'fabric';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  private canvas!: fabric.Canvas;
  private selectTool:string |undefined
 line:any;
 rect:any;
 triangle:any;
 path : fabric.Path | null = null;
 mouseDown = false;
 selectedColor:string = '#000000'
 startX!: number;
 startY!: number;
 ngAfterViewInit(): void {
   // Initiate a canvas instance
   this.canvas = new fabric.Canvas('canvas',{
    hoverCursor: 'pointer'
   });
   this.canvas.setWidth(1000);
   this.canvas.setHeight(400);
   let addingLineBtn1 = document.getElementById('adding-line-btn1');
   addingLineBtn1?.addEventListener('click', this.activateAddingLine.bind(this)); // Bind this to the method
  //  2
  let addingLineBtn2 = document.getElementById('adding-line-btn2');
  addingLineBtn2?.addEventListener('click', this.activateAddingLine.bind(this)); 
  // 3
  let addingLineBtn3 = document.getElementById('adding-line-btn3');
  addingLineBtn3?.addEventListener('click', this.activateAddingLine.bind(this)); 
  }
  activateAddingLine() {
    this.canvas.on('mouse:down', (e: fabric.IEvent) => this.startAddingLine(e)); // Use the correct event type
    this.canvas.on('mouse:move', (e: fabric.IEvent) => this.startDrawingLine(e)); // Use the correct event type
    this.canvas.on('mouse:up', () => this.stopDrawingLine()); // No event parameter needed here
    this.canvas.selection = false;
  }
  // mousedown function fire
  startAddingLine(o: fabric.IEvent) {
   this.mouseDown = true;
   let pointer = this.canvas.getPointer(o.e);
   console.log("mousedown pointer",pointer)
   if(this.selectTool === 'line' && this.mouseDown) {
     this.line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
     stroke:this.selectedColor,
     strokeWidth:5,
     hasControls:true
    });
   this.canvas.add(this.line);
   this.canvas.requestRenderAll();
   }else if (this.selectTool === 'triangle' && this.mouseDown){
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.triangle = new fabric.Triangle({
      left:this.startX,
      top: this.startY, 
      width:0,
      height:0,
      strokeWidth:5,
      stroke:this.selectTool,
      fill:'transparent'
    })
    this.canvas.add(this.triangle);
    this.canvas.requestRenderAll();
   }else if (this.selectTool === 'rectangle' && this.mouseDown){
    this.startX = pointer.x;
    this.startY = pointer.y;
    this.rect = new fabric.Rect({
      left: this.startX,
      top: this.startY,
      width: 0,
      height: 0,
      stroke: this.selectedColor,
      strokeWidth: 5,
      fill:'transparent'
    });
    this.canvas.add(this.rect);
    this.canvas.requestRenderAll();
   }else if (this.selectTool === 'circle' && this.mouseDown){
    
   }else if (this.selectTool === 'ellips' && this.mouseDown){
    
   }else{

   }
  }
  // mousemove function fire
  startDrawingLine(o: fabric.IEvent) {
    if(this.selectTool === 'line' && this.mouseDown){
      let pointer = this.canvas.getPointer(o.e);
      this.line.set({
        x2:pointer.x,
        y2:pointer.y
      });
      this.canvas.requestRenderAll()
    }else if(this.selectTool === 'triangle' && this.mouseDown){
      let pointer = this.canvas.getPointer(o.e);
      const width = pointer.x - this.startX;
      const height = pointer.y - this.startY;
      this.triangle.set({
        left: width >= 0 ? this.startX : pointer.x,
        top: height >= 0 ? this.startY : pointer.y,
        width: Math.abs(width),
        height: Math.abs(height)
      });
      this.canvas.requestRenderAll()
    }else if(this.selectTool === 'rectangle' && this.mouseDown){
      let pointer = this.canvas.getPointer(o.e);
    const width = pointer.x - this.startX;
    const height = pointer.y - this.startY;
    console.log("width,height",width,height)
    // Set the left and top properties to correctly position the rectangle
    this.rect.set({
      left: width >= 0 ? this.startX : pointer.x,
      top: height >= 0 ? this.startY : pointer.y,
      width: Math.abs(width),
      height: Math.abs(height)
    });

    this.canvas.requestRenderAll();
    }
    
  }
  // mouseup event fire
  stopDrawingLine() {
   this.mouseDown = false;
   this.rect=undefined;
  } 
  selectedTool(data:string){
    this.selectTool = data;
    console.log(data)
  }
}  