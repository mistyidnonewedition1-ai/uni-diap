# Mon univers – diaporama

Site statique (HTML, CSS, JavaScript), sans étape de build.

## Structure

    mon-univers/
    ├── index.html        page principale
    ├── 404.html          page d'erreur
    ├── vercel.json       configuration Vercel
    ├── css/style.css     styles
    ├── js/data.js        VOTRE CONTENU (textes, photos)
    ├── js/app.js         moteur du diaporama
    └── images/           vos photos

## Modifier le contenu

Ouvrez `js/data.js` et changez les textes de la liste `DIAPOS`.

## Ajouter des photos

1. Copiez vos images dans `images/` (ex. `enfance.jpg`).
2. Dans `js/data.js`, sur une diapositive de type `"duo"`, écrivez :
   `image:"images/enfance.jpg"`.

## Tester en local

Double-cliquez sur `index.html`, ou lancez `npx serve` dans le dossier.

## Déployer sur Vercel

Option A : interface web
1. Poussez le dossier sur GitHub.
2. Sur vercel.com : Add New > Project > importez le dépôt.
3. Framework Preset : « Other ». Laissez Build Command et Output Directory vides.
4. Cliquez sur Deploy.

Option B : ligne de commande
    npm i -g vercel
    cd mon-univers
    vercel          # test (preview)
    vercel --prod   # mise en production
