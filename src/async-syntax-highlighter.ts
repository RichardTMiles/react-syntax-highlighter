import Prism from "prismjs";
import React, { Component, ReactNode } from "react";
import highlight from "./highlight";


type registerLanguage = (name: string, language: LanguageFn) => any;

export default <T>(options: {
  supportedLanguages?: string[];
  loader: () => Promise<T>; // typeof Prism
  isLanguageRegistered?: (instance: ({
    registered: (lang: string) => boolean
  }), language: any) => boolean;
  registerLanguage?: (gen: any, languageName: string, language: LanguageFn) => void;
  languageLoaders?: { [key: string]: (registerLang: registerLanguage) => void };
  noAsyncLoadingLanguages?: boolean;
}) => {
  const {
    loader,
    isLanguageRegistered,
    registerLanguage,
    languageLoaders,
    noAsyncLoadingLanguages
  } = options;

  class ReactAsyncHighlighter extends React.Component<
    {
      language: string;
    },
    {}
  > {
    static astGenerator: any = null;
    static highlightInstance = highlight(null, {})
    static astGeneratorPromise : Promise<any>|null = null;
    static languages : Map<string, LanguageFn> = new Map();
    static supportedLanguages =
      options.supportedLanguages || Object.keys(languageLoaders || {});

    constructor(props: any) {
      super(props);
      // Initialize state, bind methods, etc.
    }

    static preload() {
      return ReactAsyncHighlighter.loadAstGenerator();
    }

    static async loadLanguage(language: string) {
      const languageLoader = languageLoaders?.[language]!;

      if (typeof languageLoader === "function") {
        return languageLoader(ReactAsyncHighlighter.registerLanguage);
      } else {
        throw new Error(`Language ${language} not supported`);
      }
    }

    static isSupportedLanguage(language: string): boolean {
      return (
        ReactAsyncHighlighter.isRegistered(language) ||
        typeof languageLoaders?.[language] === "function"
      );
    }

    static isRegistered = (language: string): boolean => {
      if (noAsyncLoadingLanguages) {
        return true;
      }

      if (!registerLanguage) {
        throw new Error(
          "Current syntax highlighter doesn't support registration of languages"
        );
      }

      if (!ReactAsyncHighlighter.astGenerator) {
        // Ast generator not available yet, but language will be registered once it is.
        return ReactAsyncHighlighter.languages.has(language);
      }

      return isLanguageRegistered?.(ReactAsyncHighlighter.astGenerator, language) || false;
    };

    static registerLanguage: registerLanguage = (name: string, language: LanguageFn) => {
      if (!registerLanguage) {
        throw new Error(
          "Current syntax highlighter doesn't support registration of languages"
        );
      }

      if (ReactAsyncHighlighter.astGenerator) {
        return registerLanguage(
          ReactAsyncHighlighter.astGenerator,
          name,
          language
        );
      } else {
        ReactAsyncHighlighter.languages.set(name, language);
      }
    };

    static loadAstGenerator() {
      ReactAsyncHighlighter.astGeneratorPromise = (loader?.().then(
        astGenerator => {
          ReactAsyncHighlighter.astGenerator = astGenerator;

          if (registerLanguage) {
            ReactAsyncHighlighter.languages.forEach((language, name) =>
              registerLanguage(astGenerator, name, language)
            );
          }
        }
      )) || null;

      return ReactAsyncHighlighter.astGeneratorPromise;
    }

    componentDidUpdate() {
      if (
        !ReactAsyncHighlighter.isRegistered(this.props.language) &&
        languageLoaders
      ) {
        this.loadLanguage();
      }
    }

    componentDidMount() {
      if (!ReactAsyncHighlighter.astGeneratorPromise) {
        ReactAsyncHighlighter.loadAstGenerator();
      }

      if (!ReactAsyncHighlighter.astGenerator) {
        ReactAsyncHighlighter.astGeneratorPromise?.then(() => {
          super.forceUpdate();
        });
      }

      if (
        !ReactAsyncHighlighter.isRegistered(this.props.language) &&
        languageLoaders
      ) {
        this.loadLanguage();
      }
    }

    loadLanguage() {

      const { language } = this.props;

      if (language === "text") {
        return;
      }

      ReactAsyncHighlighter.loadLanguage(language)
        .then(() => {
          return super.forceUpdate();
        })
        .catch(() => {
        });
    }

    normalizeLanguage(language: string) {
      return ReactAsyncHighlighter.isSupportedLanguage(language)
        ? language
        : "text";
    }

    render() {


      // @ts-ignore
      return ReactAsyncHighlighter.highlightInstance({
        ...this.props,
        language: this.normalizeLanguage(this.props.language),
        astGenerator: ReactAsyncHighlighter.astGenerator
      })

    }
  }

  return ReactAsyncHighlighter;
};
