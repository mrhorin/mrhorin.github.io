import 'css/style'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faHtml5, faCss3Alt, faJs, faSketch, faReact, faWordpress, faLinux, faDocker, faGit, faPython, faGithub, faLinkedin, faRProject } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLink, faXmark } from '@fortawesome/free-solid-svg-icons'

import { Modal } from 'ts/modal'

library.add(faHtml5, faCss3Alt, faJs, faSketch, faReact, faWordpress, faLinux, faDocker, faGit, faPython, faEnvelope, faGithub, faLinkedin, faRProject, faLink, faXmark)
dom.i2svg()

document.addEventListener("DOMContentLoaded", () => {
  // The process for copying contact infomation
  const copy = (text: string): void => {
    navigator.clipboard.writeText(text)
  }

  const contactMail: HTMLElement | null = document.getElementById("contact-mail")
  const contactMailAddress: HTMLElement | null = document.getElementById("contact-mail-address")
  const contactMailCopyBox: HTMLElement | null = document.getElementById("contact-mail-copy-box")

  contactMail?.addEventListener("click", (e: MouseEvent) => {
    if (contactMailAddress != null) {
      copy(contactMailAddress.innerText)
      if (contactMailCopyBox != null) {
        contactMailCopyBox.innerText = "Copied!"
        setTimeout(() => {
          contactMailCopyBox.innerText = "Copy Address"
        }, 1700)
      }
    }
  })

  // The process for showing dialog elements
  const dialog: HTMLElement | null = document.getElementById("dialog")
  const xMark: HTMLElement | null = document.getElementById("dialog-xmark")
  const closeBtn: HTMLElement | null = document.getElementById("dialog-close")
  if (dialog != null) {
    const modal: Modal = new Modal(dialog)
    xMark?.addEventListener("click", () => modal.hide())
    closeBtn?.addEventListener("click", () => modal.hide())

    const portfolioItems: HTMLCollectionOf<Element> = document.getElementsByClassName("portfolio-item")
    for (let item of portfolioItems) {
      item.addEventListener("click", () => {
        const prevItem: HTMLElement = <HTMLElement>dialog.children[1].firstChild
        dialog.children[1].replaceChild(item.cloneNode(true), prevItem)
        modal.show()
      })
    }
  }
})
