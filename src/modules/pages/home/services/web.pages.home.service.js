const Page = require('../../../../models/pages.model'); // Adjust path as needed
const { addBaseUrlToImages } = require('../../../../utils/image.url.util');
const baseUrl = process.env.IMAGE_URL;

class PageTemplateService {

   
    static async _home_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug} });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            if (processedContent?.home_page?.event_slider) {
                // processedContent.home_page.event_slider.events = await this._fetchEventList();
                processedContent.home_page.event_slider.events = [];

            }

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching home template:", error);
            return {};
        }
    }

   
    static async _event_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching about template:", error);
            return {};
        }
    }


    static async _event_host_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching contact template:", error);
            return {};
        }
    }


    static async _event_goers_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching default template:", error);
            return {};
        }
    }

    static async _about_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching default template:", error);
            return {};
        }
    }

    static async _support_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching default template:", error);
            return {};
        }
    }

    static async _support_faq_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching default template:", error);
            return {};
        }
    }

    static async _support_form_page(slug) {
        try {
            const page = await Page.findOne({ where: { slug } });
            if (!page) return {};

            let processedContent = this._processPageData(page);

            return {
                id: page.id,
                title: page.title,
                slug: page.slug,
                meta: this._getMetaData(page),
                content: processedContent ? addBaseUrlToImages(processedContent) : {}
            };

        } catch (error) {
            console.error("Error fetching default template:", error);
            return {};
        }
    }

   

    static _processPageData(page) {
        try {
            return JSON.parse(page.data || '{}');
        } catch (error) {
            console.error("Error parsing page data:", error);
            return {};
        }
    }


    static async _fetchEventList() {
        try {
            const events = await Event.findAll({
                where: { status: 1 },
                attributes: ['id', 'title', 'date', 'location', 'image'],
            });

            return events.map(event => ({
                id: event.id,
                title: event.title,
                date: event.date,
                location: event.location,
                image: event.image ? `${baseUrl}${event.image}` : "",
            }));
        } catch (error) {
            console.error("Error fetching event list:", error);
            return [];
        }
    }

  
    static _getMetaData(page) {
        return {
            meta_title: page.meta_title || "",
            meta_author: page.meta_author || "",
            meta_description: page.meta_description || "",
            meta_keywords: page.meta_keywords || "",
            meta_feature_image: page.meta_feature_image ? `${baseUrl}${page.meta_feature_image}` : ""
        };
    }
}

module.exports = PageTemplateService;
