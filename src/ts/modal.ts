/***********************************************************
constructor:
  dialogElement: An element you'd like to show as a dialog.
  options?:
    prefix?: A prefix of ID for the modal element.
    zIndex?: z-index property for the modal element.

member variables:
  dialogElement:
  prefix:
  zIndex:
  id: A unique ID for the modal element made from the prefix
  element: A modal element that contains dialogElement along with an overlay element.
************************************************************/
export interface Options{
  prefix?: string
  zIndex?: number
}

export class Modal{
  public dialogElement: HTMLElement
  public prefix: string
  public zIndex: number
  public id: string
  public element: HTMLElement

  constructor(dialogElement: HTMLElement, options?: Options) {
    this.dialogElement = dialogElement
    this.prefix = options?.prefix ? options.prefix : "modal"
    this.zIndex = options?.zIndex ? options.zIndex : 999999
    this.id = this.uniqueID
    this.element = this.createModalElement(this.dialogElement)
  }

  /****************** public ******************/
  public show(): void{
    if (!this.isAppended) {
      document.body.prepend(this.element)
      this.disableBodyScroll()
    }
    if (!this.isStyled) {
      document.head.append(this.createStyleElement())
    }
  }

  public hide(): void{
    this.enableBodyScroll()
    document.getElementById(this.id)?.remove()
    document.getElementById(`${this.id}_style`)?.remove()
  }

  public get isAppended(): boolean{
    return document.getElementById(this.id) != null
  }

  public get isStyled(): boolean{
    return document.getElementById(`${this.id}_style`) != null
  }

  /***************** private *****************/
  private createModalElement(dialogElement: HTMLElement): HTMLElement{
    const modal: HTMLElement = document.createElement("div")
    modal.setAttribute("id", this.id)
    modal.append(this.createOverlayElement())
    modal.append(this.applyDialogStyle(dialogElement))
    return modal
  }

  private createOverlayElement(): HTMLElement{
    const overlay: HTMLElement = document.createElement("div")
    overlay.setAttribute("id", `${this.id}_overlay`)
    overlay.addEventListener("click", () => this.hide())
    return overlay
  }

  private createStyleElement(): HTMLElement{
    const style: HTMLElement = document.createElement("style")
    style.textContent = `
    #${this.id}_overlay{
      z-index: ${this.zIndex};
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(41,48,66,0.5);
    }`
    style.setAttribute("id", `${this.id}_style`)
    return style
  }

  private applyDialogStyle(dialogElement: HTMLElement): HTMLElement{
    dialogElement.style.zIndex = `${this.zIndex + 1}`
    dialogElement.style.position = "fixed"
    dialogElement.style.top = "50%"
    dialogElement.style.left = "50%"
    dialogElement.style.transform = "translate(-50%, -50%)"
    return dialogElement
  }

  private disableBodyScroll(): void{
    document.body.style.overflow = "hidden"
  }

  private enableBodyScroll(): void{
    document.body.style.overflow = "visible"
  }

  private get uniqueID(): string{
    let unique: number = 1
    while (document.getElementById(`${this.prefix}_${unique}`)) {
      unique += 1
    }
    return `${this.prefix}_${unique}`
  }
}
