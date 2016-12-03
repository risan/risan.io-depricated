module Jekyll
  class CssUrlTag < Jekyll::BaseTag

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      super
      File.join(@site_url, @config["css_dir"], @filename)
    end
  end
end

Liquid::Template.register_tag('css_url', Jekyll::CssUrlTag)
