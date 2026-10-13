import { clsx } from 'clsx';
import { useState, useRef, type SyntheticEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { 
  fontFamilyOptions, 
  fontSizeOptions, 
  fontColors, 
  backgroundColors, 
  contentWidthArr 
} from 'src/constants/articleProps';
import { defaultArticleState } from 'src/constants/articleProps';
import { useSidebarClose } from 'src/components/article-params-form/useSidebarClose';
import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
  currentSettings: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  currentSettings,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
    //Стейт для открытия/закрытия сайдбара
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formState, setFormState] = useState(currentSettings);
  const rootRef = useRef<HTMLElement>(null);
  const [radioGroupKey, setRadioGroupKey] = useState(0);

  useSidebarClose({
    rootRef,
    isOpen: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
  });
  
  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onApply(formState);
  };

  const handleReset = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
    setRadioGroupKey((prevKey) => prevKey + 1)
  };

  const handleChange = (key: keyof ArticleStateType) => (option: OptionType): void => {
    setFormState((prev) => ({ ...prev, [key]: option }));
  };

  return (
    <>
      <ArrowButton 
        isOpen={isMenuOpen} 
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      <aside
        ref={rootRef}
        className={clsx(styles.container, {
          [styles.container_open]: isMenuOpen,
        })}
      >
        <form className={styles.form}onSubmit={handleSubmit} onReset={handleReset}>
          <Text weight={800} size={31} uppercase as="h2">
            Задайте параметры
          </Text>
          
          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />

          <RadioGroup
            key = {radioGroupKey}
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
