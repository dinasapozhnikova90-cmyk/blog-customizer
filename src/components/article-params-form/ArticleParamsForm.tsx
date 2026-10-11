import { clsx } from 'clsx';
import { useState, useEffect, useRef, type SyntheticEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import type { ArticleStateType } from 'src/constants/articleProps';
import { 
  fontFamilyOptions, 
  fontSizeOptions, 
  fontColors, 
  backgroundColors, 
  contentWidthArr 
} from 'src/constants/articleProps';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  currentSettings: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  isOpen,
  onToggle,
  onClose,
  currentSettings,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {

  const [formState, setFormState] = useState(currentSettings);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Если сайдбар открыт и клик был вне элемента сайдбара
      if (
        isOpen && 
        rootRef.current && 
        !rootRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Вешаем слушатель только когда сайдбар открыт (оптимизация)
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Очищаем слушатель при размонтировании или закрытии
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onApply(formState);
  };

  const handleReset = (evt: SyntheticEvent) => {
    evt.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={onToggle} />

      <aside
        ref={rootRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form}onSubmit={handleSubmit} onReset={handleReset}>
          <Text weight={800} size={45} uppercase>
            Задайте параметры
          </Text>
          
          <Select
            title="шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) => {
              setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
            }}
          />

          <RadioGroup
            title="размер шрифта"
            name="fontSize"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => {
              setFormState((prev) => ({ ...prev, fontSizeOption: option }));
            }}
          />

          <Select
            title="цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => {
              setFormState((prev) => ({ ...prev, fontColor: option }));
            }}
          />

          <Separator />

          <Select
            title="цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) => {
              setFormState((prev) => ({ ...prev, backgroundColor: option }));
            }}
          />

          <Select
            title="ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => {
              setFormState((prev) => ({ ...prev, contentWidth: option }));
            }}
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
