import emailjs from '@emailjs/browser'
import { ArrowLeft, ArrowRight, Check, FileText, Paperclip, Send, ShieldCheck } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/languageContext'

type RequestType = 'project' | 'mission' | 'partnership' | 'message'
type Pick = (fr: string, en: string) => string

const emailConfig = {
  serviceId: (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) ?? '',
  templateId: (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) ?? '',
  publicKey: (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ?? '',
}

const normalizeText = (input: string) =>
  [...input]
    .filter((character) => character === '\n' || character === '\t' || character.charCodeAt(0) >= 32)
    .join('')
    .trim()
    .slice(0, 5000)
const fieldValue = (data: FormData, key: string) =>
  normalizeText(String(data.get(key) ?? '')) || 'Non renseigné'
const singleLineValue = (data: FormData, key: string) =>
  fieldValue(data, key).replace(/\s+/g, ' ').slice(0, 254)
const choiceValue = (data: FormData, key: string) =>
  data.get(key) === '__other' ? fieldValue(data, `${key}_other`) : fieldValue(data, key)
const sentenceValue = (value: string) =>
  value === 'Non renseigné' ? value : `${value.replace(/\s+/g, ' ').replace(/[.!?]+$/, '')}.`
const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_TOTAL_SIZE = 10 * 1024 * 1024
const allowedFiles = {
  pdf: ['application/pdf'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
} as const

async function validateFile(file: File) {
  const extension = file.name.toLowerCase().split('.').pop() ?? ''
  if (
    !(extension in allowedFiles) ||
    !(allowedFiles[extension as keyof typeof allowedFiles] as readonly string[]).includes(file.type)
  )
    return false
  const unsafeName =
    [...file.name].some((character) => character.charCodeAt(0) < 32) || /[<>:"/\\|?*]/.test(file.name)
  if (file.size === 0 || file.size > MAX_FILE_SIZE || file.name.length > 120 || unsafeName) return false
  if (/\.(?:exe|js|html?|svg|php|sh|bat|cmd|com|msi|jar)\./i.test(file.name)) return false
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer())
  if (extension === 'pdf') return String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-'
  if (extension === 'png')
    return [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)
  return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
}

export function Inquiry() {
  const { pick } = useLanguage()
  const [type, setType] = useState<RequestType>('project')
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [attachmentError, setAttachmentError] = useState('')
  const lastSubmission = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)

  const labels: Record<RequestType, string> = {
    project: pick('Nouveau projet', 'New project'),
    mission: pick('Mission professionnelle', 'Professional assignment'),
    partnership: pick('Partenariat', 'Partnership'),
    message: pick('Prise de contact', 'Contact message'),
  }

  function buildRequestDetails(data: FormData) {
    const values = {
      project_kind: choiceValue(data, 'project_kind'),
      target_users: fieldValue(data, 'target_users'),
      message: fieldValue(data, 'message'),
      deliverables: fieldValue(data, 'deliverables'),
      existing_product: fieldValue(data, 'existing_product'),
      budget: choiceValue(data, 'budget'),
      timeline: choiceValue(data, 'timeline'),
      expertise: fieldValue(data, 'expertise'),
      work_mode: choiceValue(data, 'work_mode'),
      duration: fieldValue(data, 'duration'),
      partnership_kind: choiceValue(data, 'partnership_kind'),
      partner_contribution: fieldValue(data, 'partner_contribution'),
      expected_contribution: fieldValue(data, 'expected_contribution'),
      reply_channel: choiceValue(data, 'reply_channel'),
    }
    const name = singleLineValue(data, 'name')
    const subject = singleLineValue(data, 'request_title')
    let paragraphs: [string, string, string]

    if (type === 'project') {
      paragraphs = [
        pick(
          `${name} présente « ${subject} », un projet de type ${values.project_kind} conçu pour ${values.target_users}.`,
          `${name} presents “${subject}”, a ${values.project_kind} project designed for ${values.target_users}.`,
        ),
        `${sentenceValue(values.message)} ${pick('Le résultat attendu est :', 'The expected outcome is:')} ${sentenceValue(values.deliverables)}`,
        pick(
          `Produit existant : ${values.existing_product}. Budget : ${values.budget}. Démarrage souhaité : ${values.timeline}.`,
          `Existing product: ${values.existing_product}. Budget: ${values.budget}. Desired start: ${values.timeline}.`,
        ),
      ]
    } else if (type === 'mission') {
      paragraphs = [
        pick(
          `${name} propose la mission « ${subject} » et recherche une expertise en ${values.expertise}.`,
          `${name} proposes the assignment “${subject}” and is looking for expertise in ${values.expertise}.`,
        ),
        `${sentenceValue(values.message)} ${pick('Les livrables attendus sont :', 'The expected deliverables are:')} ${sentenceValue(values.deliverables)}`,
        pick(
          `Modalité : ${values.work_mode}. Durée : ${values.duration}. Budget ou TJM : ${values.budget}. Démarrage : ${values.timeline}.`,
          `Work mode: ${values.work_mode}. Duration: ${values.duration}. Budget or daily rate: ${values.budget}. Start: ${values.timeline}.`,
        ),
      ]
    } else if (type === 'partnership') {
      paragraphs = [
        pick(
          `${name} soumet « ${subject} », une proposition de partenariat de type ${values.partnership_kind}.`,
          `${name} submits “${subject}”, a ${values.partnership_kind} partnership proposal.`,
        ),
        sentenceValue(values.message),
        pick(
          `Le partenaire apporte : ${sentenceValue(values.partner_contribution)} La contribution attendue est : ${sentenceValue(values.expected_contribution)} Calendrier : ${values.timeline}.`,
          `The partner contributes: ${sentenceValue(values.partner_contribution)} The expected contribution is: ${sentenceValue(values.expected_contribution)} Timeframe: ${values.timeline}.`,
        ),
      ]
    } else {
      paragraphs = [
        pick(`${name} vous contacte au sujet de « ${subject} ».`, `${name} is contacting you about “${subject}”.`),
        sentenceValue(values.message),
        pick(`Canal de réponse préféré : ${values.reply_channel}.`, `Preferred reply channel: ${values.reply_channel}.`),
      ]
    }

    return {
      detail_project_kind: values.project_kind,
      detail_target_users: values.target_users,
      detail_message: values.message,
      detail_deliverables: values.deliverables,
      detail_existing_product: values.existing_product,
      detail_budget: values.budget,
      detail_timeline: values.timeline,
      detail_expertise: values.expertise,
      detail_work_mode: values.work_mode,
      detail_duration: values.duration,
      detail_partnership_kind: values.partnership_kind,
      detail_partner_contribution: values.partner_contribution,
      detail_expected_contribution: values.expected_contribution,
      detail_reply_channel: values.reply_channel,
      detail_paragraph_1: paragraphs[0],
      detail_paragraph_2: paragraphs[1],
      detail_paragraph_3: paragraphs[2],
      request_details: paragraphs.join('\n\n'),
    }
  }

  function goToNextStep() {
    const panel = formRef.current?.querySelector<HTMLElement>(`[data-step="${step}"]`)
    const controls =
      panel?.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      ) ?? []
    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity()
        control.focus()
        return
      }
    }
    setStep((current) => Math.min(4, current + 1))
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function goToPreviousStep() {
    setError('')
    setStep((current) => Math.max(1, current - 1))
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    setError('')
    setAttachmentError('')
    setSubmitting(true)

    const form = event.currentTarget
    const data = new FormData(form)
    if (fieldValue(data, 'website') !== 'Non renseigné') {
      setSent(true)
      setSubmitting(false)
      return
    }
    if (Date.now() - lastSubmission.current < 30_000) {
      setError(
        pick(
          'Veuillez patienter avant d’envoyer une nouvelle demande.',
          'Please wait before sending another request.',
        ),
      )
      setSubmitting(false)
      return
    }

    const files = ['attachment_1', 'attachment_2', 'attachment_3']
      .map((name) => data.get(name))
      .filter((item): item is File => item instanceof File && item.size > 0)
    if (
      files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_SIZE ||
      !(await Promise.all(files.map(validateFile))).every(Boolean)
    ) {
      setAttachmentError(
        pick(
          'Pièce jointe refusée. Utilisez au maximum 3 fichiers PDF, JPG ou PNG, 5 Mo chacun et 10 Mo au total.',
          'Attachment rejected. Use up to 3 PDF, JPG or PNG files, 5 MB each and 10 MB total.',
        ),
      )
      setSubmitting(false)
      return
    }

    const hiddenValues = {
      request_type: type,
      request_type_label: labels[type],
      subject: singleLineValue(data, 'request_title'),
      sender_name: singleLineValue(data, 'name'),
      reply_to: singleLineValue(data, 'email'),
      phone: singleLineValue(data, 'phone'),
      organization: singleLineValue(data, 'organization'),
      ...buildRequestDetails(data),
      submitted_at: new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(
        new Date(),
      ),
      page_url: window.location.href,
    }
    const hiddenInputs = Object.entries(hiddenValues).map(([name, inputValue]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = inputValue
      form.append(input)
      return input
    })
    try {
      await emailjs.sendForm(emailConfig.serviceId, emailConfig.templateId, form, {
        publicKey: emailConfig.publicKey,
      })
      lastSubmission.current = Date.now()
      form.reset()
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (sendError) {
      const technicalMessage =
        sendError instanceof Error
          ? sendError.message
          : typeof sendError === 'object' && sendError !== null && 'text' in sendError
            ? String(sendError.text)
            : String(sendError)
      setError(
        pick(
          `L’envoi EmailJS a échoué : ${technicalMessage}`,
          `EmailJS delivery failed: ${technicalMessage}`,
        ),
      )
    } finally {
      hiddenInputs.forEach((input) => input.remove())
      setSubmitting(false)
    }
  }

  return (
    <main className="bf-inquiry-page">
      <header className="bf-inquiry-hero">
        <div className="bf-page-container">
          <Link to="/contact" className="bf-back">
            <ArrowLeft /> {pick('Retour au contact', 'Back to contact')}
          </Link>
          <div className="bf-inquiry-hero-grid">
            <div>
              <div className="bf-accent light" />
              <p className="bf-kicker">{pick('Nouvelle demande', 'New request')}</p>
              <h1>
                {pick('Choisissez le bon cadre pour', 'Choose the right format for')}{' '}
                <span>{pick('votre demande.', 'your request.')}</span>
              </h1>
              <p>
                {pick(
                  'Les questions s’adaptent automatiquement afin que je reçoive uniquement les informations utiles.',
                  'Questions adapt automatically so I only receive useful information.',
                )}
              </p>
            </div>
            <aside>
              <FileText />
              <strong>{pick('Formulaire personnalisé', 'Tailored form')}</strong>
              <span>
                {pick('Seuls les champs pertinents sont affichés.', 'Only relevant fields are displayed.')}
              </span>
            </aside>
          </div>
        </div>
      </header>

      <section className="bf-inquiry-body">
        <div className="bf-page-container bf-inquiry-layout">
          <aside className="bf-form-guide">
            <p className="bf-kicker">{pick('Votre demande', 'Your request')}</p>
            <h2>
              {pick(
                'Un message clair facilite une réponse précise.',
                'A clear message leads to a precise answer.',
              )}
            </h2>
            <ul>
              <li>
                <Check /> {pick('Choisissez votre type de demande', 'Choose your request type')}
              </li>
              <li>
                <Check /> {pick('Renseignez les informations utiles', 'Share the useful information')}
              </li>
              <li>
                <Check /> {pick('Recevez une réponse par e-mail', 'Receive a reply by email')}
              </li>
            </ul>
            <div>
              <ShieldCheck />
              <p>
                <strong>{pick('Confidentialité', 'Privacy')}</strong>
                <br />
                {pick(
                  'Vos informations servent uniquement à traiter votre demande.',
                  'Your information is only used to process your request.',
                )}
              </p>
            </div>
          </aside>

          <form ref={formRef} className="bf-inquiry-form" onSubmit={submit} encType="multipart/form-data">
            <div className="bf-honeypot" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {sent ? (
              <Success
                pick={pick}
                reset={() => {
                  setSent(false)
                  setError('')
                  setStep(1)
                }}
              />
            ) : (
              <>
                <StepProgress step={step} pick={pick} />
                <div className="bf-form-step" data-step="1" hidden={step !== 1}>
                  <fieldset>
                    <legend>
                      <span>01</span> {pick('Quelle est votre demande ?', 'What is your request?')}{' '}
                      <b className="bf-required-mark" aria-hidden="true">
                        *
                      </b>
                    </legend>
                    <div className="bf-request-types">
                      {(
                        [
                          [
                            'project',
                            pick('Nouveau projet', 'New project'),
                            pick(
                              'Créer ou refondre un produit numérique',
                              'Create or redesign a digital product',
                            ),
                          ],
                          [
                            'mission',
                            pick('Mission', 'Assignment'),
                            pick('Intervenir avec une expertise précise', 'Provide specific expertise'),
                          ],
                          [
                            'partnership',
                            pick('Partenariat', 'Partnership'),
                            pick('Construire une collaboration commune', 'Build a joint collaboration'),
                          ],
                          [
                            'message',
                            pick('Prise de contact', 'Contact'),
                            pick('Question, échange ou message simple', 'Question, conversation or message'),
                          ],
                        ] as Array<[RequestType, string, string]>
                      ).map(([kind, label, help]) => (
                        <label key={kind} className={type === kind ? 'selected' : ''}>
                          <input
                            required
                            type="radio"
                            name="type"
                            value={kind}
                            checked={type === kind}
                            onChange={() => {
                              setType(kind)
                              setError('')
                            }}
                          />
                          <strong>{label}</strong>
                          <small>{help}</small>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <StepActions pick={pick} next={goToNextStep} />
                </div>

                <div className="bf-form-step" data-step="2" hidden={step !== 2}>
                  <ContactFields pick={pick} organizationRequired={type === 'partnership'} />
                  <StepActions pick={pick} previous={goToPreviousStep} next={goToNextStep} />
                </div>

                <div className="bf-form-step" data-step="3" hidden={step !== 3}>
                  {type === 'project' && <ProjectFields pick={pick} />}
                  {type === 'mission' && <MissionFields pick={pick} />}
                  {type === 'partnership' && <PartnershipFields pick={pick} />}
                  {type === 'message' && <MessageFields pick={pick} />}
                  <StepActions pick={pick} previous={goToPreviousStep} next={goToNextStep} />
                </div>

                <div className="bf-form-step" data-step="4" hidden={step !== 4}>
                  <AttachmentFields
                    pick={pick}
                    error={attachmentError}
                    clearError={() => setAttachmentError('')}
                  />

                  <fieldset className="bf-consent-fieldset">
                    <label className="bf-consent">
                      <input required type="checkbox" />
                      <span>
                        {pick(
                          'J’accepte que mes informations soient utilisées uniquement pour traiter et répondre à cette demande.',
                          'I agree that my information may only be used to process and answer this request.',
                        )}
                      </span>
                    </label>
                  </fieldset>
                  {error && (
                    <p className="bf-form-error" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="bf-submit-row">
                    <button className="bf-step-back" type="button" onClick={goToPreviousStep}>
                      <ArrowLeft /> {pick('Retour', 'Back')}
                    </button>
                    <p>
                      <ShieldCheck />{' '}
                      {pick(
                        'Envoi sécurisé directement vers ma boîte e-mail.',
                        'Secure delivery directly to my inbox.',
                      )}
                    </p>
                    <button
                      className="bf-button primary submit-loading-button"
                      type="submit"
                      disabled={submitting}
                      aria-busy={submitting}
                      aria-label={submitting ? pick('Envoi en cours', 'Sending') : undefined}
                    >
                      {submitting ? (
                        <span className="button-spinner" aria-hidden="true" />
                      ) : (
                        <>
                          {pick('Envoyer la demande', 'Send request')} <Send />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </main>
  )
}

function StepProgress({ step, pick }: { step: number; pick: Pick }) {
  const steps = [
    pick('Type', 'Type'),
    pick('Coordonnées', 'Contact'),
    pick('Détails', 'Details'),
    pick('Envoi', 'Send'),
  ]
  return (
    <div className="bf-step-progress" aria-label={pick('Progression du formulaire', 'Form progress')}>
      <div className="bf-step-progress-bar">
        <i style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
      </div>
      <ol>
        {steps.map((label, index) => (
          <li key={label} className={step === index + 1 ? 'active' : step > index + 1 ? 'complete' : ''}>
            <span>{step > index + 1 ? <Check /> : index + 1}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>
    </div>
  )
}

function StepActions({ pick, previous, next }: { pick: Pick; previous?: () => void; next: () => void }) {
  return (
    <div className="bf-step-actions">
      {previous ? (
        <button className="bf-step-back" type="button" onClick={previous}>
          <ArrowLeft /> {pick('Retour', 'Back')}
        </button>
      ) : (
        <span />
      )}
      <button className="bf-button primary" type="button" onClick={next}>
        {pick('Continuer', 'Continue')} <ArrowRight />
      </button>
    </div>
  )
}

function ContactFields({ pick, organizationRequired }: { pick: Pick; organizationRequired: boolean }) {
  return (
    <fieldset>
      <legend>
        <span>02</span> {pick('Vos coordonnées', 'Your contact details')}
      </legend>
      <div className="bf-form-row">
        <label>
          {pick('Nom complet', 'Full name')}
          <input
            required
            minLength={2}
            maxLength={100}
            name="name"
            autoComplete="name"
            placeholder={pick('Votre nom et prénom', 'Your full name')}
          />
        </label>
        <label>
          {pick('Adresse e-mail', 'Email address')}
          <input
            required
            maxLength={254}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="vous@entreprise.com"
          />
        </label>
      </div>
      <div className="bf-form-row">
        <label>
          {pick('Organisation', 'Organization')}
          <input
            required={organizationRequired}
            maxLength={150}
            name="organization"
            autoComplete="organization"
            placeholder={
              organizationRequired
                ? pick('Organisation représentée', 'Organization represented')
                : pick('Optionnel', 'Optional')
            }
          />
        </label>
        <label>
          {pick('Téléphone', 'Phone')}
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            minLength={7}
            maxLength={25}
            pattern="[+0-9 ()-]{7,25}"
            placeholder={pick('Optionnel', 'Optional')}
          />
        </label>
      </div>
    </fieldset>
  )
}

function SelectWithOther({
  pick,
  name,
  options,
  required = false,
  label,
}: {
  pick: Pick
  name: string
  options: string[]
  required?: boolean
  label: string
}) {
  const [selected, setSelected] = useState('')
  return (
    <label>
      {label}
      <select
        required={required}
        name={name}
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
      >
        <option value="" disabled={required}>
          {required ? pick('Sélectionner', 'Select') : pick('Non défini', 'Not defined')}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="__other">{pick('Autre — préciser', 'Other — specify')}</option>
      </select>
      {selected === '__other' && (
        <input
          required
          minLength={2}
          maxLength={160}
          name={`${name}_other`}
          placeholder={pick('Précisez votre choix', 'Specify your choice')}
          aria-label={pick(`Autre valeur pour ${label}`, `Other value for ${label}`)}
        />
      )}
    </label>
  )
}

function ProjectFields({ pick }: { pick: Pick }) {
  return (
    <fieldset className="bf-dynamic-fieldset">
      <legend>
        <span>03</span> {pick('Votre projet', 'Your project')}
      </legend>
      <label>
        {pick('Nom ou titre du projet', 'Project name or title')}
        <input
          required
          minLength={3}
          maxLength={160}
          name="request_title"
          placeholder={pick('Ex. Plateforme de gestion immobilière', 'E.g. Real-estate management platform')}
        />
      </label>
      <div className="bf-form-row">
        <SelectWithOther
          pick={pick}
          required
          name="project_kind"
          label={pick('Type de produit', 'Product type')}
          options={[
            'Site web',
            'Application web',
            'Application mobile',
            'Data / Machine Learning',
            'Intelligence artificielle',
          ]}
        />
        <label>
          {pick('Utilisateurs concernés', 'Target users')}
          <input
            required
            minLength={3}
            maxLength={200}
            name="target_users"
            placeholder={pick('Qui utilisera la solution ?', 'Who will use the solution?')}
          />
        </label>
      </div>
      <label>
        {pick('Contexte, problème et objectif', 'Context, problem and goal')}
        <textarea
          required
          minLength={20}
          maxLength={5000}
          name="message"
          rows={6}
          placeholder={pick(
            'Décrivez la situation et ce que le produit doit résoudre…',
            'Describe the situation and what the product should solve…',
          )}
        />
      </label>
      <label>
        {pick('Fonctionnalités ou résultat attendu', 'Expected features or outcome')}
        <textarea required minLength={10} maxLength={3000} name="deliverables" rows={4} />
      </label>
      <label>
        {pick('Lien vers un produit existant', 'Existing product link')}
        <input type="url" maxLength={500} name="existing_product" placeholder="https://" />
      </label>
      <Framework pick={pick} />
    </fieldset>
  )
}

function MissionFields({ pick }: { pick: Pick }) {
  return (
    <fieldset className="bf-dynamic-fieldset">
      <legend>
        <span>03</span> {pick('La mission', 'The assignment')}
      </legend>
      <label>
        {pick('Intitulé de la mission', 'Assignment title')}
        <input
          required
          minLength={3}
          maxLength={160}
          name="request_title"
          placeholder={pick(
            'Ex. Développeur Full Stack React / Node.js',
            'E.g. Full Stack React / Node.js developer',
          )}
        />
      </label>
      <label>
        {pick('Expertise recherchée', 'Expertise needed')}
        <input
          required
          minLength={3}
          maxLength={300}
          name="expertise"
          placeholder={pick(
            'Technologies, compétences ou rôle attendu',
            'Technologies, skills or expected role',
          )}
        />
      </label>
      <label>
        {pick('Contexte et périmètre', 'Context and scope')}
        <textarea
          required
          minLength={20}
          maxLength={5000}
          name="message"
          rows={6}
          placeholder={pick(
            'Présentez l’équipe, le produit et les responsabilités…',
            'Describe the team, product and responsibilities…',
          )}
        />
      </label>
      <label>
        {pick('Livrables ou objectifs attendus', 'Expected deliverables or goals')}
        <textarea required minLength={10} maxLength={3000} name="deliverables" rows={4} />
      </label>
      <div className="bf-form-row">
        <SelectWithOther
          pick={pick}
          required
          name="work_mode"
          label={pick('Mode de travail', 'Work mode')}
          options={[pick('À distance', 'Remote'), pick('Sur site', 'On-site'), 'Hybride']}
        />
        <label>
          {pick('Durée estimée', 'Estimated duration')}
          <input
            required
            minLength={2}
            maxLength={100}
            name="duration"
            placeholder={pick('Ex. 3 mois', 'E.g. 3 months')}
          />
        </label>
      </div>
      <Framework pick={pick} mission />
    </fieldset>
  )
}

function PartnershipFields({ pick }: { pick: Pick }) {
  return (
    <fieldset className="bf-dynamic-fieldset">
      <legend>
        <span>03</span> {pick('Le partenariat', 'The partnership')}
      </legend>
      <label>
        {pick('Objet du partenariat', 'Partnership subject')}
        <input
          required
          minLength={3}
          maxLength={160}
          name="request_title"
          placeholder={pick('Résumez la proposition en une phrase', 'Summarize the proposal in one sentence')}
        />
      </label>
      <SelectWithOther
        pick={pick}
        required
        name="partnership_kind"
        label={pick('Nature du partenariat', 'Partnership type')}
        options={[
          pick('Co-création de produit', 'Product co-creation'),
          pick('Partenariat technique', 'Technical partnership'),
          pick('Événement ou formation', 'Event or training'),
          pick('Recherche et innovation', 'Research and innovation'),
        ]}
      />
      <label>
        {pick('Proposition et objectif commun', 'Proposal and shared goal')}
        <textarea required minLength={20} maxLength={5000} name="message" rows={6} />
      </label>
      <label>
        {pick('Ce que vous apportez', 'What you bring')}
        <textarea required minLength={10} maxLength={3000} name="partner_contribution" rows={4} />
      </label>
      <label>
        {pick('Ce que vous attendez de moi', 'What you expect from me')}
        <textarea required minLength={10} maxLength={3000} name="expected_contribution" rows={4} />
      </label>
      <SelectWithOther
        pick={pick}
        name="timeline"
        label={pick('Calendrier envisagé', 'Expected timeframe')}
        options={[
          pick('Dès que possible', 'As soon as possible'),
          pick('Dans 1 à 3 mois', 'Within 1 to 3 months'),
          pick('Dans 3 à 6 mois', 'Within 3 to 6 months'),
          pick('Plus tard', 'Later'),
        ]}
      />
    </fieldset>
  )
}

function MessageFields({ pick }: { pick: Pick }) {
  return (
    <fieldset className="bf-dynamic-fieldset">
      <legend>
        <span>03</span> {pick('Votre message', 'Your message')}
      </legend>
      <label>
        {pick('Objet', 'Subject')}
        <input
          required
          minLength={3}
          maxLength={160}
          name="request_title"
          placeholder={pick('Pourquoi souhaitez-vous me contacter ?', 'Why would you like to contact me?')}
        />
      </label>
      <label>
        {pick('Message', 'Message')}
        <textarea
          required
          minLength={10}
          maxLength={5000}
          name="message"
          rows={7}
          placeholder={pick('Écrivez votre message ici…', 'Write your message here…')}
        />
      </label>
      <SelectWithOther
        pick={pick}
        name="reply_channel"
        label={pick('Canal de réponse préféré', 'Preferred reply channel')}
        options={['E-mail', pick('Téléphone', 'Phone'), 'LinkedIn']}
      />
    </fieldset>
  )
}

function Framework({ pick, mission = false }: { pick: Pick; mission?: boolean }) {
  return (
    <div className="bf-form-row">
      <SelectWithOther
        pick={pick}
        name="budget"
        label={
          mission ? pick('Budget ou TJM', 'Budget or daily rate') : pick('Budget estimé', 'Estimated budget')
        }
        options={[
          pick('Moins de 500 000 FCFA', 'Under 500,000 FCFA'),
          '500 000 – 1 500 000 FCFA',
          '1 500 000 – 5 000 000 FCFA',
          pick('Plus de 5 000 000 FCFA', 'Over 5,000,000 FCFA'),
        ]}
      />
      <SelectWithOther
        pick={pick}
        name="timeline"
        label={pick('Démarrage souhaité', 'Desired start')}
        options={[
          pick('Dès que possible', 'As soon as possible'),
          pick('Dans 1 à 3 mois', 'Within 1 to 3 months'),
          pick('Dans 3 à 6 mois', 'Within 3 to 6 months'),
          pick('Plus tard', 'Later'),
        ]}
      />
    </div>
  )
}

function AttachmentFields({
  pick,
  error,
  clearError,
}: {
  pick: Pick
  error: string
  clearError: () => void
}) {
  return (
    <fieldset className="bf-attachments">
      <legend>
        <span>04</span> {pick('Pièces jointes', 'Attachments')}{' '}
        <small>{pick('(optionnel)', '(optional)')}</small>
      </legend>
      <div className="bf-attachment-intro">
        <Paperclip />
        <p>
          {pick(
            'Ajoutez jusqu’à trois documents. Formats autorisés : PDF, JPG et PNG. Maximum 5 Mo par fichier et 10 Mo au total.',
            'Add up to three documents. Allowed formats: PDF, JPG and PNG. Maximum 5 MB per file and 10 MB total.',
          )}
        </p>
      </div>
      <div className="bf-attachment-grid">
        {[1, 2, 3].map((index) => (
          <label key={index}>
            {pick(`Fichier ${index}`, `File ${index}`)}
            <input
              type="file"
              name={`attachment_${index}`}
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={clearError}
            />
          </label>
        ))}
      </div>
      {error && (
        <p className="bf-form-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function Success({ pick, reset }: { pick: Pick; reset: () => void }) {
  return (
    <div className="bf-request-success">
      <span>
        <Check />
      </span>
      <p className="bf-kicker">{pick('Message envoyé', 'Message sent')}</p>
      <h2>{pick('Votre demande est bien arrivée.', 'Your request has been received.')}</h2>
      <p>
        {pick(
          'Merci. Je vous répondrai directement à l’adresse e-mail indiquée.',
          'Thank you. I will reply directly to the email address provided.',
        )}
      </p>
      <button className="bf-button primary" type="button" onClick={reset}>
        {pick('Faire une autre demande', 'Send another request')}
      </button>
    </div>
  )
}
