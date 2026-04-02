 let rendezVous = JSON.parse(localStorage.getItem("rdv")) || [];
 let selectedId = null;

 function afficher() {
  let container = document.getElementById("container");
  container.innerHTML = "";

  rendezVous.forEach(r => {
    let div = document.createElement("div");
    div.className = "slot";
    
    div.innerHTML = `
     <div>
         <strong>${r.date}  ${r.heure}</strong><br>
         <small>${r.reserve? "Réservé par" + r.client : "Disponible"}</small>
     </div>

     ${
        r.reserve
        ? ""
        : `<button class="btn-reserver" onclick="select(${r.id})">choisir</button>`
      }
    `;

    container.appendChild(div);
   });
 }

 function select(id) {
    selectedId = id;
    let r = rendezVous.find(x => x.id === id);

    document.getElementById("selectedSlot").innerText =r.date + " " + r.heure;
 }

 function confirmer() {
    let nom = document.getElementById("nomInput").value;

    if (!selectedId) {
        alert("Choisis un créneau", "erreur");
        return;
    }

    if (!nom) {
        alert("Entre ton nom", "erreur");
        return;
    }

    let r = rendezVous.find(x  => x.id === selectedId);
    r.reserve = true;
    r.client = nom;

    localStorage.setItem("rdv", JSON.stringify(rendezVous));

    selectedId = null
    document.getElementById("selectedSlot").innerText = "Aucun créneau sélectionné";
    document.getElementById("nomInput").value ="";

    afficher();

    showMessage("Réservation réussie");
 }

defineStorageListener();
afficher();

function defineStorageListener() {
  window.addEventListener("storage", event => {
    if (event.key === "rdv") {
      rendezVous = JSON.parse(event.newValue) || [];
      afficher();
    }
  });
}

function showMessage(text, type = "success") {
     let msg = document.createElement("div");

     msg.innerText = text;

     msg.style.position = "fixed";
     msg.style.top = "20px";
     msg.style.left = "50%";
     msg.style.transform = "translateX(-50%)";
     msg.style.padding = "10px 20px";
     msg.style.borderRadius = "6px";
     msg.style.color = "white";

     if (type === "success") {
        msg.style.background = "green";
     }  else {
        msg.style.background ="red";
     }
   document.body.appendChild(msg);

   setTimeout(() =>{
    msg.remove();
   }, 3000);

}

 