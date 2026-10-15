# Challenge O’News — formulaires et recherche

Ce dépôt contient le point de départ du challenge de **SC06 E03**. L’application affiche un blog et propose déjà un mode zen. À vous d’ajouter un abonnement à la newsletter, une recherche instantanée et la mise en valeur d’une catégorie.

L’objectif principal est de choisir où vit chaque donnée : dans le DOM, dans un state local ou dans un state partagé.

## Installation

Le projet utilise pnpm.

```bash
pnpm install
pnpm dev
```

Commandes utiles :

```bash
pnpm lint       # analyser le code avec Biome
pnpm format     # formater les fichiers
pnpm check      # analyser le code et vérifier son formatage
pnpm build      # vérifier TypeScript et produire le build
pnpm preview    # prévisualiser le build
```

Suivez la documentation actuelle des outils si vous devez les réinstaller : le challenge ne dépend pas d’un numéro de version à mémoriser.

## Avant de commencer

Parcourez les composants, les données et les fichiers CSS. Repérez notamment :

- le state du mode zen dans `App` ;
- la fonction `onToggleZenMode` transmise à `Header` ;
- les types `Post` et `Category`, exportés depuis des modules TypeScript ordinaires ;
- les styles CSS rangés avec les composants ;
- le `map` qui délègue l’affichage d’un article au composant `Post`.

Le mode zen n’est pas à modifier. Il montre qu’un composant enfant peut signaler une intention au composant qui possède le state.

## Étape 1 — Ajouter l’abonnement à la newsletter

Ajoutez dans `Footer` un formulaire contenant :

- un label associé au champ avec `htmlFor` et `id` ;
- un champ avec `name="email"`, `type="email"` et `required` ;
- un bouton avec `type="submit"`.

Au moment de la soumission, mémorisez l’adresse afin d’afficher un message de confirmation. Aucun appel réseau n’est demandé.

Pour ce besoin, le navigateur peut posséder la valeur pendant la saisie : le champ peut rester **non contrôlé**. Passez une fonction à la prop `action` du formulaire. React lui transmet directement un objet `FormData`.

```tsx
function subscribeToNewsletter(formData: FormData) {
  const emailEntry = formData.get('email');

  // Vérifier le type, retirer les espaces puis mettre à jour le state.
}

<form action={subscribeToNewsletter}>{/* champs du formulaire */}</form>
```

`FormData.get()` peut retourner une chaîne, un fichier ou `null`. Faites un guard simple avec `typeof`, puis vérifiez que la chaîne obtenue après `trim()` n’est pas vide. Une assertion `as string` ne vérifie rien à l’exécution.

La validation HTML native améliore l’expérience de saisie. Elle ne remplace pas une validation côté serveur dans une vraie application.

### Critères de réussite

- le label active ou cible correctement le champ ;
- une adresse vide ou invalide est refusée par le navigateur ;
- la touche Entrée soumet aussi le formulaire ;
- le message confirme l’adresse réellement soumise ;
- le message est annoncé aux technologies d’assistance, par exemple avec `role="status"` ;
- aucun state ne contrôle inutilement la saisie avant la soumission.

Effectuez un commit lorsque cette fonctionnalité fonctionne.

## Étape 2 — Rechercher dans les articles

Ajoutez dans `Posts` un champ de recherche associé à un label visible. Cette fois, l’interface doit réagir à chaque caractère : utilisez un **champ contrôlé**.

1. créez un state local contenant le texte recherché ;
2. reliez le champ au state avec `value` et `onChange` ;
3. normalisez la recherche avec `trim()` et `toLocaleLowerCase('fr')` ;
4. filtrez les articles sur leur titre ou leur extrait ;
5. affichez la liste filtrée et le nombre de résultats.

La liste filtrée est entièrement déterminée par les articles et le texte recherché. Calculez-la pendant le render : ne créez ni second state ni Effect pour cette valeur dérivée.

### Critères de réussite

- la liste évolue à chaque saisie ;
- la recherche ignore la casse et les espaces placés aux extrémités ;
- vider le champ réaffiche tous les articles ;
- le nombre affiché correspond à la liste visible ;
- une recherche sans résultat produit un message compréhensible ;
- chaque élément rendu conserve une clé stable.

Effectuez un nouveau commit avant de passer à l’étape suivante.

## Étape 3 — Partager la recherche avec le menu

Si la recherche correspond au nom d’une catégorie, mettez cette catégorie en évidence dans `Header`.

`Posts` modifie désormais la recherche et `Header` la lit. Leur parent commun le plus proche est `App` : remontez uniquement ce state dans `App`, puis transmettez :

- la valeur recherchée aux composants qui doivent la lire ;
- une fonction exprimant l’intention de modifier la recherche au composant qui possède le champ.

Évitez de transmettre directement un setter lorsque le nom d’une prop métier rend l’intention plus claire. Une prop comme `onSearchTextChange` explique mieux le contrat du composant.

Pour comparer la recherche et une catégorie, appliquez la même normalisation aux deux valeurs. Ajoutez une classe CSS à la catégorie correspondante et vérifiez que l’information ne repose pas uniquement sur la couleur.

### Critères de réussite

- la recherche continue de fonctionner après le déplacement du state ;
- `Header` ne peut pas modifier directement le state ;
- la catégorie correspondante est identifiable visuellement ;
- aucune copie du texte recherché n’est conservée dans un second state ;
- le code reste lisible pour une personne qui découvre la remontée du state.

## Vérification finale

Testez au clavier et dans une fenêtre étroite, puis lancez :

```bash
pnpm lint
pnpm build
```

Le challenge est terminé lorsque :

- l’abonnement utilise le HTML natif, `action` et `FormData` de façon cohérente ;
- la recherche est contrôlée et la liste filtrée reste une valeur dérivée ;
- le state ne remonte que lorsqu’au moins deux branches de l’interface en ont besoin ;
- les labels, boutons et messages sont accessibles ;
- Biome et le build terminent sans erreur.

## Repères Git

Une progression simple peut être :

```text
feat: ajouter l’abonnement à la newsletter
feat: filtrer les articles avec une recherche contrôlée
feat: mettre en valeur la catégorie recherchée
```

Vérifiez le contenu de chaque commit avant de poursuivre. Un commit doit représenter une étape fonctionnelle compréhensible, pas seulement une série de fichiers modifiés.

## Bonus

- proposer un bouton qui efface la recherche sans dupliquer le state ;
- déplacer le focus vers le message « aucun résultat » en utilisant une ref, uniquement si cela répond à un besoin d’accessibilité identifié ;
- améliorer les styles en conservant un focus visible et un contraste suffisant.
