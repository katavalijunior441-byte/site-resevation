 let rendezVous = JSON.parse(localStorage.getItem("rdv")) || [];
const ACCESS_CODE = "1234";

function afficherAuth() {
  document.getElementById("adminSection").classList.add("hidden");
  document.getElementById("authSection").classList.remove("hidden");
}

function afficherAdmin() {
  document.getElementById("adminSection").classList.remove("hidden");
  document.getElementById("authSection").classList.add("hidden");
}

function verifierAcces() {
  let code = document.getElementById("accessCode").value.trim();
  let message = document.getElementById("accessMessage");
  if (code === ACCESS_CODE) {
    sessionStorage.setItem("adminAuthorized", "true");
    afficherAdmin();
    message.textContent = "";
  } else {
    message.textContent = "Code invalide. Réessayez.";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (sessionStorage.getItem("adminAuthorized") === "true") {
    afficherAdmin();
  } else {
    afficherAuth();
  }

  let accessBtn = document.getElementById("accessBtn");
  if (accessBtn) {
    accessBtn.addEventListener("click", verifierAcces);
  }

  let accessCodeInput = document.getElementById("accessCode");
  if (accessCodeInput) {
    accessCodeInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        verifierAcces();
      }
    });
  }
});
 
 function afficher() {
   let container = document.getElementById("liste");
   container.innerHTML = "";

   rendezVous.forEach(r => {
    let div = document.createElement("div");
    div.className = "slot";
    
    div.innerHTML = `
     <div>
         <strong>${r.date}  ${r.heure}</strong><br>
         <small>${r.reserve? "Réservé par" + r.client : "Libre"}</small><br>
     </div>
      
     <button class="btn-liberer" onclick="supprimer(${r.id})">Supprimer</button>
    `;

    container.appendChild(div)
   });
 }

 function ajouterCreneau() {
  let date = document.getElementById("date").value;
  let heure = document.getElementById("heure").value;

  if (!date || !heure) {
   alert("Remplis tout!");
    return;
  }
  rendezVous.push({
    id: Date.now(),
    date,
    heure,
    reserve: false,
    client: ""
  });

  localStorage.setItem("rdv", JSON.stringify(rendezVous));
  afficher();
 }

 function supprimer(id) {
     rendezVous = rendezVous.filter(r => r.id !== id);
     localStorage.setItem("rdv", JSON.stringify(rendezVous));
    afficher();
 }
 afficher();