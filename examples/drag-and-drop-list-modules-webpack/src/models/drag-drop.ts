export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  drapLeaveHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
}

