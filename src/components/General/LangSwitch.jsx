import {useState} from 'react';
import FlagsSelect from 'react-flags-select';
import "../../utils/i18next";
import { useTranslation } from 'react-i18next';

function LangSwitch(){
  const {i18n} = useTranslation();

  let initialFlag;
  if (i18n.language === "UK") initialFlag = "UA";
  else if (i18n.language === "EN") initialFlag = "GB";
  else initialFlag = i18n.language;

  const [flag, setFlag] = useState(initialFlag);
 
  const setLanguage = (code) => {
    setFlag(code);
    if(code === 'UA') code = 'UK';
    if(code === 'GB') code = 'EN';    
    i18n.changeLanguage(code);
  }

    return(
      <FlagsSelect
        selected={flag}
        countries={["UA", "GB", "PL", "RU"]}
        customLabels={{GB: "English", RU: "Язык", PL: "Polska", UA: "Українська"}}
        showSelectedLabel={false}
        alignOptionsToRight={true}
        fullWidth={false}
        onSelect={(code) => setLanguage(code)}
      />
    )
}
export default LangSwitch;
