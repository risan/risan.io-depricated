module Jekyll
  class TitleTag < Jekyll::BaseTag

    def render(context)
      super
      get_title()
    end
  end
end

Liquid::Template.register_tag('title', Jekyll::TitleTag)
