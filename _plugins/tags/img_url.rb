module Jekyll
  class ImgUrlTag < Jekyll::BaseTag

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      super
      File.join(@site_url, @config["img_dir"], @filename)
    end
  end
end

Liquid::Template.register_tag('img_url', Jekyll::ImgUrlTag)
