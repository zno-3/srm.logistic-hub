import { useState } from "react";
import { ReactComponent as PeopleIcon } from "../../assets/icons/people.svg";
import { ReactComponent as BlankIcon } from "../../assets/icons/blank.svg";
import { ReactComponent as RestIcon } from "../../assets/icons/rest.svg";
import FilterChip from "../../components/General/FilterChip";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useTheme } from "@mui/material";

function StutusFilter(props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [activeFilters, setActiveFilters] = useState([0]); // 0 represents all

  const colors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.error.main
  ];

  //const colors = ["#0E1C36", "#0075C4", "#0E951B", "#A61C3C"];
  let icons;
  let labels;

  switch (props.type) {
    case "drivers":
      icons = [<PeopleIcon />, <BlankIcon />, <BlankIcon />, <RestIcon />];
      labels = ["total", "flight", "free", "rest"];
      break;
     case "vehicles":
       icons = [<PeopleIcon />, <BlankIcon />, <BlankIcon />, <RestIcon />];
       labels = ["total", "flight", "free", "rest"];
       break;
     case "trailers":
       icons = [<PeopleIcon />, <BlankIcon />, <BlankIcon />, <RestIcon />];
       labels = ["total", "flight", "free", "rest"];
       break;
    default:
      break;
  }

  const total = props.statuses.reduce((acc, count) => acc + count, 0);

  const chips = colors.map((color, index) => ({
    label: labels[index],
    icon: icons[index],
    color: color,
    filter: index,
    count: index === 0 ? total : props.statuses[index - 1],
  }));

const handleFilterClick = (filter) => {
  if (filter === 0) {
    setActiveFilters([0]);
  } else {
    setActiveFilters((prev) => {
      const isActive = prev.includes(filter);
      let updatedFilters;

      if (isActive) {
        // Видаляємо фільтр з активних
        updatedFilters = prev.filter((f) => f !== filter);
      } else {
        // Додаємо фільтр, але видаляємо фільтр 0, якщо він активний
        updatedFilters = [...prev.filter((f) => f !== 0), filter];
      }

      // Якщо після видалення всі фільтри зняті, робимо активним фільтр 0
      return updatedFilters.length === 0 ? [0] : updatedFilters;
    });
  }
};

  return (
    <Grid container spacing={3}>
      {chips.map((chip) => {
        const active = activeFilters.includes(chip.filter);
        return (
          <Grid key={chip.filter}>
            <FilterChip
              onClick={() => handleFilterClick(chip.filter)}
              count={chip.count}
              icon={chip.icon}
              active={active}
              label={t("general.status." + chip.label)}
              color={chip.color}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default StutusFilter;
