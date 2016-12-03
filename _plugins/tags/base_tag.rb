module Jekyll
  class BaseTag < Liquid::Tag

    def render(context)
      @config = context.registers[:site].config
      @page = context.environments.first["page"]
      @site_url = @config["url"]

      if (! @config["baseurl"].empty?)
        @site_url = File.join(@site_url, @config["baseurl"])
      end
    end

    def get_url(filename)
      File.join(@site_url, filename)
    end

    def get_title()
      if @page["title"]
        return @page["title"].strip
      end

      @config["title"].strip
    end
  end
end
