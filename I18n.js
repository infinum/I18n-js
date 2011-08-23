(function() {
  var I18n;
  var __hasProp = Object.prototype.hasOwnProperty;
  I18n = (function() {
    var defaultLocale, locale, locales, pluralize, translations, warn, warnForDefault;
    function I18n() {}
    locale = '';
    locales = [];
    translations = {};
    defaultLocale = null;
    warnForDefault = true;
    warn = function(string, locale) {
      return "<div class=\"noTranslation\">" + locale + ": " + string + "</div>";
    };
    pluralize = function(translations, count, locale) {
      return translations[count === 1 ? 'one' : 'other'];
    };
    I18n.init = function(config) {
      var l, _i, _len;
      if (config == null) {
        throw "I18n - Init has to be called with a config object!";
      }
      if (config.locales == null) {
        throw "I18n - Config object needs to contain at least one locale!";
      }
      if (config.translations == null) {
        throw "I18n - Config object needs to contain translations for every locale!";
      }
      if (config.defaultLocale == null) {
        throw "I18n - Config object needs to have defaultLocale defined!";
      }
      locales = config.locales;
      for (_i = 0, _len = locales.length; _i < _len; _i++) {
        l = locales[_i];
        if (config.translations[l] != null) {
          translations[l] = config.translations[l];
        } else {
          throw "I18n - Missing translation for locale " + l + "!";
        }
      }
      locale = config.initialLocale || locales[0];
      defaultLocale = config.defaultLocale || locales[0];
      if (config.warnForDefault === false) {
        warnForDefault = false;
      }
      if ((config.warn != null) && typeof config.warn === 'function' && config.warn.length === 2) {
        warn = config.warn;
      }
      if ((config.pluralize != null) && typeof config.pluralize === 'function' && config.pluralize.length === 3) {
        return pluralize = config.pluralize;
      }
    };
    I18n.t = function(string, params, userLocale) {
      var param, regex, translation;
      if (typeof params === 'string') {
        userLocale = params;
        params = null;
      }
      userLocale = userLocale || locale;
      if (userLocale == null) {
        throw "I18n:init *must* be called before any translation is done.";
      }
      translation = translations[userLocale][string];
      if (translation == null) {
        if (!(warnForDefault || userLocale !== defaultLocale)) {
          translation = string;
        } else {
          warn(string, userLocale);
        }
      }
      if (params != null) {
        if (typeof params.count === 'number') {
          translation = pluralize(translation, params.count, userLocale);
        }
        if (translation != null) {
          regex = null;
          for (param in params) {
            if (!__hasProp.call(params, param)) continue;
            regex = new RegExp(":" + param, "g");
            translation = translation.replace(regex, params[param]);
          }
        } else {
          translation = warn(string, userLocale);
        }
      }
      return translation;
    };
    I18n.getLocale = function() {
      return locale;
    };
    I18n.setLocale = function(newLocale) {
      var l, _i, _len;
      for (_i = 0, _len = locales.length; _i < _len; _i++) {
        l = locales[_i];
        if (l === newLocale) {
          locale = newLocale;
          return true;
        }
      }
      throw "I18n - called setLocale on a non-existent locale: " + newLocale;
      return false;
    };
    I18n.getLocales = function() {
      return locales;
    };
    return I18n;
  })();
}).call(this);
