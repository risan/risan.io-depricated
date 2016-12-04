module Jekyll
  class PostImgUrlTag < Jekyll::BaseTag

    def initialize(tag_name, filename, tokens)
      super
      @filename = filename
    end

    def render(context)
      super
      File.join(@site_url, @config["img_dir"], @page["slug"], @filename)
    end
  end
end

Liquid::Template.register_tag('post_img_url', Jekyll::PostImgUrlTag)
