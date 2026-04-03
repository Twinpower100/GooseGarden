import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPath = path.resolve(__dirname, '..', '.env')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) return

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) return

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim()
    process.env[key] = value.replace(/^["']|["']$/g, '')
  })
}

const { getPayload } = await import('payload')
const configModule = await import('./payload.config.js')
const configPromise = configModule.default

const IMAGE_ASSETS = {
  hero: {
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80',
    altRu: 'Панорама ландшафтного проекта Goose Garden',
    altEn: 'Goose Garden landscape panorama',
  },
  about: {
    url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1400&q=80',
    altRu: 'Детали сада с мягким освещением',
    altEn: 'Garden details with warm light',
  },
  lakesideCover: {
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1600&q=80',
    altRu: 'Резиденция у озера, общий план',
    altEn: 'Lakeside residence overview',
  },
  lakesideGallery1: {
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
    altRu: 'Терраса у воды',
    altEn: 'Waterside terrace',
  },
  lakesideGallery2: {
    url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1200&q=80',
    altRu: 'Каскад и посадки',
    altEn: 'Cascade and planting',
  },
  lakesideGallery3: {
    url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80',
    altRu: 'Вечерняя зона отдыха',
    altEn: 'Evening lounge area',
  },
  lakesideGallery4: {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    altRu: 'Прогулочный маршрут вдоль берега',
    altEn: 'Walking route along the water',
  },
  lakesideGallery5: {
    url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80',
    altRu: 'Вид на дом и зеленые массивы',
    altEn: 'View toward the house and planting masses',
  },
  modernCover: {
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80',
    altRu: 'Современный сад с геометрией',
    altEn: 'Contemporary garden with strong geometry',
  },
  modernGallery1: {
    url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
    altRu: 'Мягкие травы и бетонные плоскости',
    altEn: 'Soft grasses and concrete planes',
  },
  modernGallery2: {
    url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80',
    altRu: 'Вечернее освещение маршрутов',
    altEn: 'Evening route lighting',
  },
  modernGallery3: {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
    altRu: 'Отражение зелени в спокойной воде',
    altEn: 'Greenery reflected in still water',
  },
  modernGallery4: {
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
    altRu: 'Широкая плоскость газона и деревья',
    altEn: 'Wide lawn plane and trees',
  },
  modernGallery5: {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    altRu: 'Глубина маршрута через посадки',
    altEn: 'Depth of route through planting',
  },
  filmCover: {
    url: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1600&q=80',
    altRu: 'Камерный двор с вечерним светом',
    altEn: 'Private courtyard with evening light',
  },
  filmPoster: {
    url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1400&q=80',
    altRu: 'Постер видео-кейса',
    altEn: 'Video case poster',
  },
} as const

const LOCAL_BRAND_ASSETS = {
  logo: {
    path: path.resolve(__dirname, 'assets', 'brand', 'goose-garden-mark.svg'),
    fileName: 'goose-garden-mark.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Логотип Goose Garden',
    altEn: 'Goose Garden logo',
  },
  serviceLandscape: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-landscape-design.svg'),
    fileName: 'icon-landscape-design.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка ландшафтного дизайна',
    altEn: 'Landscape design icon',
  },
  servicePlanting: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-planting.svg'),
    fileName: 'icon-planting.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка озеленения и посадок',
    altEn: 'Planting and greening icon',
  },
  serviceWater: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-water-features.svg'),
    fileName: 'icon-water-features.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка водных объектов',
    altEn: 'Water features icon',
  },
  servicePaving: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-paving-terraces.svg'),
    fileName: 'icon-paving-terraces.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка мощения и террас',
    altEn: 'Paving and terraces icon',
  },
  serviceMaintenance: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-maintenance.svg'),
    fileName: 'icon-maintenance.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка ухода и сопровождения',
    altEn: 'Maintenance and curation icon',
  },
  serviceConsulting: {
    path: path.resolve(__dirname, 'assets', 'brand', 'icon-consulting.svg'),
    fileName: 'icon-consulting.svg',
    mimeType: 'image/svg+xml',
    altRu: 'Иконка консультаций',
    altEn: 'Consulting icon',
  },
} as const

