# Configuration EmailJS

## 1. Créer le service et le template

Dans le tableau de bord EmailJS :

1. Connecter le service e-mail qui recevra les demandes.
2. Créer un template, puis copier le contenu de `docs/emailjs-template.html` dans son éditeur HTML.
3. Utiliser les réglages suivants :

- **To Email** : votre adresse de réception
- **From Name** : `SILabs Portfolio`
- **Reply-To** : `{{reply_to}}`
- **Subject** : `[Portfolio] {{request_type_label}} — {{subject}}`

Le template affiche trois courts paragraphes via `detail_paragraph_1`, `detail_paragraph_2` et `detail_paragraph_3`. Le formulaire transmet aussi séparément chaque donnée métier avec le préfixe `detail_` (`detail_project_kind`, `detail_target_users`, `detail_message`, etc.) ainsi que les informations générales. Le préfixe évite les collisions avec les champs visibles du formulaire.

Dans l’onglet **Attachments** du template, ajouter trois pièces jointes de type **Form File Attachment** avec les paramètres :

- `attachment_1`
- `attachment_2`
- `attachment_3`

Le formulaire accepte uniquement les PDF, JPG et PNG : 5 Mo maximum par fichier, 10 Mo au total.

## 2. Configurer le portfolio

Copier `.env.example` vers `.env.local`, puis remplacer les valeurs :

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

Redémarrer ensuite le serveur local. Sur Vercel, créer les trois mêmes variables dans **Settings → Environment Variables**, puis redéployer.

La clé publique EmailJS peut être utilisée côté navigateur. Ne placez jamais une clé privée EmailJS dans les variables `VITE_*`.

## 3. Protections indispensables dans EmailJS

Dans les paramètres de sécurité EmailJS :

1. Ajouter uniquement le domaine de production et les domaines de prévisualisation nécessaires dans la liste des origines autorisées.
2. Activer la protection anti-spam et surveiller les quotas d’envoi.

Le contrôle des fichiers effectué dans le navigateur réduit les erreurs et bloque les formats évidents, mais ne remplace pas une analyse antivirus serveur. Lors de la création du back-office, les fichiers devront être analysés, renommés et isolés avant toute ouverture.

## 4. Tester

Envoyer successivement une demande de projet, une mission, un partenariat et un message. Vérifier la boîte de réception et les courriers indésirables. EmailJS limite les envois à une requête par seconde.
