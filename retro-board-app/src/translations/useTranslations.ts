import { useContext, useMemo, useState, useEffect, useCallback } from 'react';
import LanguageContext from './Context';
import UserContext from '../auth/Context';
import en from './en';
import es from './es';
import fr from './fr';
import hu from './hu';
import ptbr from './pt-br';
import pl from './pl';
import nl from './nl';
import ru from './ru';
import zhtw from './zh-tw';
import zhcn from './zh-cn';
import ar from './ar';
import ja from './ja';
import de from './de';
import it from './it';
import { Translation } from './types';
import { merge, cloneDeep } from 'lodash';
import useUser from '../auth/useUser';
import { getItem, setItem } from '../utils/localStorage';
import { updateLanguage as updateLanguageApi } from '../api';

interface Translations {
  [key: string]: Translation;
}

const languages: Translations = {
  en,
  es,
  fr,
  hu,
  pl,
  ptbr,
  nl,
  ru,
  zhtw,
  zhcn,
  ar,
  ja,
  de,
  it,
};

export function useLanguage(): [string, (lng: string) => void] {
  const user = useUser();
  const { setUser } = useContext(UserContext);
  const [language, setLanguage] = useState('en');

  const updateLanguage = useCallback(
    (language: string) => {
      setLanguage(language);
      setItem('language', language);
      updateLanguageApi(language);
      if (user) {
        setUser({
          ...user,
          language,
        });
      }
    },
    [user, setUser]
  );

  useEffect(() => {
    console.log('useLanguage effect', user);
    if (!user) {
      const lng = getItem('language');
      setLanguage(lng || 'en');
    } else {
      setLanguage(user.language);
    }
  }, [user]);

  return [language, updateLanguage];
}

function useTranslation() {
  const [language] = useLanguage();
  console.log('Language: ', language);

  const result = useMemo(() => {
    const translations = languages[language];
    const english = languages['en'];
    return language === 'en'
      ? translations
      : merge(cloneDeep(english), translations);
  }, [language]);

  return result;
}

export default useTranslation;
