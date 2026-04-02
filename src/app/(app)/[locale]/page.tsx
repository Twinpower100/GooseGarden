import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@/payload.config'
import Image from 'next/image'
import * as motion from 'motion/react-client'
import { InquiryForm } from '@/components/InquiryForm'

export default async function HomePageClient({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as any;
  const payload = await getPayloadHMR({ config: configPromise })
  
  const homeData = await payload.findGlobal({ slug: 'home-page', locale })
  const projects = await payload.find({
    collection: 'portfolio-projects',
    locale,
    where: { show_on_homepage: { equals: true }, is_published: { equals: true } },
    sort: 'display_order'
  })

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {homeData.hero_image && typeof homeData.hero_image === 'object' && homeData.hero_image.url && (
          <Image 
            src={homeData.hero_image.url} 
            alt={homeData.hero_image.alt || 'Landscape Hero'} 
            fill 
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-serif mb-6 leading-tight"
          >
            {homeData.hero_title || 'Crafting Timeless Landscapes'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            {homeData.hero_subtitle}
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      {homeData.services && homeData.services.length > 0 && (
        <section className="py-24 md:py-32 px-6 md:px-12 bg-premium-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl font-serif text-center mb-16"
            >
              {homeData.services_title || 'Our Services'}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {homeData.services.map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-serif mb-4">{service.title}</h3>
                  <p className="opacity-70 font-light leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Selected Works */}
      <section className="py-24 md:py-32 bg-premium-100 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center mb-16"
          >
            {homeData.portfolio_section_title || 'Selected Works'}
          </motion.h2>
          
          <div className="grid gap-16">
            {projects.docs.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
              >
                <div className="w-full md:w-3/5 aspect-[4/3] relative overflow-hidden group">
                  {typeof project.cover_image === 'object' && project.cover_image?.url && (
                    <Image
                      src={project.cover_image.url}
                      alt={project.cover_image.alt || project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="w-full md:w-2/5">
                  <h3 className="text-3xl font-serif mb-4">{project.title}</h3>
                  <p className="text-premium-600 mb-8 font-light leading-relaxed">
                    {project.short_description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="contact" className="py-24 md:py-32 bg-premium-900 text-premium-50 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-serif text-center mb-6"
          >
            {homeData.contact_section_title || 'Start Your Project'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center opacity-70 mb-12 font-light"
          >
            {homeData.contact_section_text || 'Fill out the form below to request a consultation.'}
          </motion.p>
          
          <InquiryForm locale={locale} />
        </div>
      </section>
    </div>
  )
}
