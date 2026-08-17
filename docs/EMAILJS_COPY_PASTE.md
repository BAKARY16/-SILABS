# EmailJS — configuration exacte à copier

## Champs du template

Dans **Email Templates → Create New Template**, renseigner exactement :

```text
Template name: SILabs Portfolio Requests
To Email: VOTRE_ADRESSE_EMAIL
From Name: SILabs Portfolio
From Email: Use Default Email Address
Reply-To: {{reply_to}}
Subject: [Portfolio] {{request_type_label}} — {{subject}}
```

Dans l’éditeur du contenu, passer en mode **Code Editor** et coller intégralement le fichier `docs/emailjs-template.html`.

## Pièces jointes

Dans l’onglet **Attachments**, créer trois entrées de type **Form File Attachment** :

```text
Attachment 1 → Parameter name: attachment_1
Attachment 2 → Parameter name: attachment_2
Attachment 3 → Parameter name: attachment_3
```

Ne pas choisir « Variable Attachment » : le code utilise `emailjs.sendForm` et transmet de vrais champs fichier.

## Sécurité EmailJS

Dans la liste des domaines/origines autorisés EmailJS, conserver uniquement :

```text
http://localhost:5173
https://VOTRE-DOMAINE.vercel.app
https://VOTRE-DOMAINE-PERSONNALISE éventuel
```

Retirer `localhost` avant la mise en production si les tests locaux sont terminés.

## Variables du portfolio

Créer `.env.local` à la racine :

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

Correspondance :

```text
VITE_EMAILJS_SERVICE_ID  ← Email Services → Service ID
VITE_EMAILJS_TEMPLATE_ID ← Email Templates → Template ID
VITE_EMAILJS_PUBLIC_KEY  ← Account → General → Public Key
```

Ne jamais placer une clé privée EmailJS dans `.env.local` avec le préfixe `VITE_`.

Après modification, redémarrer `npm run dev`. Pour Vercel, ajouter les quatre variables dans **Settings → Environment Variables**, puis redéployer.

## Variables envoyées au template

Le code transmet exactement :

```text
request_type
request_type_label
subject
sender_name
reply_to
phone
organization
request_details
detail_paragraph_1
detail_paragraph_2
detail_paragraph_3
detail_project_kind
detail_target_users
detail_message
detail_deliverables
detail_existing_product
detail_budget
detail_timeline
detail_expertise
detail_work_mode
detail_duration
detail_partnership_kind
detail_partner_contribution
detail_expected_contribution
detail_reply_channel
submitted_at
page_url
attachment_1
attachment_2
attachment_3
```
