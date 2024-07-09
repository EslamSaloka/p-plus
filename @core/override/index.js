import MuiAccordion from "./accordion";
const Overrides = (theme, settings) => {
  const accordion = MuiAccordion(theme);

  return Object.assign(accordion);
};

export default Overrides;
