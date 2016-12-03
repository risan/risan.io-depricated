module Jekyll
  class SiteUrlTag < Jekyll::BaseTag

    def render(context)
      super
      @site_url
    end
  end
end

Liquid::Template.register_tag('site_url', Jekyll::SiteUrlTag)
