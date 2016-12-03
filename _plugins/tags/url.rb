module Jekyll
  class UrlTag < Jekyll::BaseTag

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      super
      get_url(@filename)
    end
  end
end

Liquid::Template.register_tag('url', Jekyll::UrlTag)
