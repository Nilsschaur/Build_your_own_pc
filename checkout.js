const container = document.getElementById("checkoutBuild")

const build = JSON.parse(
  localStorage.getItem("pcBuild")
)

console.log("Loaded build:", build)

if (!build) {

  container.innerHTML = `
    <h2>Ingen build hittades.</h2>
    <a href="index.html">Tillbaka</a>
  `

} else {

  container.innerHTML = `

    <p><strong>GPU:</strong> ${build.gpu.name}</p>
    <p><strong>CPU:</strong> ${build.cpu.name}</p>
    <p><strong>RAM:</strong> ${build.ram.name}</p>
    <p><strong>SSD:</strong> ${build.ssd.name}</p>
    <p><strong>PSU:</strong> ${build.psu.name}</p>
  `
}

document
  .getElementById("confirmOrder")
  .addEventListener("click", () => {

    alert("Tack för din beställning!")

    localStorage.removeItem("pcBuild")

    window.location.href = "index.html"

  })