const VIDEO_ASSETS = {
  uploaded: {
    url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    filename: 'goose-garden-showreel.mp4',
    altRu: 'Демо-видео Goose Garden',
    altEn: 'Goose Garden demo video',
  },
  externalUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
} as const

async function downloadAsset(url: string) {
  const response = await fetch(url, { redirect: 'follow' })

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const mimeType = response.headers.get('content-type') || 'application/octet-stream'

  return {
    buffer: Buffer.from(arrayBuffer),
    mimeType,
  }
}

function readLocalAsset(filePath: string, mimeType: string) {
  return {
    buffer: fs.readFileSync(filePath),
    mimeType,
  }
}

async function uploadMedia(
  payload: any,
  fileName: string,
  mimeType: string,
  buffer: Buffer,
  altRu: string,
  altEn: string,
) {
  const created = await payload.create({
    collection: 'media',
    data: {
      alt: altRu,
    },
    file: {
      data: buffer,
      mimetype: mimeType,
      name: fileName,
      size: buffer.length,
    },
  })

  await payload.update({
    collection: 'media',
    id: created.id,
    locale: 'en',
    data: {
      alt: altEn,
    },
  })

  return created.id
}

async function clearCollection(payload: any, collection: string) {
  const docs = await payload.find({
    collection,
    limit: 100,
    depth: 0,
  })

  for (const doc of docs.docs) {
    await payload.delete({
      collection,
      id: doc.id,
    })
  }
}

async function createProject(payload: any, data: Record<string, any>) {
  const created = await payload.create({
    collection: 'portfolio-projects',
    locale: 'ru',
    data: data.ru,
  })

  await payload.update({
    collection: 'portfolio-projects',
    id: created.id,
    locale: 'en',
    data: data.en,
  })
}

