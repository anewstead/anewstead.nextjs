declare module "just-detect-adblock";

// allows us to check if running in browser
// e.g. if (process.browser){}
declare namespace NodeJS {
  interface Process extends NodeJS.Process {
    browser?: string;
  }
}
