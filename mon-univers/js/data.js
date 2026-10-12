/* ============ VOTRE CONTENU : modifiez uniquement ce fichier ============
   type "titre"  : titre, sous (sous-titre)
   type "texte"  : date (facultatif), titre, texte
   type "duo"    : date, titre, texte, image, legende
   type "liste"  : titre, texte, items (tableau de mots)
   type "fin"    : titre, texte

   PHOTOS : déposez vos images dans le dossier images/ puis indiquez
   leur chemin dans "image", par exemple  image:"images/enfance.jpg"
   (laissez "" pour afficher un cadre vide avec la légende).
   ======================================================================== */
const DIAPOS = [
  { type:"titre", titre:"Mon univers", sous:"Un auto-portrait à explorer en jouant." },
  { type:"texte", date:"Avant d'entrer", titre:"Pourquoi cette application ?",
    texte:"pour mieux etre imerger" },
  { type:"duo", date:"Où tout a commencé", titre:"Mes premières années",
    texte:"Lea MOREAU , 18 ans , 01/07/2008.",
    image:"images/enfance.jpg", legende:" 2013 ?" },
  { type:"texte", date:"Les années d'apprentissage", titre:"Mes études",
    texte:"2024 - 2026 bac pro ciel " },
  { type:"liste", titre:"Ce que j'ai fait", texte:"Les expériences, métiers et réalisations dont je suis fier.",
    items:["AMS propreter","fractured echoes ","clement M (copain bientot 1ans)","concours cybersecuriter"] },
  { type:"texte", date:"Les virages", titre:"Les moments qui m'ont changé",
    texte:"ma belle mere (leila)." },
  { type:"duo", date:"Mon terrain de jeu sonore", titre:"Mes projets musicaux",
    texte:"Création musicale MAO, nouveau projet, SEIKO (vocaloid).",
    image:"images/pochette.jpg.jpg", legende:"Pochette project oct 2026 " },
  { type:"liste", titre:"Ce qui me fait vibrer", texte:"Les passions qui m'accompagnent partout.",
    items:["Musique","jeux video","Écriture","langue"] },
  { type:"texte", date:"Aujourd'hui", titre:"Qui je suis maintenant",
    texte:"18 ans , un copain , uen vie casiment heureuse" },
  { type:"fin", titre:"Et la suite ?", texte:"Il reste des pages blanches. Venez explorer le reste de mon univers.", 
    image:"images/project.png"
  }

];

