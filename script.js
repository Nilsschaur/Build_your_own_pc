let savedScrollY = 0;

window.addEventListener("beforeunload", () => {
  savedScrollY = window.scrollY;
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);

  // re-lock scroll after Quickchat has time to misbehave
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);

  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
});


const originalScrollIntoView = Element.prototype.scrollIntoView;

Element.prototype.scrollIntoView = function () {
  // block Quickchat from forcing scroll
  if (this.id === "quickchat-embedded") return;
  if (this.closest && this.closest("#quickchat-embedded")) return;

  return originalScrollIntoView.apply(this, arguments);
};


// NAVBAR MOBILMENY (HAMBURGERMENY)

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.onclick = () => {
    navMenu.classList.toggle("active");
  };
}

// DATA FÖR ALLA KOMPONENTER
// VISAS I BYGGVERKTYGET

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

//DATA FÖR PREBUILDS
//BILDER OCH NAMN SOM VISAS I MODALEN

const prebuildData = {

  gamingbeast: {
    name: "Gaming Beast",
    images: [
      "PcPics/beast.webp",
      "PcPics/beast1.webp"
    ]
  },

  togerthetiger: {
    name: "Toger The Tiger",
    images: [
      "PcPics/fancy.webp",
      "PcPics/fancy1.webp"
    ]
  },

  alisbuild: {
    name: "Ali's Build",
    images: [
      "PcPics/abitboring.webp",
      "PcPics/abitboring1.webp"
    ]
  },

  bigbrother: {
    name: "Big Brother",
    images: [
      "PcPics/Big Brother.png",
      "PcPics/Big Brother.png"
    ]
  },

  kallekralle: {
    name: "Kalle Kralle",
    images: [
      "PcPics/noir.webp",
      "PcPics/noir1.webp"
    ]
  },

  budgetbuild: {
    name: "Budget Build",
    images: [
      "PcPics/white.webp",
      "PcPics/white1.webp"
    ]
  },

  kycklingko: {
    name: "Kycklingko",
    images: [
      "PcPics/shadow.webp",
      "PcPics/shadow1.webp"
    ]
  },

  streamerpc: {
    name: "Streamer Pc",
    images: [
      "PcPics/shadow.webp",
      "PcPics/shadow1.webp"
    ]
  },

  ultimatesetup: {
    name: "Ultimate Setup",
    images: [
      "PcPics/shadow.webp",
      "PcPics/shadow1.webp"
    ]
  },

}

// SELECTED BUILD

const selectedBuild = {
  gpu: null,
  cpu: null,
  ram: null,
  ssd: null,
  psu: null
}

// ELEMENTS

const modal = document.getElementById("partModal")
const modalTitle = document.getElementById("modalTitle")
const closeModal = document.getElementById("closeModal")
const partsContainer = document.getElementById("partsContainer")
const searchInput = document.getElementById("searchInput")
const selectedParts = document.getElementById("selectedParts")

let currentPart = ""

// ÖPPNA KOMPONENTMODAL
//NÄR ANVÖNDAREN KLICKAR PÅ GPU/CPU/RAM

document.querySelectorAll(".part-btn").forEach(button => {

  button.onclick = () => {

    currentPart = button.dataset.part

    modal.classList.add("active")

    modalTitle.textContent =
      `Välj ${currentPart.toUpperCase()}`

    renderParts(partsData[currentPart])

  }

})

// CLOSE MODAL

if (closeModal && modal) {
  closeModal.onclick = () => {
    modal.classList.remove("active");
  };
}
// VISAR ALLAR DELAR I MODALEN

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

// UPDATERA FÖRHANDSVISNGEN
// VISAR VALDA KOMPONENTER

function updatePreview() {

  selectedParts.innerHTML = `
  
    <p>GPU: ${selectedBuild.gpu ? selectedBuild.gpu.name : "Ingen vald"}</p>

    <p>CPU: ${selectedBuild.cpu ? selectedBuild.cpu.name : "Ingen vald"}</p>

    <p>RAM: ${selectedBuild.ram ? selectedBuild.ram.name : "Ingen vald"}</p>

    <p>SSD: ${selectedBuild.ssd ? selectedBuild.ssd.name : "Ingen vald"}</p>

    <p>PSU: ${selectedBuild.psu ? selectedBuild.psu.name : "Ingen vald"}</p>

  `

}

//SÖKFUNKTION FÖR KOMPONENTER
//FILTERAR KOMPONENETER I MODALEN

if (searchInput) {
  searchInput.oninput = () => {

    const value = searchInput.value
      .trim()
      .toLowerCase();

    const filtered = partsData[currentPart].filter(part =>
      part.name.toLowerCase().includes(value)
    );

    renderParts(filtered);
  };
}

const prebuildModal =
  document.getElementById("prebuildModal")

const closePrebuild =
  document.getElementById("closePrebuild")

const gallery =
  document.getElementById("gallery")

const buildName =
  document.getElementById("buildName")

//PREBUILD MODAL
//ÖPPNAR DETALJER FÖR FÄRDIGBYGGDA DATORER

document.querySelectorAll(".card")
  .forEach(card => {

    card.addEventListener("click", () => {

      const build =
        prebuildData[card.dataset.build]

      if (!build) return

      buildName.textContent = build.name

      gallery.innerHTML = ""

      build.images.forEach(image => {

        const img =
          document.createElement("img")

        img.src = image

        gallery.appendChild(img)

      })

      prebuildModal.classList.add("active")

    })

})

if (closePrebuild && prebuildModal) {
  closePrebuild.addEventListener("click", () => {
    prebuildModal.classList.remove("active");
  });
}

if (prebuildModal) {
  prebuildModal.addEventListener("click", e => {

    if (e.target === prebuildModal) {
      prebuildModal.classList.remove("active");
    }

  });
}

//SEARCH BAR

const prebuildSearch =
  document.getElementById("prebuildSearch")

const prebuildCards =
  document.querySelectorAll(".card")

//SÖK PREBUILDS PÅ STARTSIDAN

if (prebuildSearch) {
  prebuildSearch.addEventListener("input", () => {

    const searchValue =
      prebuildSearch.value.toLowerCase().trim();

    prebuildCards.forEach(card => {

      const buildName =
        card.querySelector("h3").textContent.toLowerCase();

      const buildSpecs =
        card.querySelector("p").textContent.toLowerCase();

      const matches =
        buildName.includes(searchValue) ||
        buildSpecs.includes(searchValue);

      card.style.display =
        matches ? "block" : "none";
    });

  });
}

const searchBar = document.querySelector(".search-bar");

if (searchBar) {
  searchBar.addEventListener("submit", e => {
    e.preventDefault();
  });
}

const purchaseBtn =
  document.querySelector(".purchase-btn")

//KÖP KNAPP
//SPARAR BUILD I LOCALSTORAGE
if (purchaseBtn) {
  purchaseBtn.addEventListener("click", () => {

    const missingPart =
      Object.values(selectedBuild).some(part => !part);

    if (missingPart) {
      alert("Välj alla delar först!");
      return;
    }

    localStorage.setItem(
      "pcBuild",
      JSON.stringify(selectedBuild)
    );

    window.location.href = "checkout.html";

  });
}

console.log("FAQ code loaded");

//FAQ-SYSTEM
//ÖPPNA STÄNG FRÅGOR PÅ HJÄLP-SIDAN

const faqQuestions = document.querySelectorAll(".faq-question");

console.log("Found FAQ buttons:", faqQuestions.length);

faqQuestions.forEach(question => {
  question.addEventListener("click", () => {
    console.log("FAQ clicked");
    question.parentElement.classList.toggle("active");
  });
});