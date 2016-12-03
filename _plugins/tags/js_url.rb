module Jekyll
  class JsUrlTag < Jekyll::BaseTag

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      super
      File.join(@site_url, @config["js_dir"], @filename)
    end
  end
end

Liquid::Template.register_tag('js_url', Jekyll::JsUrlTag)