async function seed() {
  console.log('\nGoose Garden: seeding content...\n')

  const payload = await getPayload({ config: configPromise })
  const mediaIds: Record<string, number> = {}

  console.log('1. Downloading and uploading media...')

  for (const [key, asset] of Object.entries(IMAGE_ASSETS)) {
    const { buffer, mimeType } = await downloadAsset(asset.url)
    mediaIds[key] = await uploadMedia(
      payload,
      `${key}.jpg`,
      mimeType,
      buffer,
      asset.altRu,
      asset.altEn,
    )
  }

  for (const [key, asset] of Object.entries(LOCAL_BRAND_ASSETS)) {
    const { buffer, mimeType } = readLocalAsset(asset.path, asset.mimeType)
    mediaIds[key] = await uploadMedia(
      payload,
      asset.fileName,
      mimeType,
      buffer,
      asset.altRu,
      asset.altEn,
    )
  }

  const uploadedVideo = await downloadAsset(VIDEO_ASSETS.uploaded.url)
  mediaIds.uploadedVideo = await uploadMedia(
    payload,
    VIDEO_ASSETS.uploaded.filename,
    uploadedVideo.mimeType,
    uploadedVideo.buffer,
    VIDEO_ASSETS.uploaded.altRu,
    VIDEO_ASSETS.uploaded.altEn,
  )

  console.log('2. Resetting portfolio demo documents...')
  await clearCollection(payload, 'portfolio-projects')

  console.log('3. Updating globals...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'ru',
    data: {
      site_name: 'Goose Garden',
      tagline: 'Ландшафтные маршруты, вода, тишина',
      logo: mediaIds.logo,
      seo_defaults: {
        title: 'Goose Garden — премиальный ландшафтный дизайн',
        description:
          'Goose Garden проектирует частные сады и резиденции как спокойные, дорогие пространства с выразительной логикой маршрутов, света и воды.',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      site_name: 'Goose Garden',
      tagline: 'Landscape routes, water, quiet',
      logo: mediaIds.logo,
      seo_defaults: {
        title: 'Goose Garden — premium landscape design',
        description:
          'Goose Garden designs private gardens and estates as refined spaces shaped by routes, water, light, and calm daily rituals.',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'social-links',
    data: {
      facebook_url: 'https://facebook.com/goosegarden',
      instagram_url: 'https://instagram.com/goosegarden',
      telegram_url: 'https://t.me/goosegarden',
    },
  })

  await payload.updateGlobal({
    slug: 'contact-settings',
    locale: 'ru',
    data: {
      email: 'hello@goosegarden.com',
      telegram_username: '@goosegarden',
      whatsapp_number: '+79001234567',
      message_templates: {
        email_subject: 'Запрос на проект Goose Garden',
        email_body:
          'Здравствуйте! Хочу обсудить проект участка и понять возможный сценарий работ.',
        telegram_text:
          'Здравствуйте! Хочу обсудить проект Goose Garden и получить первый ориентир по работам.',
        whatsapp_text:
          'Здравствуйте! Интересует проект участка в стиле Goose Garden. Подскажите, с чего лучше начать?',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'contact-settings',
    locale: 'en',
    data: {
      message_templates: {
        email_subject: 'Goose Garden project inquiry',
        email_body:
          'Hello! I would like to discuss a landscape project and understand the possible scope of work.',
        telegram_text:
          'Hello! I would like to discuss a Goose Garden project and get an initial view on scope and next steps.',
        whatsapp_text:
          'Hello! I am interested in a Goose Garden landscape project. What would be the best way to start?',
      },
    },
  })

  const homePageRu = await payload.updateGlobal({
    slug: 'home-page',
    locale: 'ru',
    data: {
      hero_title: 'Создаём сады,\nв которые хочется возвращаться',
      hero_subtitle:
        'Goose Garden проектирует премиальные ландшафты как последовательность тихих, выразительных сценариев: маршрут, вода, свет, посадки и ощущение покоя.',
      hero_cta_text: 'Обсудить проект',
      hero_image: mediaIds.hero,
      about_title: 'Goose Garden — это не про декор,\nа про характер пространства',
      about_text:
        'Название Goose Garden родилось из идеи возвращения. Хороший сад не пытается впечатлить каждую секунду: он мягко ведёт человека по участку, открывает виды постепенно и делает ежедневные маршруты красивыми.\n\nМы работаем с частными резиденциями, камерными двориками и представительскими садами. Нас интересует не только посадочный ассортимент, но и то, как пространство держит тишину, как отражает свет, как соединяет дом, террасы и воду.',
      about_image: mediaIds.about,
      services_title: 'Наши услуги',
      services_intro:
        'От первой прогулки по участку до посадок и финальной атмосферы мы собираем проект как цельную композицию, а не набор разрозненных услуг.',
      services: [
        {
          title: 'Ландшафтный дизайн',
          description:
            'Концепция, генеральный план, дендроплан, схемы освещения и полива, сценарии маршрутов и приватности.',
          icon: mediaIds.serviceLandscape,
        },
        {
          title: 'Озеленение и посадки',
          description:
            'Подбор древесных, кустарниковых и многолетних групп с учётом сезона, ухода и возраста пространства.',
          icon: mediaIds.servicePlanting,
        },
        {
          title: 'Водные объекты',
          description:
            'Пруды, зеркала воды, ручьи и каскады как часть общей драматургии участка, а не декоративное приложение.',
          icon: mediaIds.serviceWater,
        },
        {
          title: 'Мощение и террасы',
          description:
            'Материалы, которые связывают архитектуру дома с рельефом и делают маршруты естественными и дорогими по ощущению.',
          icon: mediaIds.servicePaving,
        },
        {
          title: 'Уход и сопровождение',
          description:
            'Сезонный уход, корректировки посадок и поддержание задуманной композиции после сдачи объекта.',
          icon: mediaIds.serviceMaintenance,
        },
        {
          title: 'Консультации',
          description:
            'Разбор существующего участка, точки роста, усиление атмосферы и понятный план следующих решений.',
          icon: mediaIds.serviceConsulting,
        },
      ],
      portfolio_section_title: 'Избранные проекты',
      portfolio_section_intro:
        'В демо-портфолио собраны все форматы контента: фотогалерея, видео-кейс, смешанный кейс с галереей и роликом, а также материалы для главной страницы.',
      process_title: 'Как мы работаем',
      process_intro:
        'Каждый этап нужен не ради бюрократии, а чтобы сохранить качество решения от идеи до последнего кадра сада.',
      process_steps: [
        {
          step_number: '01',
          title: 'Погружение в участок',
          description:
            'Изучаем рельеф, свет, архитектуру дома, привычки семьи и то, каким должен быть ритм пространства.',
        },
        {
          step_number: '02',
          title: 'Концепция и атмосфера',
          description:
            'Формируем характер сада: где появляется вода, какие маршруты становятся главными и как выстраивается чувство приватности.',
        },
        {
          step_number: '03',
          title: 'Документация и смета',
          description:
            'Переводим идею в конкретный проект: планы, материалы, посадки, инженерные решения и ясную экономику реализации.',
        },
        {
          step_number: '04',
          title: 'Реализация и настройка',
          description:
            'Сопровождаем работы, доводим посадки, свет и материалы до задуманного состояния и передаём живое пространство.',
        },
      ],
      cta_title: 'Готовы собрать ваш Goose Garden?',
      cta_text:
        'Расскажите о масштабе участка, доме и желаемом образе жизни. Мы вернёмся с первым видением и понятным следующим шагом.',
      cta_button_text: 'Начать диалог',
      contact_section_title: 'Начать проект',
      contact_section_text:
        'Форма подходит для первого контакта: опишите участок, задачу и желаемые сроки. Ответим с рабочим ориентиром.',
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      hero_title: 'Designing gardens\nyou want to return to',
      hero_subtitle:
        'Goose Garden shapes premium landscapes as a sequence of calm and expressive moments: route, water, light, planting, and the feeling of quiet return.',
      hero_cta_text: 'Start Your Project',
      about_title: 'Goose Garden is not about décor,\nit is about the character of space',
      about_text:
        'The name Goose Garden comes from the idea of return. A strong garden does not try to impress every second. It guides a person through the site, reveals views gradually, and makes daily movement feel beautiful.\n\nWe work with private estates, intimate courtyards, and representative gardens. We care not only about plant palettes, but about how a place holds quiet, reflects light, and connects the house, terraces, and water.',
      services_title: 'Our Services',
      services_intro:
        'From the first walk across the site to planting and final atmosphere, we build each project as one coherent composition rather than a list of disconnected services.',
      services: [
        {
          id: homePageRu.services?.[0]?.id,
          title: 'Landscape Design',
          description:
            'Concept, master plan, planting strategy, lighting, irrigation, and the choreography of routes and privacy.',
          icon: mediaIds.serviceLandscape,
        },
        {
          id: homePageRu.services?.[1]?.id,
          title: 'Planting & Greening',
          description:
            'Trees, shrubs, and perennial groups selected for seasonality, long-term maintenance, and spatial maturity.',
          icon: mediaIds.servicePlanting,
        },
        {
          id: homePageRu.services?.[2]?.id,
          title: 'Water Features',
          description:
            'Ponds, reflective water planes, streams, and cascades integrated into the emotional logic of the site.',
          icon: mediaIds.serviceWater,
        },
        {
          id: homePageRu.services?.[3]?.id,
          title: 'Paving & Terraces',
          description:
            'Materials that connect architecture, terrain, and movement while keeping the landscape expensive in feel.',
          icon: mediaIds.servicePaving,
        },
        {
          id: homePageRu.services?.[4]?.id,
          title: 'Maintenance & Curation',
          description:
            'Seasonal care, planting adjustments, and ongoing support to keep the original composition alive.',
          icon: mediaIds.serviceMaintenance,
        },
        {
          id: homePageRu.services?.[5]?.id,
          title: 'Consulting',
          description:
            'Site assessment, strategic improvements, and a clear action plan for strengthening an existing landscape.',
          icon: mediaIds.serviceConsulting,
        },
      ],
      portfolio_section_title: 'Selected Projects',
      portfolio_section_intro:
        'The demo portfolio includes every major content type: pure gallery, video case, mixed case with gallery and video, and homepage media assets.',
      process_title: 'How We Work',
      process_intro:
        'Every stage exists to protect the quality of the result, from the first idea to the final mood of the finished garden.',
      process_steps: [
        {
          id: homePageRu.process_steps?.[0]?.id,
          step_number: '01',
          title: 'Reading the Site',
          description:
            'We study terrain, light, architecture, family routines, and the emotional tempo the landscape needs to hold.',
        },
        {
          id: homePageRu.process_steps?.[1]?.id,
          step_number: '02',
          title: 'Concept & Atmosphere',
          description:
            'We define the character of the garden: where water appears, which routes matter, and how privacy is layered.',
        },
        {
          id: homePageRu.process_steps?.[2]?.id,
          step_number: '03',
          title: 'Documentation & Budget',
          description:
            'The concept becomes a workable project with planting, materials, engineering, and clear implementation logic.',
        },
        {
          id: homePageRu.process_steps?.[3]?.id,
          step_number: '04',
          title: 'Build & Tune',
          description:
            'We supervise execution, refine planting, lighting, and materials, and hand over a living landscape in balance.',
        },
      ],
      cta_title: 'Ready to shape your own Goose Garden?',
      cta_text:
        'Tell us about the scale of the site, the house, and the lifestyle you want the landscape to support. We return with a first vision and a clear next step.',
      cta_button_text: 'Start the Conversation',
      contact_section_title: 'Start Your Project',
      contact_section_text:
        'The form is built for the first contact: describe the site, the goal, and the desired timing. We respond with a practical first direction.',
    },
  })

  console.log('4. Creating portfolio projects...')
  await createProject(payload, {
    ru: {
      title: 'Резиденция у озера',
      slug: 'lakeside-residence',
      project_type: 'mixed',
      is_published: true,
      display_order: 1,
      show_on_homepage: true,
      short_description:
        'Смешанный кейс для резиденции у озера: маршруты по террасам, каскад, крупные древесные группы и видео-ритм вечернего сценария.',
      full_description:
        'Проект строится вокруг мягкого движения от дома к воде. Террасы разной высоты, отражения в каскаде и слои посадок формируют ощущение частной курортной среды.\n\nВ демо этот кейс показывает сразу два типа контента: фотогалерею и загруженное видео через Payload upload.',
      cover_image: mediaIds.lakesideCover,
      gallery_images: [
        { image: mediaIds.lakesideGallery1 },
        { image: mediaIds.lakesideGallery2 },
        { image: mediaIds.lakesideGallery3 },
        { image: mediaIds.lakesideGallery4 },
        { image: mediaIds.lakesideGallery5 },
      ],
      enable_autoscroll: true,
      autoscroll_speed: 44,
      enable_manual_navigation: true,
      source_type: 'uploaded_file',
      video_file: mediaIds.uploadedVideo,
      poster_image: mediaIds.lakesideCover,
      autoplay_enabled: true,
      muted: true,
      loop: true,
      controls: false,
      playsinline: true,
      seo_title: 'Резиденция у озера — Goose Garden',
      seo_description:
        'Смешанный кейс Goose Garden: частная резиденция у озера с галереей, видео и продуманной ландшафтной драматургией.',
    },
    en: {
      title: 'Lakeside Residence',
      project_type: 'mixed',
      short_description:
        'A mixed-format case for a lakeside estate: terraced routes, cascade, mature planting, and an evening video rhythm.',
      full_description:
        'The project is built around a gentle movement from the house toward the water. Layered terraces, reflections, and planting masses create the feeling of a private retreat.\n\nIn the demo, this case shows both gallery content and an uploaded video handled through Payload media.',
      seo_title: 'Lakeside Residence — Goose Garden',
      seo_description:
        'Mixed-format Goose Garden case with gallery and uploaded video for a private lakeside residence.',
    },
  })

  await createProject(payload, {
    ru: {
      title: 'Сад в стиле модерн',
      slug: 'modern-garden',
      project_type: 'gallery',
      is_published: true,
      display_order: 2,
      show_on_homepage: true,
      short_description:
        'Фотогалерея современного сада с ясной геометрией, травами, архитектурным светом и маршрутами для вечернего проживания.',
      full_description:
        'Этот кейс показывает, как минималистичный сад может выглядеть тёплым и жилым. Мы работаем не только линиями, но и паузами между ними.\n\nВ демо это чистая фотогалерея без видео.',
      cover_image: mediaIds.modernCover,
      gallery_images: [
        { image: mediaIds.modernGallery1 },
        { image: mediaIds.modernGallery2 },
        { image: mediaIds.modernGallery3 },
        { image: mediaIds.modernGallery4 },
        { image: mediaIds.modernGallery5 },
      ],
      enable_autoscroll: false,
      enable_manual_navigation: true,
      source_type: 'none',
      seo_title: 'Сад в стиле модерн — Goose Garden',
      seo_description:
        'Галерейный кейс Goose Garden: современный сад с мягкой геометрией, травами и архитектурным светом.',
    },
    en: {
      title: 'Modern Garden',
      project_type: 'gallery',
      short_description:
        'A pure gallery case of a contemporary garden with sharp geometry, grasses, architectural light, and routes designed for evening living.',
      full_description:
        'This case shows how a minimalist garden can still feel warm and inhabited. We work not only with lines, but with the pauses between them.\n\nIn the demo, this is a gallery-only project without video.',
      seo_title: 'Modern Garden — Goose Garden',
      seo_description:
        'Gallery-only Goose Garden case with contemporary geometry, grasses, and architectural lighting.',
    },
  })

  await createProject(payload, {
    ru: {
      title: 'Камерный двор. Вечерний фильм',
      slug: 'courtyard-evening-film',
      project_type: 'video',
      is_published: true,
      display_order: 3,
      show_on_homepage: true,
      short_description:
        'Видео-кейс про маленький, но насыщенный двор: подсветка, отражения, приватность и работа пространства в сумерках.',
      full_description:
        'Некоторые проекты раскрываются именно в движении кадра. Здесь акцент сделан на том, как маршрут, свет и водная плоскость работают вместе в небольшом частном дворе.\n\nВ демо этот кейс показывает формат external video URL без фотогалереи.',
      cover_image: mediaIds.filmCover,
      enable_autoscroll: false,
      enable_manual_navigation: false,
      source_type: 'external_url',
      external_video_url: VIDEO_ASSETS.externalUrl,
      poster_image: mediaIds.filmPoster,
      autoplay_enabled: true,
      muted: true,
      loop: true,
      controls: false,
      playsinline: true,
      seo_title: 'Камерный двор. Вечерний фильм — Goose Garden',
      seo_description:
        'Видео-кейс Goose Garden: камерный двор, вечерний свет и мягкая драматургия маршрута.',
    },
    en: {
      title: 'Courtyard Evening Film',
      project_type: 'video',
      short_description:
        'A video-led case for a compact but layered courtyard: lighting, reflections, privacy, and how the space works at dusk.',
      full_description:
        'Some projects only fully reveal themselves in motion. Here the focus is on how route, lighting, and a water plane work together inside a private courtyard.\n\nIn the demo, this case shows an external video URL without a gallery.',
      seo_title: 'Courtyard Evening Film — Goose Garden',
      seo_description:
        'Video-led Goose Garden case showing a compact courtyard with evening light and a calm spatial sequence.',
    },
  })

  console.log('\nSeed complete. Visit http://localhost:3005/ru or /en\n')
  await payload.destroy()
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
