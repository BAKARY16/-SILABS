# Sécurité du portfolio

## Protections actuellement appliquées

- Politique CSP restrictive sur toutes les routes déployées avec Vercel.
- Protection contre l’intégration du site dans une iframe, le sniffing MIME et les permissions navigateur inutiles.
- Validation HTML et normalisation des longueurs avant envoi.
- Variables utilisateur injectées dans le template EmailJS avec les doubles accolades échappées.
- Champ honeypot et temporisation anti-double envoi.
- Origines EmailJS à limiter dans le tableau de bord au domaine officiel et aux prévisualisations nécessaires.
- Pièces jointes limitées à trois fichiers PDF/JPG/PNG, 5 Mo par fichier et 10 Mo au total.
- Vérification locale de l’extension, du MIME déclaré, du nom et de la signature binaire.
- Aucune pièce jointe n’est stockée ou rendue publiquement par le portfolio.
- Dépendances de production auditées avec `npm audit --omit=dev`.

## Limites à connaître

Une application uniquement côté navigateur ne peut pas considérer les contrôles client comme une frontière de sécurité : un attaquant peut modifier le JavaScript ou appeler EmailJS directement. La liste d’origines EmailJS et ses limites IP doivent donc être activées dans le service. Une protection CAPTCHA pourra être réintroduite ultérieurement.

Un fichier PDF possédant une signature correcte peut encore contenir un contenu dangereux. Ne jamais ouvrir une pièce jointe inattendue avec des logiciels non mis à jour.

## Exigences pour le futur back-office

Avant d’accepter ou de stocker des fichiers côté serveur :

1. Revalider toutes les données côté serveur avec une liste blanche.
2. Imposer authentification, autorisation par rôle et limitation de débit.
3. Renommer les fichiers avec un identifiant aléatoire et les stocker hors du répertoire public.
4. Vérifier la signature réelle, analyser les fichiers avec un antivirus et, si possible, appliquer une reconstruction CDR aux PDF.
5. Chiffrer les secrets au repos et ne jamais exposer une clé privée dans une variable `VITE_*`.
6. Journaliser les opérations sensibles sans enregistrer les messages ou données personnelles en clair.
7. Définir une durée de conservation et une procédure de suppression des données.
8. Ajouter des tests SAST, un audit des dépendances et des tests de sécurité au pipeline de déploiement.

Pour signaler une vulnérabilité, contacter directement le propriétaire du portfolio sans publier les détails de l’exploitation.
