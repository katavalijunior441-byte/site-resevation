 let rendezVous = JSON.parse(localStorage.getItem("rdv")) || [];
 
 function afficher() {
   let container = document.getElementById("container");
   container.innerHTML = "";

   rendezVous.forEach(r => {
    let div = document.CreateElement ("div"); 
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

 function ajouter() {
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
 }
 afficher();