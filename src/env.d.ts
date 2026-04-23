/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  readonly PUBLIC_SITE_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
