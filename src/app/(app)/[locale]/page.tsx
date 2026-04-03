import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { InquiryForm } from '@/components/InquiryForm'
import { Gallery } from '@/components/Gallery'
import { VideoPlayer } from '@/components/VideoPlayer'

const copy = {
  ru: {
    atelier: 'Ландшафтное ателье',
    gooseLabel: 'Смысл Goose Garden',
    gooseStory:
      'В Goose Garden важна не только красота сада, но и маршрут через него: как человек входит, что видит первым, где задерживается, как возвращается к воде, свету и тишине.',
    portfolioDefault: 'Избранные проекты',
    portfolioIntro:
      'Каждый кейс показывает не только посадки и отделку, но и логику пространства: движение, видовые оси, уровни приватности и сценарии жизни.',
    servicesDefault: 'Наши услуги',
    servicesIntro:
      'Мы ведем проект как авторскую композицию: от исследования участка и концепции до посадок, воды, света и финальной атмосферы.',
    processDefault: 'Как мы работаем',
    processIntro:
      'Процесс построен так, чтобы клиент всегда понимал следующий шаг, бюджетную логику и эстетический результат.',
    ctaDefaultTitle: 'Готовы превратить участок в место притяжения?',
    ctaDefaultText:
      'Обсудим масштаб, желаемый сценарий жизни и характер сада. После первого разговора станет понятно, каким может быть ваш Goose Garden.',
    ctaDefaultButton: 'Обсудить проект',
    contactDefault: 'Начать проект',
    contactDefaultText:
      'Оставьте заявку, и мы вернемся с первым ориентиром по составу работ, срокам и следующему шагу.',
    heroCta: 'Обсудить проект',
    heroSecondary: 'Смотреть проекты',
    directLabel: 'Прямой контакт',
    highlightsLabel: 'Что проектируем',
    fallbackServices: [
      {
        title: 'Ландшафтный дизайн',
        description:
          'Концепция, генеральный план, посадки, свет и маршруты, которые собирают участок в цельную композицию.',
      },
      {
        title: 'Озеленение и посадки',
        description:
          'Древесные группы, кустарники и многолетники, рассчитанные на сезонность, уход и долгую визуальную зрелость сада.',
      },
      {
        title: 'Водные объекты',
        description:
          'Пруды, зеркала воды и каскады как часть общей атмосферы и сценария движения по участку.',
      },
      {
        title: 'Мощение и террасы',
        description:
          'Плоскости и покрытия, которые связывают дом, сад и рельеф без ощущения строительной случайности.',
      },
      {
        title: 'Уход и сопровождение',
        description:
          'Сезонный уход и настройка сада после реализации, чтобы композиция оставалась точной и живой.',
      },
      {
        title: 'Консультации',
        description:
          'Аудит существующего участка, усиление атмосферы и понятный план следующих решений.',
      },
    ],
    fallbackProcess: [
      {
        step_number: '01',
        title: 'Погружение в участок',
        description:
          'Изучаем рельеф, свет, архитектуру дома и повседневные сценарии жизни на участке.',
      },
      {
        step_number: '02',
        title: 'Концепция и атмосфера',
        description:
          'Собираем характер сада: вода, маршруты, приватность, посадки и ключевые акценты.',
      },
      {
        step_number: '03',
        title: 'Документация и экономика',
        description:
          'Переводим идею в рабочий проект с понятной сметной логикой и последовательностью реализации.',
      },
      {
        step_number: '04',
        title: 'Реализация и настройка',
        description:
          'Сопровождаем стройку, доводим детали, посадки и свет до целостного финального состояния.',
      },
    ],
    projectType: {
      gallery: 'Фотогалерея',
      video: 'Видео-кейс',
      mixed: 'Смешанный кейс',
    },
    email: 'Email',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
  },
  en: {
    atelier: 'Landscape atelier',
    gooseLabel: 'What Goose Garden Means',
    gooseStory:
      'Goose Garden is not only about visual beauty. It is about routes through the site: how you enter, what you notice first, where you slow down, and how you return to water, light, and quiet.',
    portfolioDefault: 'Selected Projects',
    portfolioIntro:
      'Each case shows more than planting and finishes. It reveals movement, view axes, privacy gradients, and the way a landscape supports daily life.',
    servicesDefault: 'Our Services',
    servicesIntro:
      'We run every project as an authored composition, from site research and concept through planting, water, light, and the final atmosphere.',
    processDefault: 'How We Work',
    processIntro:
      'The process is designed so the client always understands the next step, the budget logic, and the aesthetic outcome.',
    ctaDefaultTitle: 'Ready to turn your site into a place of return?',
    ctaDefaultText:
      'We discuss the scale, the desired lifestyle scenario, and the character of the garden. After the first conversation, the future Goose Garden becomes tangible.',
    ctaDefaultButton: 'Start Your Project',
    contactDefault: 'Start Your Project',
    contactDefaultText:
      'Leave a request and we will return with the first view on scope, timing, and the right next step.',
    heroCta: 'Start Your Project',
    heroSecondary: 'View Projects',
    directLabel: 'Direct Contact',
    highlightsLabel: 'Design Focus',
    fallbackServices: [
      {
        title: 'Landscape Design',
        description:
          'Concept, master plan, planting, lighting, and route logic that turns a site into one coherent composition.',
      },
      {
        title: 'Planting & Greening',
        description:
          'Trees, shrubs, and perennial groups chosen for seasonality, maintenance, and long-term maturity.',
      },
      {
        title: 'Water Features',
        description:
          'Ponds, reflective water planes, and cascades integrated into the emotional logic of the landscape.',
      },
      {
        title: 'Paving & Terraces',
        description:
          'Surfaces and materials that connect the house, garden, and terrain without feeling accidental.',
      },
      {
        title: 'Maintenance & Curation',
        description:
          'Seasonal care and post-build tuning so the composition stays precise and alive over time.',
      },
      {
        title: 'Consulting',
        description:
          'Site review, atmosphere upgrades, and a clear action plan for the next design decisions.',
      },
    ],
    fallbackProcess: [
      {
        step_number: '01',
        title: 'Reading the Site',
        description:
          'We study terrain, light, architecture, and the daily routines the landscape needs to support.',
      },
      {
        step_number: '02',
        title: 'Concept & Atmosphere',
        description:
          'We define the role of water, routes, privacy, planting, and the spatial tempo of the garden.',
      },
      {
        step_number: '03',
        title: 'Documentation & Budget',
        description:
          'The idea becomes a buildable project with clear cost logic and a structured implementation path.',
      },
      {
        step_number: '04',
        title: 'Build & Tune',
        description:
          'We supervise execution and fine-tune details, planting, and lighting into a complete final mood.',
      },
    ],
    projectType: {
      gallery: 'Photo gallery',
      video: 'Video case',
      mixed: 'Mixed case',
    },
    email: 'Email',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
  },
}

