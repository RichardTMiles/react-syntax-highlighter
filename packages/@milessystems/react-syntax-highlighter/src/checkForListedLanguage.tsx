export default (astGenerator: any, language: string) => {
  const langs = astGenerator.listLanguages();
  return langs.indexOf(language) !== -1;
};
