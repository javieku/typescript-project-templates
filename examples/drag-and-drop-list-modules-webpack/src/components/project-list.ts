import { Component } from "./base-component"
import { ProjectInput } from "./project-input"
import { DragTarget } from "../models/drag-drop"
import { Project } from "../models/project"
import { projectState } from "../state/project-state"
import { ProjectStatus } from "../models/project"
import { ProjectItem } from "../components/project-item"

type Status = "active" | "finished";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  private t: Status;
  private assignedProjects: Project[] = [];

  constructor(t: Status) {
    super("project-list", "app", false, `${t}-projects`);
    this.t = t;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.t === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.t}-projects-list`
    ) as HTMLUListElement;
    listElement.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler.bind(this));
    this.element.addEventListener("drop", this.dropHandler.bind(this));
    this.element.addEventListener(
      "dragleave",
      this.drapLeaveHandler.bind(this)
    );
  }
  renderContent() {
    const listId = `${this.t}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.t.toUpperCase() + " PROJECTS";
  }

  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.add("droppable");
    }
  }

  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projectId,
      this.t === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  drapLeaveHandler(event: DragEvent): void {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.remove("droppable");
  }
}
