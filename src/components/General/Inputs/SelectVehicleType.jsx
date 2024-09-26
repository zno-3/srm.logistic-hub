import { useState } from "react";
import {
  ListItemButton,
  List,
  Collapse,
  ListItemText,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import { useTranslation } from "react-i18next";



const vehicleTypes = [
  { id: 1, title: "truck" },
  {
    id: 2,
    title: "vehicle",
    subitems: [
      { id: 21,
        title: "cover",
        subitems: [
          { id: 2101, title: "tent" },
          { id: 2102, title: "фура" },
          { id: 2103, title: "для техніки" },
        ],
      },
      { id: 22, title: "open" },
      { id: 23, title: "tank",
        subitems: [
        { id: 2301, title: "petrol" },
        { id: 2302, title: "gas" },
        { id: 2303, title: "milk" },
      ],},
    ],
  },
  {
    id: 3,
    title: "bus",
    subitems: [
      { id: 31, title: "cargo" },
      { id: 32, title: "cargopass" },
      { id: 33, title: "pass" },
    ],
  },
];

function SelectVehicleType() {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState([]);
    const [value, setValue] = useState('');

  const RecursiveList = ({ items }) => {



    const handleClick = (id) => {

        const string = id.toString();
        let arr = [];

      if (openItems.includes(id)) {
        switch (string.length) {
            case 1:arr = []; break;
            case 2: arr = [parseInt(string[0]) ]; break;
            case 4: arr = [parseInt(string[0]), parseInt(string.slice(0, 2))]; break;
            default: break;
        }
      } else {
        switch (string.length) {
            case 1:arr = [id]; break;
            case 2: arr = [parseInt(string[0]), parseInt(string.slice(0, 2))]; break;
            case 4: arr = [parseInt(string[0]), parseInt(string.slice(0, 2)), parseInt(string.slice(0, 4))]; break;
            default: break;
        }
      }
    setOpenItems(arr);
    setValue(1);
    };

    const renderList = (data) => (
      <List dense={true}>
        {data.map((item) => {
          switch (String(item.id).length) {
            case 1:
              item.bg = "#0E1C3620";
              item.pl = 2;
              break;
            case 2:
              item.bg = "#0E1C3610";
              item.pl = 4;
              break;
            case 4:
              item.bg = "#0E1C3605";
              item.pl = 7;
              break;

            default:
              break;
          }

          return (
            <div key={item.id}>
              <ListItemButton
                sx={{
                  backgroundColor: item.bg,
                  pl: item.pl,
                }}
                onClick={() => handleClick(item.id)}
              >
                <ListItemText primary={t("vehicleTypes."+item.title)} />
              </ListItemButton>
              {item.subitems && item.subitems.length > 0 && (
                <Collapse
                  in={openItems.includes(item.id)}
                  timeout="auto"
                  unmountOnExit
                >
                  {renderList(item.subitems)}
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    );

    return renderList(items);
  };

  const handleChange = () => {
    console.log("aaaaaaaaa");
  };

  return (<>
    <InputLabel>Оберіть тип</InputLabel>
    <Select 
    value = {value}
    size = "small"
    sx={{ width: "100%" }} onChange={handleChange}>
      <RecursiveList items={vehicleTypes} />
    </Select></>
  );
}

export default SelectVehicleType;
