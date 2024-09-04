const formCliente = document.forms["cliente"];
const campoNome = formCliente.elements["nome"];
const campoCognome = formCliente.elements["cognome"];
const campoEta = formCliente.elements["eta"];
const squadre = formCliente.elements["squadraPreferita"];
//console.log("🚀 ~ squadre:", squadre);
const errorFormMessage = document.querySelector("div.erroreForm");
const cardContainer = document.querySelector("div.card-container");
const formContainer = document.querySelector(".form-container");
const backToFormLink = document.getElementById("back-form");
const imgAvatar = [1, 2, 3, 4];
const PERCORSO_IMMAGINI = "../../assets/img/";

backToFormLink.addEventListener("click", backToFormLinkPage);
formCliente.addEventListener("submit", gestisciInsierimentoCliente);

function backToFormLinkPage(e) {
  e.preventDefault();
  cardContainer.classList.remove("display-card");
  formContainer.classList.remove("hide-form");
}

function gestisciInsierimentoCliente(e) {
  e.preventDefault();

  const nome = campoNome.value.trim();
  const cognome = campoCognome.value.trim();
  const eta = campoEta.value.trim();

  if (isValidModule(nome, cognome, eta, squadre)) {
    //cancella errore
    errorFormMessage.classList.remove("erroreFormVisualizza");
    //creare la card
    creaCardCliente(nome, cognome, eta, squadre);
  } else {
    //visualizza errore
    errorFormMessage.classList.add("erroreFormVisualizza");
  }
}

function creaCardCliente(nome, cognome, eta, squadre) {
  const squadrePreferite = selezionaSquadreScelte(squadre);
  const newDiv = creaMarkup(nome, cognome, eta, squadrePreferite);
  if (!document.querySelector("div.card")) cardContainer.append(newDiv);

  cardContainer.classList.add("display-card");
  formContainer.classList.add("hide-form");
}

function creaMarkup(nome, cognome, eta, squadrePreferite) {
  /* let newDiv = document.querySelector("div.card");
  if (!newDiv) {
    newDiv = document.createElement("div.card");
  } */

  //prettier-ignore
  const newDiv =document.querySelector("div.card") || document.createElement("div");
  newDiv.textContent = "";
  newDiv.className = "card";

  const h2Tag = document.createElement("h2");
  h2Tag.append("Cliente");
  //crea avatar immagine
  const imgTag = creaRandomAvatarMarkup();
  const divTag = document.createElement("div");
  divTag.append(`${eta} anni`);
  const h3Tag = document.createElement("h3");
  h3Tag.append("Squadre preferite:");

  let fragmentContainer = document.createDocumentFragment();
  for (let indice = 0; indice < squadrePreferite.length; indice++) {
    const divSquadra = document.createElement("div");
    divSquadra.append(squadrePreferite[indice]);
    fragmentContainer.append(divSquadra);
    //newDiv.append(divSquadra);
  }

  //prettier-ignore
  newDiv.append(h2Tag,imgTag, `${nome} `, cognome, divTag, h3Tag, fragmentContainer);

  //newDiv.append(fragmentContainer);

  return newDiv;
}

function creaRandomAvatarMarkup() {
  const numeroCasuale = Math.floor(Math.random() * 4);
  const imgName = imgAvatar[numeroCasuale];
  const imgPath = `${PERCORSO_IMMAGINI}${imgName}.png`;
  const imgContainer = document.createElement("div");
  imgContainer.className = "avatar";
  const imgTag = document.createElement("img");
  imgTag.alt = "Avatar";
  imgTag.setAttribute("src", imgPath);
  imgContainer.append(imgTag);

  return imgContainer;
}

function selezionaSquadreScelte(squadre) {
  const squadrePreferite = [];

  for (let i = 0; i < squadre.length; i++) {
    if (squadre[i].checked) {
      squadrePreferite.push(squadre[i].value);
    }
  }

  return squadrePreferite;
}

function isValidModule(nome, cognome, eta, squadre) {
  return (
    isValidNomeCognome(nome) &&
    isValidNomeCognome(cognome) &&
    isValidEta(eta) &&
    isValidSquadrePreferite(squadre)
  );
}

function isValidNomeCognome(nominativo) {
  const patternNominativo = /^(\p{Lu}\p{Ll}*\s+)*(\p{Lu}\p{Ll}*)$/u;
  return patternNominativo.test(nominativo);
}

function isValidEta(eta) {
  const patternEta = /^(([1-9]?\d)|(1[0-4]\d)|150)$/;
  return patternEta.test(eta);

  /* const patternEta2 = /^(([1-9]\d*)|0)$/;
  return patternEta2.test(eta) && parseInt(eta) < 150; */
}

function isValidSquadrePreferite(squadre) {
  /* return document.querySelectorAll("input[type=checkbox][name=squadraPreferita]:checked").length >0  */

  for (let i = 0; i < squadre.length; i++) {
    if (squadre[i].checked) {
      return true;
    }
  }

  return false;
}
