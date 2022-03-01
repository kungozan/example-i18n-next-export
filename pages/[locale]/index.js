import fs from 'fs';
import path from 'path';

export default function Home({ title }) {
  return <h1>{title}</h1>;
}

export async function getStaticPaths() {
  const locales = fs.readdirSync(path.resolve(__dirname, '../../../i18n'));

  return {
    paths: locales.map((locale) => ({
      params: { locale: locale.replace('.json', '') },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const translations = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `../../../i18n/${params.locale}.json`),
      'utf-8'
    )
  );

  return {
    props: {
      title: translations.title,
    },
  };
}
