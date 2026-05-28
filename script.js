const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("navMenu")

hamburger.onclick = () => {
  navMenu.classList.toggle("active")
}

const partsData = {

  gpu: [
    { name: "RTX 4090", price: "24 990 kr" },
    { name: "RTX 4080", price: "16 990 kr" },
    { name: "RTX 4070 Ti", price: "11 990 kr" },
    { name: "RX 7900 XTX", price: "13 990 kr" },
    { name: "RTX 4060", price: "4 990 kr" }
  ],

  cpu: [
    { name: "Ryzen 7 7800X3D", price: "4 990 kr" },
    { name: "i9 14900K", price: "7 490 kr" },
    { name: "Ryzen 5 7600", price: "2 990 kr" }
  ],

  ram: [
    { name: "32GB DDR5 Corsair", price: "1 499 kr" },
    { name: "64GB DDR5 G.Skill", price: "2 499 kr" }
  ],

  ssd: [
    { name: "Samsung 990 Pro 2TB", price: "2 299 kr" },
    { name: "Kingston NV2 1TB", price: "799 kr" }
  ],

  psu: [
    { name: "Corsair RM850x", price: "1 799 kr" },
    { name: "MSI 1000W Gold", price: "2 199 kr" }
  ]

}

const selectedBuild = {
  gpu: null,
  cpu: null,
  ram: null,
  ssd: null,
  psu: null
}

const modal = document.getElementById("partModal")
const modalTitle = document.getElementById("modalTitle")
const closeModal = document.getElementById("closeModal")
const partsContainer = document.getElementById("partsContainer")
const searchInput = document.getElementById("searchInput")
const selectedParts = document.getElementById("selectedParts")

let currentPart = ""

document.querySelectorAll(".part-btn").forEach(button => {

  button.onclick = () => {

    currentPart = button.dataset.part

    modal.classList.add("active")

    modalTitle.textContent =
      `Välj ${currentPart.toUpperCase()}`

    renderParts(partsData[currentPart])

  }

})

closeModal.onclick = () => {
  modal.classList.remove("active")
}

function renderParts(parts) {

  partsContainer.innerHTML = ""

  parts.forEach(part => {

    const div = document.createElement("div")

    div.className = "part-item"

    div.innerHTML = `
      <h3>${part.name}</h3>
      <p>${part.price}</p>
    `

    div.onclick = () => {

      selectedBuild[currentPart] = part

      updatePreview()

      modal.classList.remove("active")

    }

    partsContainer.appendChild(div)

  })

}

function updatePreview() {

  selectedParts.innerHTML = `
  
    <p>GPU: ${selectedBuild.gpu ? selectedBuild.gpu.name : "Ingen vald"}</p>

    <p>CPU: ${selectedBuild.cpu ? selectedBuild.cpu.name : "Ingen vald"}</p>

    <p>RAM: ${selectedBuild.ram ? selectedBuild.ram.name : "Ingen vald"}</p>

    <p>SSD: ${selectedBuild.ssd ? selectedBuild.ssd.name : "Ingen vald"}</p>

    <p>PSU: ${selectedBuild.psu ? selectedBuild.psu.name : "Ingen vald"}</p>

  `

}

searchInput.oninput = () => {

  const value = searchInput.value
    .trim()
    .toLowerCase()

  const filtered = partsData[currentPart].filter(part =>
    part.name.toLowerCase().includes(value)
  )

  renderParts(filtered)

}