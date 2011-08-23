class I18n
  # currently selected locale
  locale = ''

  # all available locales
  locales = []

  # all available translations
  translations = {}

  # default locale
  defaultLocale = null

  # warn for missing translations in the default locale
  warnForDefault = true  

  # warning function
  warn = (string, locale) ->
    "<div class=\"noTranslation\">#{locale}: #{string}</div>"

  # pluralization function
  pluralize = (translations, count, locale) ->
    translations[if count is 1 then 'one' else 'other']

  # initialize
  @init = (config) ->
    throw "I18n - Init has to be called with a config object!" unless config?
    throw "I18n - Config object needs to contain at least one locale!" unless config.locales?
    throw "I18n - Config object needs to contain translations for every locale!" unless config.translations?
    throw "I18n - Config object needs to have defaultLocale defined!" unless config.defaultLocale?
    
    locales = config.locales
    for l in locales
      if config.translations[l]?
        translations[l] = config.translations[l]
      else
        throw "I18n - Missing translation for locale #{l}!"
    locale = config.initialLocale or locales[0]

    defaultLocale = config.defaultLocale or locales[0]
    warnForDefault = false if config.warnForDefault is false
    warn = config.warn if config.warn? and typeof config.warn is 'function' and config.warn.length is 2
    pluralize = config.pluralize if config.pluralize? and typeof config.pluralize is 'function' and config.pluralize.length is 3

  # translate given string to locale with params
  @t = (string, params, userLocale) ->
    if typeof params is 'string'
      userLocale = params
      params = null

    userLocale = userLocale || locale
    throw "I18n:init *must* be called before any translation is done." unless userLocale?

    translation = translations[userLocale][string]
    unless translation?
      unless warnForDefault or userLocale isnt defaultLocale
        translation = string
      else
        warn string, userLocale

    if params?
      translation = pluralize translation, params.count, userLocale if typeof params.count is 'number'
      
      if translation?
        regex = null
        for own param of params
          regex = new RegExp ":#{param}", "g"
          translation = translation.replace regex, params[param]
      else
        translation = warn string, userLocale

    translation

  # return current locale
  @getLocale = ->
    locale

  # set current locale
  @setLocale = (newLocale) ->
    for l in locales
      if l is newLocale
        locale = newLocale
        return true

    throw "I18n - called setLocale on a non-existent locale: #{newLocale}"
    false

  # get all locales
  @getLocales = ->
    locales
