import 'css/style'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faHtml5, faCss3Alt, faJs, faSketch, faReact, faWordpress, faLinux, faDocker, faGit, faPython, faGithub, faLinkedin, faRProject } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

library.add(faHtml5, faCss3Alt, faJs, faSketch, faReact, faWordpress, faLinux, faDocker, faGit, faPython, faEnvelope, faGithub, faLinkedin, faRProject)
dom.i2svg()

document.addEventListener("DOMContentLoaded", () => {
  const contactMail: HTMLElement | null = document.getElementById("contact-mail")
  const contactMailAddress: HTMLElement | null = document.getElementById("contact-mail-address")
  const contactMailCopyBox: HTMLElement | null = document.getElementById("contact-mail-copy-box")

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

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
})