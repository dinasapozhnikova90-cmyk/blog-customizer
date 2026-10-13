import { useState } from 'react';
import { defaultArticleState } from '@/constants/articleProps.ts';
import { clsx } from 'clsx';

import { ArticleParamsForm } from '@components/article-params-form';

import { Article } from '../article/Article';

import type { CSSProperties } from 'react';

import styles from './app.module.scss';

export const App = (): React.JSX.Element => {
  //Стейт для стилей текущей статьи
  const [articleState, setArticleState] = useState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': articleState.fontFamilyOption.value,
          '--font-size': articleState.fontSizeOption.value,
          '--font-color': articleState.fontColor.value,
          '--container-width': articleState.contentWidth.value,
          '--bg-color': articleState.backgroundColor.value,
        } as CSSProperties
      }
    >
      <ArticleParamsForm
        currentSettings={articleState}
        onApply={setArticleState}
      />
      <Article />
    </main>
  );
};
