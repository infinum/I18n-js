# I18n-js

Based on the idea of rails i18n gem, this is a JavaScript library for internationalization of strings in html5 applications.

# Install

Add the following code to the <tt><head></tt> section of your site:

    <script type="text/javascript" src="I18n.js"></script>

# Config

After including <tt>I18n.js</tt> you need to initialize it:

    I18n.init(config)

Init function receives a configuration object with these options:

* locales: array of available locales
* translations: object containing translation objects for each locale
* defaultLocale [optional]: locale used for defining translations, defaults to the first locale in locales array
* initialLocale [optional]: intially selected locale, defaults to the first locale in locales array
* warnForDefault [optional]: show a warning message if translation doesn't exist in default locale, defaults to true
* warn [optional]: function returning a warning message string for missing locale, receives two arguments (string, locale)
* pluralize [optional]: function returning pluralized translation string, receives three arguments (translations, count, locale)

# Usage

I18n can be used for:

* translation of raw strings
* translation of strings with parameters
* translation of string based on language plural rules

# Example

Example initialization:

    I18n.init({
      locales : ['en', 'de'],
      
      translations : {
        en : {
          "number-of-people" : {
            one : "There is 1 person in this room.",
            other : "There are :count people in this room."
          }
        },
        
        de : {
          "Good day" : "Guten tag",
          "Welcome, :name!" : "Wilkommen, :name!",
          "number-of-people" : {
            one : "Es ist 1 Person in diesem Zimmer.",
            other : "Es gibt :count Personen in diesem Zimmer."
          }
        }
      },
      
      initialLocale : 'de'
    })

Example #1, raw string translation:

    I18n.t("Good day") // Guten tag
    I18n.setLocale('en')
    I18n.t("Good day") // <div id="noTranslation">en: Good day</div>
    I18n.setLocale('de')
    I18n.t("Hello world") // <div id="noTranslation">de: Hello world</div>


Example #2, string with parameters:

    I18n.t("Welcome, :name!", {name : "Josip"}) // Wilkommen, Josip!


Example #3, string based on language plural rules:

    I18n.t("number-of-people", {count : 3}) // Es gibt 3 Personen in diesem Zimmer.
    I18n.t("number-of-people", {count : 1}) // Es ist 1 Person in diesem Zimmer.
    
    I18n.setLocale('en')
    I18n.t("number-of-people", {count : 5}) // There is 5 people in this room.


Example warn function:

    warn : function(string, locale) {
      return "You are missing a translation for string '" + string + "' in locale " + locale + "!";
    }


Example pluralize function with support for french plural rules:

    pluralize : function(translations, count, locale) {
      switch (locale) {
        case 'fr':
          return translations[count == 0 || count == 1 ? 'one' : 'other'];
        default :
          return translations[count == 1 ? 'one' : 'other'];
      }
    }


# Credits

Josip Bišćan, Infinum Ltd.

# TODO

* unit testing