function resolveProjectType(project: any): 'gallery' | 'video' | 'mixed' {
  if (project?.project_type) {
    return project.project_type
  }

  const hasVideo = project?.source_type && project.source_type !== 'none'
  const hasGallery = Array.isArray(project?.gallery_images) && project.gallery_images.length > 0

  if (hasVideo && hasGallery) return 'mixed'
  if (hasVideo) return 'video'
  return 'gallery'
}

function getVideoSource(project: any) {
  if (project?.source_type === 'uploaded_file' && typeof project?.video_file === 'object') {
    return project.video_file?.url || ''
  }

  if (project?.source_type === 'external_url') {
    return project.external_video_url || ''
  }

  return ''
}

function renderParagraphs(value?: string | null) {
  if (!value) return null

  return value.split('\n').map((paragraph, index) => {
    const trimmed = paragraph.trim()
    if (!trimmed) return null

    return (
      <p key={`${trimmed}-${index}`} className="text-sm leading-7 text-premium-600 md:text-base">
        {trimmed}
      </p>
    )
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const locale = (await params).locale as 'ru' | 'en'
  const payload = await getPayload({ config: configPromise })
  const t = copy[locale] || copy.en

  const [homeData, projects, contactSettings, settings] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', locale: locale as any }),
    payload.find({
      collection: 'portfolio-projects',
      locale: locale as any,
      where: { show_on_homepage: { equals: true }, is_published: { equals: true } },
      sort: 'display_order',
      limit: 6,
    }),
    payload.findGlobal({ slug: 'contact-settings', locale: locale as any }),
    payload.findGlobal({ slug: 'site-settings', locale: locale as any }),
  ])

  const homeTyped = homeData as any
  const contactTyped = contactSettings as any
  const settingsTyped = settings as any
  const servicesFromCms = (homeTyped.services || []).filter(
    (service: any) => service?.title || service?.description,
  )
  const services = servicesFromCms.length > 0 ? servicesFromCms : t.fallbackServices
  const featuredServices = services.slice(0, 3)
  const processStepsFromCms = (homeTyped.process_steps || []).filter(
    (step: any) => step?.title || step?.description,
  )
  const processSteps = processStepsFromCms.length > 0 ? processStepsFromCms : t.fallbackProcess

  return (
    <div className="relative overflow-hidden">
      <section id="hero" className="relative min-h-screen overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
        {homeTyped.hero_image && typeof homeTyped.hero_image === 'object' && homeTyped.hero_image.url ? (
          <Image
            src={homeTyped.hero_image.url}
            alt={homeTyped.hero_image.alt || 'Landscape design'}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,22,18,0.82)_0%,rgba(19,25,18,0.66)_42%,rgba(58,64,49,0.4)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(180deg,rgba(247,245,239,0)_0%,rgba(247,245,239,1)_100%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-4xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/84">
                {t.atelier}
              </span>
              <span className="rounded-full border border-white/14 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-white/62">
                {settingsTyped?.site_name || 'Goose Garden'}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl font-serif text-5xl leading-[0.96] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.6rem]"
            >
              {homeTyped.hero_title || 'Crafting Timeless Landscapes'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              className="mt-7 max-w-2xl text-base leading-8 text-white/78 md:text-lg"
            >
              {homeTyped.hero_subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="rounded-full bg-[#d9d4c7] px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-premium-950 transition-colors hover:bg-white"
              >
                {homeTyped.hero_cta_text || t.heroCta}
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-white/16 bg-white/8 px-7 py-4 text-[0.74rem] uppercase tracking-[0.28em] text-white/84 transition-colors hover:bg-white/14 hover:text-white"
              >
                {t.heroSecondary}
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="justify-self-end rounded-[32px] border border-white/12 bg-[rgba(244,239,228,0.12)] p-6 text-white shadow-[0_24px_80px_rgba(6,10,8,0.28)] backdrop-blur-xl md:max-w-md md:p-7"
          >
            <div className="text-[0.72rem] uppercase tracking-[0.28em] text-white/62">
              {t.gooseLabel}
            </div>
            <p className="mt-4 text-base leading-7 text-white/82">{t.gooseStory}</p>

            <div className="mt-8 border-t border-white/12 pt-6">
              <div className="text-[0.72rem] uppercase tracking-[0.28em] text-white/62">
                {t.highlightsLabel}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {featuredServices.map((service: any, index: number) => (
                  <span
                    key={`${service.title}-${index}`}
                    className="rounded-full border border-white/12 bg-black/10 px-4 py-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/84"
                  >
                    {service.title}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section id="about" className="relative px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[36px] border border-[rgba(116,124,98,0.15)] bg-white shadow-[0_18px_48px_rgba(34,38,29,0.08)]"
          >
            {homeTyped.about_image && typeof homeTyped.about_image === 'object' && homeTyped.about_image.url ? (
              <div className="relative aspect-[4/5]">
                <Image
                  src={homeTyped.about_image.url}
                  alt={homeTyped.about_image.alt || 'About Goose Garden'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,28,22,0.1),rgba(24,28,22,0.42))]" />
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 text-[0.74rem] uppercase tracking-[0.32em] text-[#75805f]">
              {t.gooseLabel}
            </div>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] text-premium-950 md:text-6xl">
              {homeTyped.about_title || 'A Philosophy of Living Space'}
            </h2>

            <div className="mt-7 space-y-5">{renderParagraphs(homeTyped.about_text)}</div>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              <div className="rounded-[28px] border border-[rgba(116,124,98,0.18)] bg-[#f6f2e8] p-5">
                <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#75805f]">
                  {settingsTyped?.site_name || 'Goose Garden'}
                </div>
                <p className="mt-3 text-sm leading-7 text-premium-700">{t.gooseStory}</p>
              </div>
              <div className="rounded-[28px] border border-[rgba(35,37,32,0.08)] bg-white p-5 shadow-[0_12px_30px_rgba(35,37,32,0.05)]">
                <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#75805f]">
                  {t.highlightsLabel}
                </div>
                <div className="mt-4 space-y-3">
                  {featuredServices.map((service: any, index: number) => (
                    <div key={`${service.title}-${index}`} className="flex items-start gap-3">
                      <span className="mt-1 text-xs uppercase tracking-[0.24em] text-[#75805f]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="font-serif text-xl text-premium-900">{service.title}</div>
                        <p className="mt-1 text-sm leading-6 text-premium-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="services"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#f1ecdf_0%,#f7f5ef_100%)] px-6 py-20 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <div className="text-[0.74rem] uppercase tracking-[0.32em] text-[#75805f]">
              {t.atelier}
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-premium-950 md:text-6xl">
              {homeTyped.services_title || t.servicesDefault}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-premium-600">
              {homeTyped.services_intro || t.servicesIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service: any, index: number) => (
              <motion.article
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className="rounded-[30px] border border-[rgba(117,124,100,0.14)] bg-white p-7 shadow-[0_20px_45px_rgba(32,36,28,0.05)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#75805f]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {typeof service.icon === 'object' && service.icon?.url ? (
                    <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[rgba(117,124,100,0.16)] bg-[#f6f2e8] p-3">
                      <Image
                        src={service.icon.url}
                        alt={service.icon.alt || service.title}
                        fill
                        sizes="56px"
                        className="object-contain p-2"
                      />
                    </div>
                  ) : null}
                </div>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-premium-950">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-premium-600 md:text-base">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <div className="text-[0.74rem] uppercase tracking-[0.32em] text-[#75805f]">
              Portfolio
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-premium-950 md:text-6xl">
              {homeTyped.portfolio_section_title || t.portfolioDefault}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-premium-600">
              {homeTyped.portfolio_section_intro || t.portfolioIntro}
            </p>
          </div>

          <div className="space-y-10">
            {projects.docs.map((project: any, index: number) => {
              const projectType = resolveProjectType(project)
              const videoSource = getVideoSource(project)

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-120px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-[34px] border border-[rgba(117,124,100,0.12)] bg-white shadow-[0_22px_60px_rgba(31,35,28,0.07)]"
                >
                  <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-[360px] overflow-hidden bg-premium-950">
                      {typeof project.cover_image === 'object' && project.cover_image?.url ? (
                        <Image
                          src={project.cover_image.url}
                          alt={project.cover_image.alt || project.title}
                          fill
                          sizes="(max-width: 1280px) 100vw, 52vw"
                          className="object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,22,17,0.12),rgba(18,22,17,0.52))]" />
                    </div>

                    <div className="flex flex-col justify-between p-7 md:p-9">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-[#75805f]">
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <span className="rounded-full border border-[rgba(117,124,100,0.2)] px-3 py-1">
                            {t.projectType[projectType]}
                          </span>
                        </div>

                        <h3 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.03em] text-premium-950">
                          {project.title}
                        </h3>

                        <p className="mt-4 text-base leading-8 text-premium-600">
                          {project.short_description}
                        </p>

                        <div className="mt-6 space-y-4">
                          {renderParagraphs(project.full_description)}
                        </div>
                      </div>

                      {videoSource ? (
                        <div className="mt-8 overflow-hidden rounded-[28px] border border-[rgba(117,124,100,0.14)] bg-[#f6f2e8] p-3">
                          <VideoPlayer
                            src={videoSource}
                            poster={
                              typeof project.poster_image === 'object'
                                ? project.poster_image?.url
                                : undefined
                            }
                            autoplay={project.autoplay_enabled}
                            muted={project.muted}
                            loop={project.loop}
                            controls={project.controls}
                            playsinline={project.playsinline}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {project.gallery_images && project.gallery_images.length > 0 ? (
                    <div className="border-t border-[rgba(117,124,100,0.12)] bg-[#fbf9f4] px-4 py-6 md:px-6">
                      <Gallery
                        images={project.gallery_images}
                        enableAutoscroll={project.enable_autoscroll}
                        autoscrollSpeed={project.autoscroll_speed}
                        enableManualNavigation={project.enable_manual_navigation}
                      />
                    </div>
                  ) : null}
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(29,35,27,0.98),rgba(20,24,19,1))] px-6 py-20 text-premium-50 md:px-12 md:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <div className="text-[0.74rem] uppercase tracking-[0.32em] text-[#b6bf9d]">Workflow</div>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
              {homeTyped.process_title || t.processDefault}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-premium-300">
              {homeTyped.process_intro || t.processIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step: any, index: number) => (
              <motion.article
                key={`${step.title}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm"
              >
                <div className="text-5xl font-serif text-[#b6bf9d]/58">
                  {step.step_number || String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-5 font-serif text-2xl text-premium-50">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-premium-300">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-[rgba(117,124,100,0.12)] bg-[linear-gradient(135deg,#f1ecdf_0%,#f8f6ef_55%,#ece5d5_100%)] p-8 shadow-[0_20px_60px_rgba(31,35,28,0.08)] md:p-12">
          <div className="max-w-4xl">
            <div className="text-[0.74rem] uppercase tracking-[0.32em] text-[#75805f]">
              {settingsTyped?.site_name || 'Goose Garden'}
            </div>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] text-premium-950 md:text-6xl">
              {homeTyped.cta_title || t.ctaDefaultTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-premium-600">
              {homeTyped.cta_text || t.ctaDefaultText}
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex rounded-full bg-premium-950 px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-premium-50 transition-colors hover:bg-[#596147]"
            >
              {homeTyped.cta_button_text || t.ctaDefaultButton}
            </a>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#2d3428_0%,#1c2118_100%)] px-6 py-20 text-premium-50 md:px-12 md:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-7">
            <div>
              <div className="text-[0.74rem] uppercase tracking-[0.32em] text-[#b6bf9d]">
                {t.directLabel}
              </div>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.03em] md:text-6xl">
                {homeTyped.contact_section_title || t.contactDefault}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-premium-300">
                {homeTyped.contact_section_text || t.contactDefaultText}
              </p>
            </div>

            <div className="grid gap-4">
              {contactTyped?.email ? (
                <a
                  href={`mailto:${contactTyped.email}?subject=${encodeURIComponent(contactTyped.message_templates?.email_subject || 'Inquiry')}&body=${encodeURIComponent(contactTyped.message_templates?.email_body || '')}`}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#d7d3c6]/30 hover:bg-white/8"
                >
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#b6bf9d]">
                    {t.email}
                  </div>
                  <div className="mt-2 text-lg text-premium-50">{contactTyped.email}</div>
                </a>
              ) : null}

              {contactTyped?.telegram_username ? (
                <a
                  href={`https://t.me/${contactTyped.telegram_username.replace('@', '')}?text=${encodeURIComponent(contactTyped.message_templates?.telegram_text || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#d7d3c6]/30 hover:bg-white/8"
                >
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#b6bf9d]">
                    {t.telegram}
                  </div>
                  <div className="mt-2 text-lg text-premium-50">
                    @{contactTyped.telegram_username.replace('@', '')}
                  </div>
                </a>
              ) : null}

              {contactTyped?.whatsapp_number ? (
                <a
                  href={`https://wa.me/${contactTyped.whatsapp_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(contactTyped.message_templates?.whatsapp_text || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5 transition-colors hover:border-[#d7d3c6]/30 hover:bg-white/8"
                >
                  <div className="text-[0.72rem] uppercase tracking-[0.28em] text-[#b6bf9d]">
                    {t.whatsapp}
                  </div>
                  <div className="mt-2 text-lg text-premium-50">{contactTyped.whatsapp_number}</div>
                </a>
              ) : null}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/6 p-6 shadow-[0_24px_80px_rgba(8,11,8,0.18)] backdrop-blur-md md:p-8">
            <InquiryForm locale={locale} />
          </div>
        </div>
      </section>
    </div>
  )
}
