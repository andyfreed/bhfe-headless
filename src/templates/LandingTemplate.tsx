/**
 * Landing Page Template
 * 
 * ACF-driven landing page template with flexible content support
 */

import Link from 'next/link';
import Image from 'next/image';
import type { TemplateProps } from './index';

interface FlexibleContentLayout {
  __typename: string;
  fieldGroupName?: string | null;
  bandClasses?: string | null;
  bandId?: string | null;
  animation?: string | null;
  animationSpeed?: string | null;
  anchorPlacement?: string | null;
  // Hero fields
  backgroundImage?: { node: { sourceUrl?: string | null; altText?: string | null } } | null;
  heading?: string | null;
  subheading?: string | null;
  content?: string | null;
  textAlignment?: string | null;
  containerAlignment?: string | null;
  // CTA fields
  buttons?: Array<{
    button?: {
      url?: string | null;
      title?: string | null;
      target?: string | null;
    } | null;
  }> | null;
  // Image fields
  image?: { node: { sourceUrl?: string | null; altText?: string | null } } | null;
  caption?: string | null;
  imageSize?: string | null;
  link?: { url?: string | null; title?: string | null; target?: string | null } | null;
  // Accordion fields
  accordionItems?: Array<{
    heading?: string | null;
    content?: string | null;
    defaultState?: string | null;
  }> | null;
}

interface LandingPageData {
  __typename?: 'Page';
  id: string;
  title?: string | null;
  content?: string | null;
  uri?: string | null;
  featuredImage?: {
    node: {
      sourceUrl?: string | null;
      altText?: string | null;
    };
  } | null;
  acfPageFields?: {
    flexibleContent?: FlexibleContentLayout[] | null;
  } | null;
}

/**
 * Hero Section Component
 */
function HeroSection({ layout }: { layout: FlexibleContentLayout }) {
  const bgImage = layout.backgroundImage?.node?.sourceUrl;
  
  return (
    <section
      id={layout.bandId || undefined}
      className={`relative min-h-[60vh] flex items-center justify-center text-white py-20 px-6 ${layout.bandClasses || ''}`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {layout.heading && (
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            {layout.heading}
          </h1>
        )}
        {layout.subheading && (
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {layout.subheading}
          </p>
        )}
        {layout.content && (
          <div
            className="prose prose-lg prose-invert mx-auto mb-8"
            dangerouslySetInnerHTML={{ __html: layout.content }}
          />
        )}
        {layout.buttons && layout.buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {layout.buttons.map((btn, idx) => (
              btn?.button?.url && (
                <Link
                  key={idx}
                  href={btn.button.url}
                  target={btn.button.target || undefined}
                  className={`font-bold py-3 px-8 rounded-lg transition-colors ${
                    idx === 0
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                      : 'border-2 border-white hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {btn.button.title || 'Learn More'}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Heading Section Component
 */
function HeadingSection({ layout }: { layout: FlexibleContentLayout }) {
  const alignment = layout.textAlignment || 'center';
  
  return (
    <section
      id={layout.bandId || undefined}
      className={`py-16 px-6 ${layout.bandClasses || ''}`}
    >
      <div className="max-w-4xl mx-auto" style={{ textAlign: alignment as any }}>
        {layout.heading && (
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-slate-800">
            {layout.heading}
          </h2>
        )}
      </div>
    </section>
  );
}

/**
 * CTA Buttons Section Component
 */
function CtaButtonsSection({ layout }: { layout: FlexibleContentLayout }) {
  return (
    <section
      id={layout.bandId || undefined}
      className={`py-16 px-6 bg-amber-500 ${layout.bandClasses || ''}`}
    >
      <div className="max-w-4xl mx-auto text-center">
        {layout.content && (
          <div
            className="prose prose-lg max-w-none mb-8 text-slate-800"
            dangerouslySetInnerHTML={{ __html: layout.content }}
          />
        )}
        {layout.buttons && layout.buttons.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {layout.buttons.map((btn, idx) => (
              btn?.button?.url && (
                <Link
                  key={idx}
                  href={btn.button.url}
                  target={btn.button.target || undefined}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  {btn.button.title || 'Click Here'}
                </Link>
              )
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Image Module Section Component
 */
function ImageSection({ layout }: { layout: FlexibleContentLayout }) {
  const image = layout.image?.node;
  
  if (!image?.sourceUrl) return null;
  
  return (
    <section
      id={layout.bandId || undefined}
      className={`py-12 px-6 ${layout.bandClasses || ''}`}
    >
      <div className="max-w-4xl mx-auto">
        <figure>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src={image.sourceUrl}
              alt={image.altText || ''}
              fill
              className="object-cover"
            />
          </div>
          {layout.caption && (
            <figcaption className="mt-4 text-center text-slate-600 text-sm">
              {layout.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}

/**
 * WYSIWYG Section Component
 */
function WysiwygSection({ layout }: { layout: FlexibleContentLayout }) {
  if (!layout.content) return null;
  
  return (
    <section
      id={layout.bandId || undefined}
      className={`py-12 px-6 ${layout.bandClasses || ''}`}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-playfair
            prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: layout.content }}
        />
      </div>
    </section>
  );
}

/**
 * Accordion Section Component
 */
function AccordionSection({ layout }: { layout: FlexibleContentLayout }) {
  if (!layout.accordionItems || layout.accordionItems.length === 0) return null;
  
  return (
    <section
      id={layout.bandId || undefined}
      className={`py-12 px-6 ${layout.bandClasses || ''}`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {layout.accordionItems.map((item, idx) => (
            <details
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              open={item.defaultState === 'open'}
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-slate-800 hover:bg-slate-50 flex items-center justify-between">
                {item.heading}
                <svg
                  className="w-5 h-5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              {item.content && (
                <div
                  className="px-6 pb-4 prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Render flexible content layout
 */
function renderLayout(layout: FlexibleContentLayout, index: number) {
  const key = `${layout.__typename}-${index}`;
  
  switch (layout.__typename) {
    case 'FlexibleContentFlexibleContentHeroLayout':
      return <HeroSection key={key} layout={layout} />;
    case 'FlexibleContentFlexibleContentHeadingLayout':
      return <HeadingSection key={key} layout={layout} />;
    case 'FlexibleContentFlexibleContentCtaButtonsLayout':
      return <CtaButtonsSection key={key} layout={layout} />;
    case 'FlexibleContentFlexibleContentImageModuleLayout':
      return <ImageSection key={key} layout={layout} />;
    case 'FlexibleContentFlexibleContentWysiwygLayout':
      return <WysiwygSection key={key} layout={layout} />;
    case 'FlexibleContentFlexibleContentAccordionLayout':
      return <AccordionSection key={key} layout={layout} />;
    default:
      console.warn(`Unknown layout type: ${layout.__typename}`);
      return null;
  }
}

export function LandingTemplate({ data }: TemplateProps<LandingPageData>) {
  const flexibleContent = data.acfPageFields?.flexibleContent || [];
  const hasFlexibleContent = flexibleContent.length > 0;

  return (
    <main className="min-h-screen">
      {hasFlexibleContent ? (
        // Render ACF Flexible Content
        flexibleContent.map((layout, idx) => renderLayout(layout, idx))
      ) : (
        // Fallback: render standard page content
        <>
          {/* Default Header */}
          <header className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                {data.title}
              </h1>
            </div>
          </header>

          {/* Content */}
          {data.content && (
            <article className="py-12 px-6">
              <div className="max-w-3xl mx-auto">
                <div
                  className="prose prose-lg prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </div>
            </article>
          )}
        </>
      )}
    </main>
  );
}

