import { Draggable } from "../models/drag-drop"
import { Component } from "../components/base-component"
import { Project } from "../models/project"

export class ProjectItem
  extends Component<HTMLUListElement, HTMLElement>
  implements Draggable
{
  private project: Project;

  get peopleText() {
    if (this.project.people === 1) {
      return "1 person";
    } else {
      return this.project.people.toString() + " people";
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.peopleText;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  configure(): void {
    this.element.addEventListener(
      "dragstart",
      this.dragStartHandler.bind(this)
    );
    this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
  }

  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent): void {
    console.log("dragEndHandler");
  }
}
